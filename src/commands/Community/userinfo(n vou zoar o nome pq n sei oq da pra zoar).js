const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "『👤』Exibe informações detalhadas e bonitas sobre o usuário.",
  options: [
    {
      name: "usuário",
      type: Discord.ApplicationCommandOptionType.User,
      description: "O usuário sobre o qual você deseja obter informações.",
      required: false,
    }
  ],
  run: async (client, interaction) => {
    // Se o usuário fornecer um usuário específico, ele será usado; caso contrário, usa o usuário que chamou o comando
    const targetUser = interaction.options.getUser("usuário") || interaction.user;
    const member = interaction.guild.members.cache.get(targetUser.id);
    const roles = member.roles.cache.filter(role => role.id !== interaction.guild.id).map(role => role.name).join(", ") || "Nenhum";
    const joinedAt = new Date(member.joinedTimestamp);
    const createdAt = new Date(targetUser.createdTimestamp);

    // Verificando status e atividades
    const status = member.presence ? member.presence.status : "Offline";
    const activities = member.presence?.activities.length > 0 
      ? member.presence.activities.map(activity => activity.name).join(", ")
      : "Nenhuma atividade registrada";

    const timeInServer = Math.floor((Date.now() - member.joinedTimestamp) / (1000 * 60 * 60 * 24)); // Tempo no servidor em dias
    const timeSinceCreation = Math.floor((Date.now() - targetUser.createdTimestamp) / (1000 * 60 * 60 * 24)); // Tempo desde a criação da conta em dias

    // Construindo o embed com mais detalhes e um toque visual
    const embed = new Discord.EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`${targetUser.tag} - Informações do Usuário`)
      .setDescription(`Aqui estão as informações detalhadas sobre o usuário **${targetUser.tag}**`)
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .addFields(
        { name: "🔑 ID do Usuário", value: targetUser.id, inline: true },
        { name: "📝 Apelido", value: member.nickname || "Nenhum", inline: true },
        { name: "📅 Entrou no Servidor", value: `${joinedAt.toLocaleDateString()} (${timeInServer} dias atrás)`, inline: true },
        { name: "⏳ Conta Criada em", value: `${createdAt.toLocaleDateString()} (${timeSinceCreation} dias atrás)`, inline: true },
        { name: "💬 Status", value: status.charAt(0).toUpperCase() + status.slice(1), inline: true },
        { name: "🎮 Atividades Atuais", value: activities, inline: false },
        { name: "💼 Cargos", value: roles, inline: false },
      );

    // Adicionando uma seção de badges ou informações extras, como Emojis personalizados e Bot activity
    embed.addFields(
      { name: "✨ Emojis Personalizados", value: member.user.emojis ? member.user.emojis.size : "Nenhum", inline: true },
      { name: "🔁 É Um Bot ?", value: targetUser.bot ? "Sim" : "Não", inline: true }
    );

    // Marcar a pessoa que solicitou no footer e no início
    embed.setDescription(`Aqui estão as informações detalhadas sobre o usuário **${targetUser.tag}** (solicitado por <@${interaction.user.id}>)`);

    await interaction.reply({ embeds: [embed] });
  },
};
