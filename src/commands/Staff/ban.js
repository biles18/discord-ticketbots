const Discord = require('discord.js');

module.exports = {
    name: 'ban', // Nome do comando
    description: '『🛠️』Aplica um banimento a um usuário.', // Descrição
    options: [
        {
            name: 'membro',
            description: 'Membro a ser banido.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Motivo do banimento.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        try {
            // Responde ao Discord imediatamente para evitar timeout
            await interaction.deferReply({ ephemeral: true });

            // Verifica se o usuário tem permissões para banir membros
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
                return interaction.editReply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para banir membros.**`,
                });
            }

            const membro = interaction.options.getUser('membro');
            const motivo = interaction.options.getString('motivo') || 'Nenhum motivo fornecido';

            // Banindo o membro
            const membroAlvo = await interaction.guild.members.fetch(membro.id).catch(() => null);
            if (!membroAlvo) {
                return interaction.editReply({
                    content: `❌ **| Não foi possível encontrar o membro especificado no servidor.**`,
                });
            }

            await membroAlvo.ban({ reason: motivo });

            // Log no canal de logs (ID pode ser definido manualmente ou obtido dinamicamente)
            const logChannelId = '1337922385885528064'; // Substitua por um ID válido
            const logChannel = interaction.guild.channels.cache.get(logChannelId);

            if (logChannel) {
                const embed = new Discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Membro Banido')
                    .addFields(
                        { name: 'Membro:', value: `${membro.tag} (${membro.id})` },
                        { name: 'Motivo:', value: motivo },
                        { name: 'Banido por:', value: `<@${interaction.user.id}>` }
                    )
                    .setTimestamp();

                logChannel.send({ embeds: [embed] });
            } else {
                console.log(`Canal de logs não encontrado. Verifique o ID: ${logChannelId}`);
            }

            // Confirmação de sucesso
            interaction.editReply({
                content: `✅ **| O membro ${membro.tag} foi banido com sucesso!**`,
            });

        } catch (error) {
            console.error(error);
            interaction.editReply({
                content: `❌ **| Ocorreu um erro ao tentar banir o membro.**`,
            });
        }
    },
};
