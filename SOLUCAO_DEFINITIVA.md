# SOLUÇÃO DEFINITIVA - FORMULÁRIO DE CONTACTO

## Análise Profunda do Problema

### Problema Identificado:
O erro `net::ERR_NAME_NOT_RESOLVED` ocorre porque há **DUAS bases de dados Supabase diferentes** no histórico do projeto:

1. **Base de dados ANTIGA** (URL inválido): `0ec90b57d6e95fcbda19832f.supabase.co`
   - Este URL não resolve DNS
   - Foi usado em tentativas anteriores

2. **Base de dados ATUAL** (URL válido): `gxkkfuziwccmsdbumsiy.supabase.co`
   - Este é o projeto Supabase correto e funcional
   - Tem a tabela `contacts` configurada
   - Tem RLS policies corretas
   - Tem edge function para envio de emails

## Configuração Correta

### 1. Ficheiro `.env` Local (VERIFICADO)

```env
VITE_SUPABASE_URL=https://gxkkfuziwccmsdbumsiy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2tmdXppd2NjbXNkYnVtc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY1MDIsImV4cCI6MjA4NzY5MjUwMn0.ONpus-I2MOhrwo2Og0tqjZps0P9YSrFIYNwFV72qImc
```

### 2. Configuração Vercel (CRÍTICO)

**DEVE configurar EXATAMENTE estas variáveis:**

#### Variável: `VITE_SUPABASE_URL`
```
https://gxkkfuziwccmsdbumsiy.supabase.co
```

#### Variável: `VITE_SUPABASE_ANON_KEY`
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2tmdXppd2NjbXNkYnVtc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY1MDIsImV4cCI6MjA4NzY5MjUwMn0.ONpus-I2MOhrwo2Og0tqjZps0P9YSrFIYNwFV72qImc
```

### Passos Detalhados na Vercel:

1. Aceda ao projeto na Vercel
2. Vá a **Settings** → **Environment Variables**
3. **DELETE TODAS** as variáveis que começam com `VITE_SUPABASE_`
4. Adicione as duas variáveis acima com os valores EXATOS (copie e cole)
5. Aplique a **TODOS** os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
6. Clique em **Save**
7. Vá a **Deployments**
8. Clique nos três pontos do último deployment
9. Selecione **Redeploy**
10. Aguarde o deploy completar (2-3 minutos)

## Verificação do Sistema

### Base de Dados Verificada ✅

**Projeto Supabase:** `gxkkfuziwccmsdbumsiy`

**Tabela `contacts`:**
- ✅ Criada e funcional
- ✅ RLS ativado
- ✅ Políticas configuradas:
  - Anónimos podem INSERIR (necessário para formulário público)
  - Autenticados podem VER e ATUALIZAR

**Colunas:**
- `id` (uuid, PK)
- `name` (text)
- `email` (text)
- `phone` (text, nullable)
- `project_type` (text)
- `message` (text)
- `status` (text, default: 'new')
- `created_at` (timestamptz, default: now())

### Edge Function Verificada ✅

**Função:** `send-contact-email`
- ✅ Deployed e ACTIVE
- ✅ JWT verification: false (permite chamadas anónimas)
- ✅ CORS configurado corretamente
- ✅ Secrets configurados:
  - SMTP_HOST
  - SMTP_PORT
  - SMTP_USER
  - SMTP_PASSWORD
  - SMTP_FROM_EMAIL
  - CONTACT_RECIPIENT_EMAIL (info@serv2all.pt)
  - BREVO_API_KEY (fallback)

**Funcionalidade:**
- Envia email para `info@serv2all.pt`
- Envia cópia (CC) para o email do utilizador
- Suporta SMTP e Brevo como fallback

### Teste de Integração ✅

Teste realizado com sucesso:
- ✅ Inserção na base de dados funciona
- ✅ Dados guardados corretamente
- ✅ Timestamps automáticos funcionam

## Fluxo Completo do Formulário

### O que acontece quando o utilizador submete o formulário:

1. **Frontend (Contact.tsx)**
   - Utilizador preenche formulário
   - Click em "Enviar Mensagem"
   - Validação dos campos obrigatórios

2. **Guardar na Base de Dados**
   - Dados são enviados para Supabase via `supabase.from('contacts').insert()`
   - RLS policy permite inserção anónima
   - Contacto guardado com status 'new'
   - Timestamp automático em `created_at`

3. **Envio de Email (Edge Function)**
   - Frontend chama edge function `send-contact-email`
   - Edge function recebe dados do formulário
   - Envia email via SMTP/Brevo para:
     - **TO:** info@serv2all.pt
     - **CC:** email do utilizador
   - Email inclui todos os dados do formulário

4. **Feedback ao Utilizador**
   - Mensagem de sucesso exibida
   - Formulário limpo
   - Estado resetado após 5 segundos

## Como Verificar se Está a Funcionar

### 1. Verificação Local (antes do deploy)

Execute localmente:
```bash
npm run dev
```

Preencha e envie o formulário. Verifique na consola do browser:
- ✅ Não deve haver erros de CORS
- ✅ Não deve haver erros de DNS
- ✅ URL deve ser `gxkkfuziwccmsdbumsiy.supabase.co`

### 2. Verificação na Vercel (após deploy)

Aceda ao site em produção e:

1. Abra DevTools (F12)
2. Vá ao separador **Network**
3. Preencha e envie o formulário
4. Verifique as chamadas de rede:
   - ✅ `POST https://gxkkfuziwccmsdbumsiy.supabase.co/rest/v1/contacts`
   - ✅ Status: 201 Created
   - ✅ `POST https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/send-contact-email`
   - ✅ Status: 200 OK

