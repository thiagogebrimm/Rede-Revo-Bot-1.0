const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'enquete',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de enquetes.',
    usage: '',
    options: [
        {
            name: "canal",
            type: "CHANNEL",
            description: "Selecione o canal da enquete!",
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
     
                if(!canal){
                    interaction.channel.send('<:aviso:854929386394615848> Esse canal não existe.')
                } else {
     
                    interaction.editReply('<:alerta_h:854929287525957642> Qual o título do Enquete?').then(msg2 => {
                        const filter = x => x.author.id == interaction.user.id
                        let c2 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
                        .on('collect', c => {
                            const titulo = c.content
     
                            interaction.channel.send({
                                content: '<:alerta_h:854929287525957642 Qual o Enquete?',
                                reply: {
                                    messageReference: c.id
                                }
                            }).then(msg3 => {
                                let c3 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
                                .on('collect', c => {
                                    const anuncio = c.content
                                    interaction.channel.send({
                                        content: '<:aviso:854929386394615848> Enquete enviado com sucesso!',
                                        reply: {
                                            messageReference: c.id
                                        }
                                    })
     
                                    let embed = new Discord.MessageEmbed()
                                    .setTimestamp()
                                    .setThumbnail(client.user.displayAvatarURL())
                                    .setTitle(titulo)
                                    .setColor('ORANGE')
                                    .setDescription(anuncio)
     
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