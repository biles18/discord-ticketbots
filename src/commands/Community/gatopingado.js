module.exports = {
  name: "gato_pingado",
  description: "『👤』Verifica a latência do bot.",
  run: async (client, interaction) => {  // budega veia
    const sent = await interaction.reply({ content: "Pingando...", fetchReply: true });
    interaction.editReply(`Pong! A latência é de ${sent.createdTimestamp - interaction.createdTimestamp}ms.`);
  },
};
