# Bot Discord - Ticket AI

Bot que responde automaticamente em canais `ticket-*` usando IA.  
Quando um admin fala no canal, o bot para de responder naquele ticket.

## Arquivos

- `bot.js` — código do bot
- `package.json` — dependências
- `.env.example` — variáveis de ambiente

---

## Passo a Passo

### 1. Pré-requisitos
- [Node.js 18+](https://nodejs.org/) instalado
- Um bot Discord criado em https://discord.com/developers/applications
- O bot adicionado ao seu servidor com permissões de **ler mensagens** e **enviar mensagens**

### 2. Criar pasta do projeto

```bash
mkdir ticket-bot && cd ticket-bot
```

### 3. Criar os arquivos

Copie os 3 arquivos abaixo (`bot.js`, `package.json`, `.env`) para a pasta.

### 4. Configurar o `.env`

Renomeie `.env.example` para `.env` e preencha:

```env
DISCORD_BOT_TOKEN=seu_token_do_bot_discord
API_URL=https://agdyxpsbixrfwglecqvk.supabase.co/functions/v1/discord-ai-reply
API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZHl4cHNiaXhyZndnbGVjcXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDkxNzEsImV4cCI6MjA4Nzk4NTE3MX0.SJLN26wFqJe_wavo9ovuNHXAWW7XR3IkrKtcbvl4noY
ADMIN_ROLE_NAME=Admin
```

> O `API_KEY` já está preenchido com a chave pública do seu projeto.

### 5. Instalar e rodar

```bash
npm install
node bot.js
```

O bot deve aparecer **online** no Discord! 🟢

---

## Hospedagem Gratuita

### Opção 1: Railway (recomendado)
1. Acesse [railway.app](https://railway.app) e faça login com GitHub
2. Clique em **New Project → Deploy from GitHub repo**
3. Suba os arquivos para um repositório GitHub
4. Adicione as variáveis de ambiente em **Variables**
5. Deploy automático!

### Opção 2: Replit
1. Acesse [replit.com](https://replit.com)
2. Crie um novo Repl (Node.js)
3. Cole os arquivos
4. Adicione as variáveis em **Secrets**
5. Clique em **Run**

### Opção 3: VPS (Oracle Free Tier)
1. Crie uma VM gratuita em [cloud.oracle.com](https://cloud.oracle.com)
2. Instale Node.js
3. Use `pm2` para manter o bot rodando:
```bash
npm install -g pm2
pm2 start bot.js
pm2 save
```
