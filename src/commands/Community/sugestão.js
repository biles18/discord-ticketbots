const Discord = require("discord.js");

module.exports = {
  name: "sugestão",
  description: "Envia uma sugestão.",
  options: [
    {
      name: "mensagem",
      type: Discord.ApplicationCommandOptionType.String,
      description: "A sugestão que você quer enviar para o servidor",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const minigame = interaction.options.getString("minigame");
    const mensagem = interaction.options.getString("mensagem");

    // Insira o ID do canal diretamente aqui
    const canalSugestoesId = "1268903845447077903"; // Substitua pelo ID do canal de sugestões

    // Busca o canal de sugestões
    const sugestaoChannel = await client.channels.fetch(canalSugestoesId);

    if (!sugestaoChannel) {
      return interaction.reply({
        content: "❌ | O canal de sugestões não foi encontrado. Verifique o ID.",
        ephemeral: true,
      });
    }

    const embed = new Discord.EmbedBuilder()
      .setColor("#FFA500") // Cor laranja
      .setTitle(`Nova Sugestão`)
      .setDescription(mensagem)
      .setFooter({ text: `Sugestão enviada por ${interaction.user.tag}` });

    await sugestaoChannel.send({ embeds: [embed] });
    await interaction.reply({
      content: "✅ | Sua sugestão foi enviada com sucesso!",
      ephemeral: true,
    });
  },
};
