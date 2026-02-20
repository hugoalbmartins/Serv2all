# Deployment - Variáveis de Ambiente

## Vercel Deployment

Para fazer deploy na Vercel e ativar o envio de emails, configure as seguintes variáveis de ambiente:

### Variáveis SMTP (Email)

Adicione estas variáveis no painel de Settings > Environment Variables da Vercel:

```
SMTP_HOST=cpanel75.dnscpanel.com
SMTP_PORT=465
SMTP_USER=info@serv2all.pt
SMTP_PASSWORD=<sua_senha_smtp_aqui>
SMTP_FROM_EMAIL=info@serv2all.pt
CONTACT_RECIPIENT_EMAIL=info@serv2all.pt
```

### Variáveis Supabase (Já configuradas)

As variáveis do Supabase já estão pré-configuradas no ambiente Supabase:

```
SUPABASE_URL=https://egosiunlftyrzznnenoj.supabase.co
SUPABASE_ANON_KEY=<anonkey>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
SUPABASE_DB_URL=<database_url>
```

### Variável de Fallback (Brevo)

Opcionalmente, configure a chave Brevo como fallback:

```
BREVO_API_KEY=<sua_chave_api_brevo>
```

## Passos para Deploy

1. **Configurar Variáveis no Vercel**
   - Acesse https://vercel.com
   - Vá para seu projeto
   - Settings > Environment Variables
   - Adicione cada variável acima

2. **Fazer Deploy**
   ```bash
   # Push para o seu repositório (main/deploy branch)
   git add .
   git commit -m "Update email configuration"
   git push
   ```

3. **Testar Envio de Emails**
   - Abra o website
   - Preencha o formulário de contacto
   - Verifique se recebe o email em info@serv2all.pt

## Supabase Edge Functions

A função `send-contact-email` está configurada como Edge Function do Supabase e:

- Recebe dados do formulário de contacto
- Envia via SMTP (cpanel75.dnscpanel.com) na porta 465
- Fallback para Brevo se SMTP falhar
- Suporta CC para o email do cliente

## Troubleshooting

Se os emails não estão sendo enviados:

1. Verifique se todas as variáveis estão configuradas
2. Confirme que a senha SMTP está correta
3. Teste a conexão SMTP manualmente
4. Verifique os logs da Edge Function no Supabase Dashboard
5. Confirme que o firewall/antivírus não está bloqueando porta 465