### 3. Verificação de Emails

Após submissão bem-sucedida:
- ✅ Verificar inbox de `info@serv2all.pt`
- ✅ Verificar inbox do email inserido no formulário
- ✅ Ambos devem receber o email com os dados

### 4. Verificação na Base de Dados

Aceda ao Supabase Dashboard:
1. Projeto: `gxkkfuziwccmsdbumsiy`
2. Table Editor → `contacts`
3. ✅ Deve aparecer o novo registo
4. ✅ Verificar todos os campos preenchidos

## Troubleshooting

### Erro: "ERR_NAME_NOT_RESOLVED"

**Causa:** Variáveis de ambiente na Vercel têm URL antigo.

**Solução:**
1. Verifique que o URL na Vercel é: `https://gxkkfuziwccmsdbumsiy.supabase.co`
2. Se estiver diferente, DELETE e recrie as variáveis
3. Faça redeploy

### Erro: "Failed to fetch"

**Causa:** CORS ou URL incorreto.

**Solução:**
1. Verifique na consola qual URL está a ser usado
2. Confirme que é `gxkkfuziwccmsdbumsiy.supabase.co`
3. Limpe cache do browser (Ctrl+Shift+Del)
4. Recarregue com Ctrl+Shift+R

### Email não chega

**Causa:** Secrets do SMTP não configurados.

**Solução:**
Os secrets já estão configurados no Supabase. Se o email não chegar:
1. Verifique spam/lixo em `info@serv2all.pt`
2. Verifique spam/lixo no email do utilizador
3. Os dados são guardados na BD mesmo se email falhar

### Formulário não responde

**Causa:** JavaScript desativado ou erro de build.

**Solução:**
1. Verifique consola do browser por erros JavaScript
2. Confirme que o build foi bem-sucedido
3. Teste localmente primeiro

## Resumo Final

### O que foi feito:

✅ Ficheiro `.env` corrigido com credenciais corretas
✅ Base de dados verificada e funcional
✅ Tabela `contacts` com RLS configurado
✅ Edge function deployed e testada
✅ Secrets SMTP configurados
✅ Teste de integração bem-sucedido
✅ Build do projeto completado

### Próximo passo CRÍTICO:

**Configure as variáveis de ambiente na Vercel conforme descrito acima e faça redeploy.**

### Credenciais Corretas (resumo):

- **URL:** `https://gxkkfuziwccmsdbumsiy.supabase.co`
- **Project ID:** `gxkkfuziwccmsdbumsiy`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2tmdXppd2NjbXNkYnVtc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY1MDIsImV4cCI6MjA4NzY5MjUwMn0.ONpus-I2MOhrwo2Og0tqjZps0P9YSrFIYNwFV72qImc`

**IMPORTANTE:** Use EXATAMENTE estas credenciais. Qualquer diferença causará erro.
