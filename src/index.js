const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
console.clear();

// Cria uma nova instância do cliente com as intenções e parcials apropriados
const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials),
});

client.slashCommands = new Collection();

// Importa o token de um arquivo de configuração (certifique-se de que este arquivo não está versionado!)
const { token } = require('../config.json');
client.login(token);

// Importa e executa os eventos e o handler
const evento = require('./handler/Events');
evento.run(client);
require('./handler/index')(client);

// Manipula rejeições de promessas não tratadas
process.on('unhandledRejection', (reason, promise) => {
  console.error(`🚫 Erro Detectado:\n\n`, reason, promise);
});

// Manipula exceções não capturadas
process.on('uncaughtException', (error, origin) => {
  console.error(`🚫 Erro Detectado:\n\n`, error, origin);
});
