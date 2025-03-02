const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "joinvoice",
    description: "『🛠️』Conecta o bot ao canal de voz especificado.",

    options: [
        {
            name: "canal",
            description: "O canal de voz que o bot deve entrar.",
            type: 7, // Channel type
            required: true,
        },
    ],

    run: async (client, interaction) => {
        try {
            // Verifica se o usuário tem permissão de administrador
            if (!interaction.member.permissions.has("Administrator")) {
                return interaction.reply({
                    content: "❌ Você não tem permissão para usar este comando.",
                    ephemeral: true,
                });
            }

            const canal = interaction.options.getChannel("canal");

            // Verifica se o canal selecionado é de voz
            if (!canal || canal.type !== 2) { // 2 é o tipo para canais de voz
                return interaction.reply({
                    content: "❌ Por favor, selecione um canal de voz válido.",
                    ephemeral: true,
                });
            }

            // Conecta ao canal de voz
            joinVoiceChannel({
                channelId: canal.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            await interaction.reply({
                content: `✅ Conectado ao canal de voz: **${canal.name}**.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error("Erro ao conectar ao canal de voz:", error);
            interaction.reply({
                content: "❌ Ocorreu um erro ao tentar conectar ao canal de voz.",
                ephemeral: true,
            });
        }
    },
};
