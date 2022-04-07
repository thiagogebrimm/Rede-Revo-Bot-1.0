const Discord = require("discord.js");
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const parseMs = require('ms');
const Sorteios = require("../../db/Models/Sorteio");

module.exports = {
    name: 'sorteio',
    aliases: ['sortear'],
    category: 'Admin',
    description: 'Crie um sorteio!',
    usage: '',
    options: [
        {
            name: "canal",
            type: "CHANNEL",
            description: "Selecione o canal do anuncio!",
            channel_types: [0, 5],
            required: true
        },
        {
            name: "tempo",
            type: "STRING",
            description: "Tempo do sorteio, por exemplo: 1d 1h 10s",
            required: true
        },
        {
            name: "premio",
            type: "STRING",
            description: "Qual o prêmio do sorteio?",
            required: true
        },
        {
            name: "maxwinners",
            type: "INTEGER",
            minValue: 1,
            description: "Quantos ganhadores?",
            required: true
        },
        {
            name: "mtodos",
            type: "STRING",
            description: "Mencionar todos?",
            required: true,
            choices: [
                {
                    name: "Sim",
                    value: "true"
                },
                {
                    name: "Não",
                    value: "false"
                }
            ]
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.editReply("Sem permissão para executar esse comando!")
        }

        const canal = interaction.options.getChannel("canal")
        if (canal.type !== "GUILD_TEXT") return interaction.editReply("Só posso enviar mensagens em um canal de texto.")
        await interaction.deleteReply()
        const tempo = interaction.options.getString("tempo")
        const premio = interaction.options.getString("premio")
        const maxwinners = interaction.options.getInteger("maxwinners")
        const mtodos = interaction.options.getString("mtodos")

        const tempoMs = parseMs(tempo)

        const embed = new MessageEmbed()
            .setTitle("Sorteio")
            .setDescription(`
        Olá! Um novo sorteio está rolando!
        
        
        **Encerra em:** <t:${~~((Date.now() + tempoMs) / 1000)}:R>
        **Prêmio:** \`${premio}\`
        **Max. Ganhadores:** \`${maxwinners}\`
        `)
            .setColor("AQUA")
            .setFooter({text: `Teste`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

        const f = await canal.send({
            embeds: [embed]
        })

        f.react('🎉')

        if (mtodos == 'true') {
            canal.send("@here").then(f => f.delete({ timeout: 5000 }))
        }

        await Sorteios.create({
            authorId: interaction.user.id,
            maxWinners: maxwinners,
            time: Date.now() + tempoMs,
            timeMs: tempoMs,
            premio,
            messageId: f.id,
            channelId: canal.id,
            ended: false
        })

        client.emit('sorteioCreated', f)
    }
}