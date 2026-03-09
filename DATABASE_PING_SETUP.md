# Configuração do Ping de Base de Dados

Este documento explica como manter a base de dados Supabase ativa usando pings periódicos.

## Edge Function Criada

Foi criada uma Edge Function chamada `database-ping` que:
- Faz uma consulta simples à tabela `contacts`
- Retorna sucesso/erro com timestamp
- Está disponível publicamente (sem autenticação)

## URL da Edge Function

```
https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/database-ping
```

## Como Configurar o Ping Automático

Para manter a base de dados ativa com pings a cada 4 dias, pode usar um dos seguintes serviços gratuitos:

### Opção 1: UptimeRobot (Recomendado)

1. Aceda a [uptimerobot.com](https://uptimerobot.com) e crie uma conta gratuita
2. Clique em "Add New Monitor"
3. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Serv2All Database Ping
   - **URL**: `https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/database-ping`
   - **Monitoring Interval**: 5 dias (o plano gratuito permite no mínimo 5 minutos, mas pode usar o intervalo máximo)
4. Clique em "Create Monitor"

**Nota**: O UptimeRobot no plano gratuito não permite intervalos de 4 dias. Pode usar o intervalo máximo disponível ou considerar outras opções.

### Opção 2: Cron-job.org

1. Aceda a [cron-job.org](https://cron-job.org) e crie uma conta gratuita
2. Clique em "Create cronjob"
3. Configure:
   - **Title**: Serv2All Database Ping
   - **URL**: `https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/database-ping`
   - **Schedule**: Escolha "Every 4 days" ou configure manualmente
4. Clique em "Create cronjob"

### Opção 3: Easycron

1. Aceda a [easycron.com](https://www.easycron.com) e crie uma conta gratuita
2. Crie um novo cron job
3. Configure:
   - **URL**: `https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/database-ping`
   - **Cron Expression**: `0 0 */4 * *` (a cada 4 dias à meia-noite)
4. Salve o cron job

## Testar Manualmente

Pode testar o ping manualmente usando:

```bash
curl https://gxkkfuziwccmsdbumsiy.supabase.co/functions/v1/database-ping
```

A resposta esperada é:
```json
{
  "success": true,
  "message": "Database ping successful",
  "timestamp": "2026-03-09T..."
}
```

## Notas Importantes

- A Edge Function é pública e não requer autenticação
- Faz apenas uma consulta de leitura simples (não modifica dados)
- O serviço de monitorização precisa ser configurado manualmente (escolha uma das opções acima)
- Todos os serviços mencionados têm planos gratuitos suficientes para esta funcionalidade
