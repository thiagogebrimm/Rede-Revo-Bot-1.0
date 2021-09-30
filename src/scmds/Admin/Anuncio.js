const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'anuncio',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de anuncio.',
    usage: '',
    options: [
        {
            name: "canal",
            type: "CHANNEL",
            description: "Selecione o canal do anuncio!",
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
    run: async(client, interaction, args) => {
        if(!interaction.member.permissions.has('ADMINISTRATOR')){
            interaction.reply("**você não tem permissão.**")
        } else {
 const canal = interaction.options.get("canal").channel
 if(canal.type !== "GUILD_TEXT") return interaction.editReply("Só posso enviar mensagens em um canal de texto.")
     
                if(!canal){
                    interaction.channel.send('⚠️ Esse canal não existe.')
                } else {
     
                    interaction.editReply('⚠️ Qual o título do anúncio?').then(msg2 => {
                        const filter = x => x.author.id == interaction.user.id
                        let c2 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
                        .on('collect', c => {
                            const titulo = c.content
     
                            interaction.channel.send({
                                content: '⚠️ Qual o anúncio?',
                                reply: {
                                    messageReference: c.id
                                }
                            }).then(msg3 => {
                                let c3 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
                                .on('collect', c => {
                                    const anuncio = c.content
                                    interaction.channel.send({
                                        content: '⚠️ Anúncio enviado com sucesso!',
                                        reply: {
                                            messageReference: c.id
                                        }
                                    })
     
                                    let embed = new Discord.MessageEmbed()
                                    .setTimestamp()
                                    .setThumbnail(client.user.displayAvatarURL())
                                    .setTitle(`${titulo}`)
                                    .setColor('ORANGE')
                                    .setDescription(`${anuncio}`)
     
                                    canal.send({
                                        embeds: [embed]
                                    })
                                    if(interaction.options.get("mtodos").value === "true") {
                                        canal.send(`@everyone`).then(msg => msg.delete())
                                    }
                                    })
                                })
                            })
                        })
                    }

        }
    }
}