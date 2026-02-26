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

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const fromEmail = Deno.env.get("SMTP_FROM_EMAIL");
    const toEmail = Deno.env.get("CONTACT_RECIPIENT_EMAIL");

    console.log("Configuração SMTP:", {
      host: smtpHost || "não configurado",
      port: smtpPort || "não configurado",
      user: smtpUser || "não configurado",
      hasPassword: !!smtpPassword,
      fromEmail: fromEmail || "não configurado",
      toEmail: toEmail || "não configurado"
    });

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.warn("Configuração SMTP incompleta - email não será enviado");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensagem recebida com sucesso! (Email não enviado - SMTP não configurado)"
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

      const emailMessage = [
        `From: Serv2all Website <${fromEmail || "noreply@serv2all.pt"}>`,
        `To: <${toEmail || "info@serv2all.pt"}>`,
        `Cc: <${data.email}>`,
        `Reply-To: ${data.email}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="boundary123"`,
        ``,
        `--boundary123`,
        `Content-Type: text/plain; charset=utf-8`,
        ``,
        textContent,
        `--boundary123`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        htmlContent,
        `--boundary123--`
      ].join("\r\n");

      console.log("Conectando ao servidor SMTP...");

      const conn = await Deno.connect({
        hostname: smtpHost,
        port: parseInt(smtpPort),
      });

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const reader = conn.readable.getReader();
      const writer = conn.writable.getWriter();

      const readResponse = async () => {
        const { value } = await reader.read();
        const response = decoder.decode(value);
        console.log("SMTP:", response.trim());
        return response;
      };

      const sendCommand = async (command: string) => {
        console.log("Enviando:", command.split("\n")[0]);
        await writer.write(encoder.encode(command + "\r\n"));
        return await readResponse();
      };

      await readResponse();

      await sendCommand(`EHLO ${smtpHost}`);

      await sendCommand("STARTTLS");

      const tlsConn = await Deno.startTls(conn, { hostname: smtpHost });
      const tlsReader = tlsConn.readable.getReader();
      const tlsWriter = tlsConn.writable.getWriter();

      const tlsReadResponse = async () => {
        const { value } = await tlsReader.read();
        const response = decoder.decode(value);
        console.log("SMTP TLS:", response.trim());
        return response;
      };

      const tlsSendCommand = async (command: string) => {
        console.log("Enviando:", command.includes("AUTH PLAIN") ? "AUTH PLAIN [credentials]" : command.split("\n")[0]);
        await tlsWriter.write(encoder.encode(command + "\r\n"));
        return await tlsReadResponse();
      };

      await tlsSendCommand(`EHLO ${smtpHost}`);

      const auth = btoa(`\0${smtpUser}\0${smtpPassword}`);
      await tlsSendCommand(`AUTH PLAIN ${auth}`);

      await tlsSendCommand(`MAIL FROM:<${fromEmail || "noreply@serv2all.pt"}>`);
      await tlsSendCommand(`RCPT TO:<${toEmail || "info@serv2all.pt"}>`);
      await tlsSendCommand(`RCPT TO:<${data.email}>`);
      await tlsSendCommand("DATA");
      await tlsSendCommand(emailMessage + "\r\n.");

      await tlsSendCommand("QUIT");

      tlsConn.close();

      console.log("Email enviado com sucesso via SMTP");

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
          message: "Mensagem recebida com sucesso! (Erro ao enviar email - verifique logs)",
          error: emailError instanceof Error ? emailError.message : "Erro desconhecido"
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
