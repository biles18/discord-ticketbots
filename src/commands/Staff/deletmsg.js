const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: '『🛠️』Deleta uma quantidade específica de mensagens.',
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens a serem deletadas.',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                return interaction.reply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para usar este comando.**`,
                    ephemeral: true,
                });
            }

            const quantidade = interaction.options.getInteger('quantidade');

            if (quantidade < 1 || quantidade > 100) {
                return interaction.reply({
                    content: `❌ **| Insira um número entre 1 e 100.**`,
                    ephemeral: true,
                });
            }

            const mensagens = await interaction.channel.bulkDelete(quantidade, true);

            await interaction.reply({
                content: `✅ **| ${mensagens.size} mensagens deletadas com sucesso!**`,
                ephemeral: true,
            });

            // Envia uma mensagem visível informando sobre a limpeza
            await interaction.channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor('Blue')
                        .setTitle('🗑️ Mensagens Apagadas')
                        .setDescription(`Foram deletadas **${mensagens.size}** mensagens neste chat.`)
                        .setFooter({ text: `Comando executado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                        .setTimestamp()
                ],
            });

        } catch (error) {
            console.error(error);
            interaction.reply({
                content: `❌ **| Ocorreu um erro ao tentar deletar as mensagens.**`,
                ephemeral: true,
            });
        }
    },
};
