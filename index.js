require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🤖 Bot de Telegram iniciado...");

// /start - Bienvenida
bot.onText(/\/start/, (msg) => {
  const nombre = msg.from.first_name;
  bot.sendMessage(
    msg.chat.id,
    `👋 ¡Hola, ${nombre}! Soy tu bot de práctica.\n\n` +
    `Estos son mis comandos:\n` +
    `📌 /start - Mensaje de bienvenida\n` +
    `🎲 /dado - Lanza un dado\n` +
    `🌤 /chiste - Cuéntame un chiste\n` +
    `🕐 /hora - Dime qué hora es\n` +
    `🪞 /eco [texto] - Te repito lo que digas`
  );
});

// /dado - Número aleatorio del 1 al 6
bot.onText(/\/dado/, (msg) => {
  const resultado = Math.floor(Math.random() * 6) + 1;
  const caras = ["", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
  bot.sendMessage(msg.chat.id, `🎲 Lanzaste el dado y salió: ${caras[resultado]} (${resultado})`);
});

// /chiste - Chiste aleatorio
bot.onText(/\/chiste/, (msg) => {
  const chistes = [
    "¿Por qué los programadores prefieren el frío? Porque tienen miedo a los bugs. 🐛",
    "¿Cuántos programadores hacen falta para cambiar una bombilla? Ninguno, es un problema de hardware. 💡",
    "Un SQL entra a un bar, se acerca a dos mesas y pregunta: ¿Puedo unirme? 😂",
    "Hay 10 tipos de personas: las que entienden binario y las que no. 😏",
    "¿Por qué el programador dejó su trabajo? Porque no le daban arrays. 📦",
  ];
  const chiste = chistes[Math.floor(Math.random() * chistes.length)];
  bot.sendMessage(msg.chat.id, `😂 ${chiste}`);
});

// /hora - Hora actual
bot.onText(/\/hora/, (msg) => {
  const ahora = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  bot.sendMessage(msg.chat.id, `🕐 Son las: ${ahora} (hora Colombia)`);
});

// /eco - Repite el mensaje
bot.onText(/\/eco (.+)/, (msg, match) => {
  const texto = match[1];
  bot.sendMessage(msg.chat.id, `🪞 Dijiste: "${texto}"`);
});

// Respuesta a mensajes normales (sin comando)
bot.on("message", (msg) => {
  if (msg.text && !msg.text.startsWith("/")) {
    const respuestas = [
      "🤔 Interesante lo que dices...",
      "💬 ¡Recibido! Usa /start para ver mis comandos.",
      "👀 Hmm, no entendí muy bien. Prueba con /start",
      "🤖 Soy un bot sencillo, ¡pero aprendo rápido!",
    ];
    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
    bot.sendMessage(msg.chat.id, respuesta);
  }
});

// Manejo de errores
bot.on("polling_error", (error) => {
  console.error("❌ Error de polling:", error.message);
});
