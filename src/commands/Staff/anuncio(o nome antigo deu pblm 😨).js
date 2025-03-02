const Discord = require("discord.js");

module.exports = {
  name: "falar",
  description: "『🛠️』Envie uma mensagem personalizada no canal atual.",
  options: [
    {
      name: "formato",
      description: "Escolha o formato da mensagem (embed ou normal).",
      type: 3, // STRING
      required: true,
      choices: [
        { name: "Embed", value: "embed" },
        { name: "Normal", value: "normal" }
      ]
    }
  ],
  run: async (client, interaction) => {
    // Verificar se o usuário possui o cargo necessário
    const roleId = "1331473796799922277";
    if (!interaction.member.roles.cache.has(roleId)) {
      return interaction.reply({
        content: "🚫 Você não tem permissão para usar este comando.",
        ephemeral: true
      });
    }

    // Obter o formato selecionado
    const formato = interaction.options.getString("formato");

    // Mensagem inicial que será visível apenas para o usuário
    const mensagemInicial = await interaction.reply({
      content: "O que você deseja que eu fale? Envie a mensagem abaixo desta mensagem.",
      ephemeral: true
    });

    // Criar um coletor de mensagens para capturar a mensagem do usuário
    const filter = (msg) => msg.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

    collector.on("collect", async (msg) => {
      try {
        // Enviar a mensagem no formato escolhido
        if (formato === "embed") {
          const embed = new Discord.EmbedBuilder()
            .setColor("#8A2BE2") // Violeta escuro
            .setDescription(msg.content);
          await interaction.channel.send({ embeds: [embed] });
        } else {
          await interaction.channel.send(msg.content);
        }

        // Apagar a mensagem do usuário
        await msg.delete();

        // Informar ao usuário que a mensagem foi enviada
        await interaction.followUp({
          content: "Mensagem enviada com sucesso!",
          ephemeral: true
        });
      } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        await interaction.followUp({
          content: "Houve um erro ao enviar a mensagem. Tente novamente.",
          ephemeral: true
        });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.followUp({
          content: "Você não enviou nenhuma mensagem a tempo.",
          ephemeral: true
        });
      }
    });
  }
};
