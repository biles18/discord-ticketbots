const Discord = require("discord.js");

module.exports = {
  name: "roleinfo",
  description: "『👤』Exibe informações sobre um cargo específico.",
  options: [
    {
      name: "role",
      type: Discord.ApplicationCommandOptionType.Role,
      description: "O cargo que você quer ver informações",
      required: true
    }
  ],
  run: async (client, interaction) => {
    const role = interaction.options.getRole("role");

    const embed = new Discord.EmbedBuilder()
      .setColor(role.color)
      .setTitle(`Informações do cargo: ${role.name}`)
      .addFields(
        { name: "ID do Cargo", value: role.id },
        { name: "Membros", value: `${role.members.size}` },
        { name: "Cor", value: role.hexColor },
        { name: "Criado em", value: new Date(role.createdTimestamp).toLocaleDateString() }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
