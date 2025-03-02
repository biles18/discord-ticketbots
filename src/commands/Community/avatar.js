const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "『👤』Exibe o avatar de um usuário.",
  options: [
    {
      name: "user",
      type: Discord.ApplicationCommandOptionType.User,
      description: "O usuário cujo avatar você quer ver",
      required: false
    }
  ],
  run: async (client, interaction) => {  // Alterei para 'run' aqui
    const user = interaction.options.getUser("user") || interaction.user;
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 4096 });
    
    const embed = new Discord.EmbedBuilder()
      .setColor("#00FF00")
      .setTitle(`Avatar de ${user.tag}`)
      .setImage(avatarURL)
      .setURL(avatarURL);  //pega o avatar do ser humano kkk
      
    await interaction.reply({ embeds: [embed] });
  },
};
