# Configuração de Variáveis de Ambiente para Vercel

## Problema
Os emails de contacto não estão a ser enviados porque as variáveis de ambiente do SMTP não estão configuradas em Vercel.

## Solução

### Passo 1: Aceder ao Dashboard da Vercel
1. Vá para https://vercel.com
2. Seleccione seu projecto
3. Vá para **Settings** (Configurações)
4. Clique em **Environment Variables** (Variáveis de Ambiente)

### Passo 2: Adicionar Variáveis SMTP

Adicione estas variáveis exatamente como indicado:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `SMTP_HOST` | `cpanel75.dnscpanel.com` | Servidor SMTP |
| `SMTP_PORT` | `465` | Porto SMTP (SSL) |
| `SMTP_USER` | `info@serv2all.pt` | Utilizador de email |
| `SMTP_PASSWORD` | `[sua_senha_smtp]` | Senha de email (guardar em segurança) |
| `SMTP_FROM_EMAIL` | `info@serv2all.pt` | Email de origem |
| `CONTACT_RECIPIENT_EMAIL` | `info@serv2all.pt` | Email para receber os contactos |

**Opcional:**
| Variável | Valor | Descrição |
|----------|-------|-----------|
| `BREVO_API_KEY` | `[sua_chave_api]` | Chave API Brevo (fallback) |

### Passo 3: Fazer Deploy

Após adicionar as variáveis:

1. Committa as alterações locais:
   ```bash
   git add .
   git commit -m "Update email configuration"
   git push origin main
   ```

2. A Vercel fará o deploy automaticamente

### Passo 4: Testar

1. Aceda ao website
2. Preencha o formulário de contacto
3. Verifique se o email foi recebido em info@serv2all.pt

## Segurança

- **Nunca** coloque a senha SMTP no código
- Use apenas as variáveis de ambiente
- A senha está encriptada no Vercel
- Não é visível em ficheiros de configuração

## Troubleshooting

### Emails não estão a chegar

1. **Verificar credenciais**
   - Confirme que a senha está correcta
   - Teste a conexão SMTP manualmente

2. **Verificar logs**
   - Aceda a Vercel > Deployments > Logs
   - Procure mensagens de erro

3. **Verificar firewall**
   - Porta 465 pode estar bloqueada
   - Contacte o seu fornecedor de alojamento

4. **Fallback Brevo**
   - Se SMTP falhar, usa API Brevo
   - Configure a chave `BREVO_API_KEY`

## Estrutura de Funcionamento

```
Formulário de Contacto (Frontend)
    ↓
Edge Function (Supabase)
    ↓
Tenta enviar via SMTP (cpanel75.dnscpanel.com:465)
    ↓ (Se falhar)
Fallback para Brevo API
    ↓
Email enviado com sucesso
```
