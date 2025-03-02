const Discord = require("discord.js");

module.exports = {
  name: "serverstats",
  description: "『📊』Exibe estatísticas detalhadas do servidor.",
  run: async (client, interaction) => {
    const { guild } = interaction;

    try {
      // Buscar dono do servidor corretamente
      const owner = await guild.fetchOwner();

      // Separar membros e bots
      const totalMembers = guild.memberCount;
      const botCount = guild.members.cache.filter(member => member.user.bot).size;
      const humanCount = totalMembers - botCount;

      // Formatar a data de criação do servidor
      const createdAt = `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`; // Formato: dia/mês/ano

      // Criar embed de resposta
      const embed = new Discord.EmbedBuilder()
        .setColor("#00FF00")
        .setTitle(`📊 Estatísticas do servidor: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: "🆔 ID do Servidor", value: `\`${guild.id}\``, inline: false },
          { name: "👑 Dono do Servidor", value: `<@${owner.id}>`, inline: false },
          { name: "👥 Membros", value: `👤 Humanos: \`${humanCount}\`\n🤖 Bots: \`${botCount}\``, inline: false },
          { name: "📢 Canais", value: `💬 Texto: \`${guild.channels.cache.filter(ch => ch.type === Discord.ChannelType.GuildText).size}\`\n🔊 Voz: \`${guild.channels.cache.filter(ch => ch.type === Discord.ChannelType.GuildVoice).size}\``, inline: false },
          { name: "🛡️ Nível de Verificação", value: `\`${guild.verificationLevel}\``, inline: false },
          { name: "📅 Criado em", value: `${createdAt}`, inline: false }
        )
        .setFooter({ text: `Solicitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao buscar informações do servidor:", error);
      await interaction.reply({ content: "❌ Ocorreu um erro ao obter as estatísticas do servidor.", ephemeral: true });
    }
  },
};
