const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "leavevoice",
    description: "『🛠️』Desconecta o bot do canal de voz atual.",

    run: async (client, interaction) => {
        try {
            // Verifica se o usuário tem permissão de administrador
            if (!interaction.member.permissions.has("Administrator")) {
                return interaction.reply({
                    content: "❌ Você não tem permissão para usar este comando.",
                    ephemeral: true,
                });
            }

            // Verifica se o bot está em um canal de voz
            const connection = getVoiceConnection(interaction.guild.id);

            if (!connection) {
                return interaction.reply({
                    content: "❌ O bot não está conectado a nenhum canal de voz.",
                    ephemeral: true,
                });
            }

            // Desconecta do canal de voz
            connection.destroy();
            await interaction.reply({
                content: "✅ O bot foi desconectado do canal de voz.",
                ephemeral: true,
            });
        } catch (error) {
            console.error("Erro ao desconectar do canal de voz:", error);
            interaction.reply({
                content: "❌ Ocorreu um erro ao tentar desconectar do canal de voz.",
                ephemeral: true,
            });
        }
    },
};
