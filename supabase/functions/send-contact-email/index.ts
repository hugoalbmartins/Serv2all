import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const fromEmail = Deno.env.get("SMTP_FROM_EMAIL");
    const toEmail = Deno.env.get("CONTACT_RECIPIENT_EMAIL");
    const brevoKey = Deno.env.get("BREVO_API_KEY");
    const ccEmail = data.email;

    console.log("SMTP Config check:", {
      hasHost: !!smtpHost,
      hasPort: !!smtpPort,
      hasUser: !!smtpUser,
      hasPassword: !!smtpPassword,
      hasFromEmail: !!fromEmail,
      hasToEmail: !!toEmail,
      hasBrevoKey: !!brevoKey,
    });

    if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail || !toEmail) {
      if (!brevoKey) {
        return new Response(
          JSON.stringify({
            error: "Variáveis de ambiente não configuradas. Configure SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL, CONTACT_RECIPIENT_EMAIL ou BREVO_API_KEY.",
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
    }

    const smtpPortNum = smtpPort ? parseInt(smtpPort) : 465;

    const subject = `Nova Solicitação de Orçamento - ${data.name}`;

    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Nova Solicitação de Orçamento</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
              <p><strong>Telefone:</strong> ${escapeHtml(data.phone || "Não fornecido")}</p>
              <p><strong>Tipo de Projeto:</strong> ${escapeHtml(data.projectType)}</p>
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
Nova Solicitação de Orçamento

Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone || "Não fornecido"}
Tipo de Projeto: ${data.projectType}

Mensagem:
${data.message}

---
Este email foi enviado automaticamente pelo formulário de contacto do website Serv2all.
    `;

    await sendEmail(
      smtpHost!,
      smtpPortNum,
      smtpUser!,
      smtpPassword!,
      fromEmail!,
      toEmail!,
      ccEmail,
      subject,
      htmlContent,
      textContent
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return new Response(
      JSON.stringify({
        error: "Erro ao enviar email",
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

async function sendEmail(
  host: string,
  port: number,
  username: string,
  password: string,
  from: string,
  to: string,
  cc: string,
  subject: string,
  htmlBody: string,
  textBody: string
) {
  const auth = btoa(`${username}:${password}`);

  const emailContent = `From: ${from}
To: ${to}
Cc: ${cc}
Subject: ${subject}
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="boundary123"

--boundary123
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 7bit

${textBody}

--boundary123
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 7bit

${htmlBody}

--boundary123--`;

  const encoder = new TextEncoder();
  const encoded = encoder.encode(emailContent);

  const response = await fetch(`https://${host}:${port}/`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Authorization": `Basic ${auth}`,
    },
    body: emailContent,
  }).catch(async () => {
    return await fetch(
      `https://smtp-relay.brevo.com/api/v3/smtp/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": Deno.env.get("BREVO_API_KEY") || "",
        },
        body: JSON.stringify({
          sender: { name: "Serv2all", email: from },
          to: [{ email: to }],
          cc: [{ email: cc }],
          subject: subject,
          htmlContent: htmlBody,
          textContent: textBody,
        }),
      }
    );
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao enviar email via SMTP: ${errorText}`);
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
