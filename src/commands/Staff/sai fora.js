const Discord = require('discord.js');

module.exports = {
    name: 'kick', // Nome do comando
    description: '『🛠️』Expulsa um membro do servidor.', // Descrição
    options: [
        {
            name: 'membro',
            description: 'Membro a ser expulso.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Motivo da expulsão.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        try {
            // Responde ao Discord imediatamente para evitar timeout
            await interaction.deferReply({ ephemeral: true });

            // Verifica se o usuário tem permissões para expulsar membros
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
                return interaction.editReply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para expulsar membros.**`,
                });
            }

            const membro = interaction.options.getUser('membro');
            const motivo = interaction.options.getString('motivo') || 'Nenhum motivo fornecido';

            // Expulsando o membro
            await interaction.guild.members.kick(membro, { reason: motivo });

            // Envia o log de expulsão no canal de logs
            const logChannel = interaction.guild.channels.cache.find(ch => ch.name === '1337922385885528064'); // Usando um canal de logs pré-definido

            if (!logChannel) {
                return interaction.editReply({
                    content: `❌ **| Não foi possível encontrar o canal de logs.**`,
                });
            }

            // Envia a mensagem de log no canal de logs
            const embed = new Discord.EmbedBuilder()
                .setColor('#FF0000') // Cor do embed de expulsão
                .setTitle('Membro Expulso')
                .addFields(
                    { name: 'Membro:', value: `${membro.tag} (${membro.id})` },
                    { name: 'Motivo:', value: motivo },
                    { name: 'Expulso por:', value: `<@${interaction.user.id}>` }
                )
                .setTimestamp();

            logChannel.send({ embeds: [embed] });

            // Confirmação de sucesso
            interaction.editReply({
                content: `✅ **| O membro ${membro.tag} foi expulso com sucesso!**`,
            });

        } catch (error) {
            console.error(error);
            interaction.editReply({
                content: `❌ **| Ocorreu um erro ao tentar expulsar o membro.**`,
            });
        }
    },
};
