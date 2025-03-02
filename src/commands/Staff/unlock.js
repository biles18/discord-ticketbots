const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: '『🛠️』Destranca o chat, permitindo que @everyone envie mensagens.',
    options: [],

    run: async (client, interaction) => {
        try {
            // Responde ao Discord para evitar timeout
            await interaction.deferReply({ ephemeral: true });

            // Verifica se o usuário tem a permissão necessária
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                return interaction.editReply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para usar este comando.**`,
                });
            }

            // Obtém o canal onde o comando foi executado
            const canal = interaction.channel;

            // Atualiza as permissões para o @everyone
            await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: true, // Permite envio de mensagens
            });

            // Responde ao comando confirmando o sucesso
            interaction.editReply({
                content: `✅ **| O chat foi destrancado com sucesso!**`,
            });
        } catch (error) {
            console.error(`Erro ao executar o comando unlock:`, error);
            interaction.editReply({
                content: `❌ **| Ocorreu um erro ao tentar destrancar o chat.**`,
            });
        }
    },
};
