const Discord = require('discord.js');

module.exports = {
    name: 'unban', // Nome do comando
    description: '『🛠️』Desbani um membro do servidor.', // Descrição
    options: [
        {
            name: 'membro',
            description: 'ID do membro a ser desbanido.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        try {
            // Responde ao Discord imediatamente para evitar timeout
            await interaction.deferReply({ ephemeral: true });

            // Verifica se o usuário tem permissão de banir membros
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
                return interaction.editReply({
                    content: `❌ **| <@${interaction.user.id}> você não tem permissão para desbanir membros.**`,
                });
            }

            const membroId = interaction.options.getString('membro');

            // Valida o formato do ID
            if (!/^\d{17,19}$/.test(membroId)) {
                return interaction.editReply({
                    content: `❌ **| O ID fornecido não é válido. Verifique e tente novamente.**`,
                });
            }

            // Busca a lista de banimentos do servidor
            const banList = await interaction.guild.bans.fetch();
            const isBanned = banList.has(membroId);

            if (!isBanned) {
                return interaction.editReply({
                    content: `❌ **| O ID fornecido não corresponde a nenhum membro banido.**`,
                });
            }

            // Desbanindo o membro
            await interaction.guild.members.unban(membroId);

            // Log de desbanimento (opcional)
            const logChannel = interaction.guild.channels.cache.find(
                (channel) => channel.name === '『📜』logs-dc' // Substitua "logs" pelo nome do canal desejado
            );

            if (logChannel) {
                const embed = new Discord.EmbedBuilder()
                    .setColor('b59702')
                    .setTitle('Membro Desbanido')
                    .addFields(
                        { name: 'Membro ID:', value: membroId },
                        { name: 'Desbanido por:', value: `<@${interaction.user.id}>` }
                    )
                    .setTimestamp();

                logChannel.send({ embeds: [embed] });
            }

            // Confirmação de sucesso
            interaction.editReply({
                content: `✅ **| O membro com ID ${membroId} foi desbanido com sucesso!**`,
            });
        } catch (error) {
            console.error(error);

            interaction.editReply({
                content: `❌ **| Ocorreu um erro ao tentar desbanir o membro. Verifique o ID e tente novamente.**`,
            });
        }
    },
};
