const Discord = require('discord.js');

module.exports = {
    name: 'lock',
    description: '『🛠️』Tranca o chat.',
    options: [],

    run: async (client, interaction) => {
        try {
            await interaction.deferReply({ ephemeral: true });

            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                return interaction.editReply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para usar este comando.**`,
                });
            }

            const canal = interaction.channel;

            await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: false,
            });

            await interaction.editReply({
                content: `✅ **| O chat foi trancado com sucesso. Agora apenas administradores podem enviar mensagens.**`,
            });

            // Envia uma mensagem visível no canal informando que o chat foi bloqueado
            await canal.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle('🔒 Chat Trancado')
                        .setDescription('Este chat foi trancado por um administrador. Apenas administradores podem enviar mensagens no momento.')
                        .setFooter({ text: `Comando executado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                        .setTimestamp()
                ],
            });

        } catch (error) {
            console.error(error);
            interaction.editReply({
                content: `❌ **| Ocorreu um erro ao tentar trancar o chat.**`,
            });
        }
    },
};
