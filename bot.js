require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const ADMIN_ROLE = process.env.ADMIN_ROLE_NAME || "Admin";

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  // Ignorar mensagens do próprio bot
  if (message.author.bot) return;

  // Só responder em canais que começam com "ticket-"
  if (!message.channel.name.startsWith("ticket-")) return;

  // Verificar se o autor é admin
  const isAdmin = message.member?.roles?.cache?.some(
    (role) => role.name.toLowerCase() === ADMIN_ROLE.toLowerCase()
  ) || message.member?.permissions?.has("Administrator");

  try {
    // Mostrar que o bot está digitando
    await message.channel.sendTyping();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        guild_id: message.guild.id,
        channel_id: message.channel.id,
        user_message: message.content,
        is_admin: isAdmin,
        admin_user_id: isAdmin ? message.author.id : undefined,
      }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return;
    }

    const data = await response.json();

    // Se a ação for "reply", enviar a resposta
    if (data.action === "reply" && data.reply) {
      // Discord tem limite de 2000 caracteres por mensagem
      const reply = data.reply;
      if (reply.length <= 2000) {
        await message.reply(reply);
      } else {
        // Dividir em partes se for muito longo
        const parts = reply.match(/[\s\S]{1,2000}/g) || [];
        for (const part of parts) {
          await message.channel.send(part);
        }
      }
    }

    // Se admin tomou conta ou já está ativo, não fazer nada
    if (data.action === "admin_took_over") {
      console.log(`👤 Admin ${message.author.tag} assumiu o ticket #${message.channel.name}`);
    }

    if (data.action === "admin_active") {
      // Bot silencioso — admin já está cuidando deste ticket
    }
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
