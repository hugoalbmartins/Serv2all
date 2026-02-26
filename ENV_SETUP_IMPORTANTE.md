# ⚠️ CONFIGURAÇÃO CRÍTICA - VARIÁVEIS DE AMBIENTE

## PROBLEMA IDENTIFICADO

O ficheiro `.env` está a ser revertido automaticamente para credenciais antigas/incorretas do Supabase.

## CREDENCIAIS CORRETAS (USAR SEMPRE ESTAS)

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

## CREDENCIAIS ANTIGAS/ERRADAS (NÃO USAR)

❌ URL antigo: `https://gxkkfuziwccmsdbumsiy.supabase.co`
❌ Key antiga: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2tmdXppd2NjbXNkYnVtc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY1MDIsImV4cCI6MjA4NzY5MjUwMn0.ONpus-I2MOhrwo2Og0tqjZps0P9YSrFIYNwFV72qImc`

## CONFIGURAÇÃO PARA VERCEL

Na Vercel, configure estas variáveis de ambiente (Settings → Environment Variables):

1. **VITE_SUPABASE_URL**
   - Value: `https://0ec90b57d6e95fcbda19832f.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw`

## COMO VERIFICAR SE ESTÁ CORRETO

Execute este comando para verificar se o `.env` está correto:

```bash
cat .env
```

Deve mostrar o URL `0ec90b57d6e95fcbda19832f` e NÃO `gxkkfuziwccmsdbumsiy`.

## SE O ERRO PERSISTIR

1. Pare o servidor de desenvolvimento
2. Verifique que o `.env` tem as credenciais corretas
3. Limpe a cache: `rm -rf node_modules/.vite`
4. Reconstrua: `npm run build`
5. Inicie novamente o servidor

## ESTRUTURA DA BASE DE DADOS

A tabela `contacts` existe no projeto correto (`0ec90b57d6e95fcbda19832f`) com:
- id (uuid)
- name (text)
- email (text)
- phone (text, nullable)
- project_type (text)
- message (text)
- status (text, default 'new')
- created_at (timestamptz)

Row Level Security está ativado e permite inserções anónimas.
