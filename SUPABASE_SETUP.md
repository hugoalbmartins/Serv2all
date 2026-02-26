# Configuração Completa do Supabase

## 1. Configurar Secrets da Edge Function

A Edge Function já foi deployada com sucesso, mas precisa configurar as variáveis de ambiente SMTP.

### Aceder ao Dashboard do Supabase

1. Vá para https://supabase.com/dashboard
2. Selecione o projeto: **0ec90b57d6e95fcbda19832f**
3. No menu lateral, clique em **Edge Functions**
4. Clique na função **send-contact-email**
5. Vá para a aba **Settings** ou **Secrets**

### Adicionar os Secrets

Configure os seguintes secrets (copie e cole os valores exatos):

| Nome do Secret | Valor |
|----------------|-------|
| `SMTP_HOST` | `cpanel75.dnscpanel.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@serv2all.pt` |
| `SMTP_PASSWORD` | `1408983Hm*` |
| `SMTP_FROM_EMAIL` | `info@serv2all.pt` |
| `CONTACT_RECIPIENT_EMAIL` | `info@serv2all.pt` |

**Importante:** Depois de adicionar os secrets, faça um redeploy da Edge Function clicando no botão "Deploy" ou "Redeploy".

---

## 2. Configurar Variáveis de Ambiente na Vercel

Quando fizer o deploy do projeto na Vercel, configure as seguintes variáveis:

### Variáveis Obrigatórias

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

### Como Adicionar na Vercel

1. Aceda ao dashboard da Vercel: https://vercel.com
2. Selecione o seu projeto
3. Vá para **Settings** → **Environment Variables**
4. Adicione cada variável individualmente
5. Selecione todos os ambientes: **Production**, **Preview** e **Development**
6. Clique em **Save**

---

## 3. Testar o Formulário de Contacto

Após configurar os secrets no Supabase:

1. Aceda ao seu website
2. Vá para a secção "Contactos"
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. Verifique se recebeu o email em **info@serv2all.pt**

---

## Estrutura de Funcionamento

```
Frontend (Vercel)
    ↓
Supabase Edge Function
    ↓
SMTP Server (cpanel75.dnscpanel.com:465)
    ↓
Email Enviado ✓
```

---

## Troubleshooting

### Erro "Failed to fetch" ou "ERR_NAME_NOT_RESOLVED"

**Causa:** Edge Function não deployada ou secrets não configurados

**Solução:**
1. Verifique se a Edge Function está deployada no dashboard do Supabase
2. Confirme que todos os secrets estão configurados
3. Faça um redeploy da Edge Function

### Email não chega

**Possíveis causas:**
1. Senha SMTP incorreta
2. Servidor SMTP bloqueado
3. Firewall bloqueando porta 465

**Solução:**
1. Verifique os logs da Edge Function no Supabase
2. Teste as credenciais SMTP manualmente
3. Contacte o fornecedor de alojamento

---

## Segurança

- Todos os secrets estão protegidos no Supabase
- A senha SMTP nunca é exposta no frontend
- As variáveis `VITE_*` são públicas (apenas chaves anon)
- NUNCA commite a senha SMTP no código
