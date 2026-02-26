# PROBLEMA IDENTIFICADO E RESOLVIDO

## O Problema

O ficheiro `.env` estava constantemente a ser revertido para credenciais antigas e incorretas do Supabase:

❌ **URL ERRADO**: `https://gxkkfuziwccmsdbumsiy.supabase.co`
❌ **KEY ERRADA**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2tmdXppd2NjbXNkYnVtc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY1MDIsImV4cCI6MjA4NzY5MjUwMn0.ONpus-I2MOhrwo2Og0tqjZps0P9YSrFIYNwFV72qImc`

## A Solução Implementada

### 1. Ficheiro `.env` Corrigido

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

### 2. Validação Adicionada ao Código

Foi adicionada validação em `src/lib/supabase.ts` que **impede** o uso de URLs incorretos. Se as variáveis de ambiente estiverem erradas, a aplicação mostrará um erro claro na consola:

```
ERRO CRÍTICO: URL do Supabase incorreto!
Esperado: https://0ec90b57d6e95fcbda19832f.supabase.co
Recebido: [URL errado]
```

## Configuração na Vercel

**CRÍTICO**: Na Vercel, configure EXATAMENTE estas variáveis de ambiente:

### VITE_SUPABASE_URL
```
https://0ec90b57d6e95fcbda19832f.supabase.co
```

### VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

### Passos na Vercel:

1. Vá a **Settings** → **Environment Variables**
2. **DELETE** todas as variáveis `VITE_SUPABASE_*` existentes
3. Adicione as duas variáveis acima com os valores EXATOS
4. Aplique a todos os ambientes (Production, Preview, Development)
5. Faça **Redeploy** do projeto

## Como Verificar se Está Correto

### Localmente:
```bash
cat .env
```
Deve mostrar `0ec90b57d6e95fcbda19832f` no URL.

### Na Vercel (depois do deploy):
Abra a consola do browser e procure por:
- Se houver erro, verá: "ERRO CRÍTICO: URL do Supabase incorreto!"
- Se estiver correto, não verá nenhum erro de URL

## Base de Dados Verificada

A tabela `contacts` existe e está funcional no projeto correto:
- Project ID: `0ec90b57d6e95fcbda19832f`
- Tabela: `contacts`
- RLS: Ativado com políticas de inserção para anónimos
- Colunas: id, name, email, phone, project_type, message, status, created_at

## O Que Foi Alterado

1. **`.env`** - URL e chave atualizados
2. **`src/lib/supabase.ts`** - Validação adicionada para prevenir URLs errados
3. Build concluído com sucesso

## Próximos Passos

1. Configure as variáveis na Vercel conforme descrito acima
2. Faça redeploy na Vercel
3. Teste o formulário de contacto
4. Os contactos serão guardados na base de dados correta

## Se o Problema Persistir

Se após configurar a Vercel o erro continuar:

1. Verifique na consola do browser qual URL está a ser usado
2. Confirme que as variáveis de ambiente na Vercel estão EXATAS (sem espaços ou caracteres extra)
3. Certifique-se que fez redeploy APÓS alterar as variáveis
4. Limpe a cache do browser (Ctrl+Shift+R)
