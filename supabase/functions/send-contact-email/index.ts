import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: ContactFormData = await req.json();

    console.log("Recebido pedido de contacto:", { name: data.name, email: data.email });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase
      .from("contacts")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        project_type: data.projectType,
        message: data.message,
      });

    if (insertError) {
      console.error("Erro ao guardar contacto:", insertError);
      throw new Error(`Erro ao guardar contacto: ${insertError.message}`);
    }

    console.log("Contacto guardado com sucesso na base de dados");

    const brevoKey = Deno.env.get("BREVO_API_KEY");
    const fromEmail = Deno.env.get("SMTP_FROM_EMAIL");
    const toEmail = Deno.env.get("CONTACT_RECIPIENT_EMAIL");

    console.log("Configuração de email:", {
      hasBrevoKey: !!brevoKey,
      brevoKeyLength: brevoKey?.length || 0,
      fromEmail: fromEmail || "não configurado",
      toEmail: toEmail || "não configurado"
    });

    if (!brevoKey || brevoKey.trim() === "") {
      console.warn("BREVO_API_KEY não configurada - emails não serão enviados");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensagem recebida com sucesso! (Email não enviado - API key não configurada)"
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    try {
      const subject = `Novo Pedido de Contacto - ${data.name}`;

      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Novo Pedido de Contacto</h2>

              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                <p><strong>Contacto:</strong> ${escapeHtml(data.phone || "Não fornecido")}</p>
                <p><strong>Serviço:</strong> ${escapeHtml(data.projectType)}</p>
              </div>

              <div style="margin: 20px 0;">
                <h3>Mensagem:</h3>
                <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="color: #999; font-size: 12px;">Este email foi enviado automaticamente pelo formulário de contacto do website Serv2all.</p>
            </div>
          </body>
        </html>
      `;

      const textContent = `
Novo Pedido de Contacto

Nome: ${data.name}
Email: ${data.email}
Contacto: ${data.phone || "Não fornecido"}
Serviço: ${data.projectType}

Mensagem:
${data.message}

---
Este email foi enviado automaticamente pelo formulário de contacto do website Serv2all.
      `;

      const emailPayload = {
        sender: {
          name: "Serv2all Website",
          email: fromEmail || "noreply@serv2all.pt"
        },
        to: [{ email: toEmail || "info@serv2all.pt" }],
        cc: [{ email: data.email }],
        subject: subject,
        htmlContent: htmlContent,
        textContent: textContent,
      };

      console.log("Enviando email via Brevo para:", toEmail || "info@serv2all.pt");

      const emailResponse = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoKey,
          },
          body: JSON.stringify(emailPayload),
        }
      );

      const responseText = await emailResponse.text();

      if (!emailResponse.ok) {
        console.error("Erro ao enviar email via Brevo:", {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          response: responseText
        });

        return new Response(
          JSON.stringify({
            success: true,
            message: "Mensagem recebida com sucesso! (Erro ao enviar email - verifique logs)"
          }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      console.log("Email enviado com sucesso via Brevo:", responseText);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensagem recebida e email enviado com sucesso!"
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (emailError) {
      console.error("Exceção ao enviar email:", emailError);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensagem recebida com sucesso! (Erro ao enviar email - verifique logs)"
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Erro na função:", error);
    return new Response(
      JSON.stringify({
        error: "Erro ao processar pedido",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
