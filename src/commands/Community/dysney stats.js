const Discord = require("discord.js");

module.exports = {
  name: "botstats",
  description: "『👤』Exibe estatísticas do bot.",
  run: async (client, interaction) => {  // Troquei todos os executes de todos os comandos dessa budega de bot, aff
    const uptime = client.uptime;
    const uptimeSeconds = Math.floor(uptime / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);

    const embed = new Discord.EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Estatísticas do Bot")
      .addFields(
        { name: "Servidores", value: `${client.guilds.cache.size}` },
        { name: "Usuários", value: `${client.users.cache.size}` },
        { name: "Canais", value: `${client.channels.cache.size}` },
        { name: "Uptime", value: `${uptimeDays}d ${uptimeHours % 24}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s` }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
