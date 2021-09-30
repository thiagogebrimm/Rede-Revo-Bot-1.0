const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'sugerir',
    aliases: [''],
    category: 'Utilidades',
    description: 'Comando de sugerir =)',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        var b;
        await interaction.user.createDM();
        interaction.user.send({embeds:[new MessageEmbed()
            .setDescription(`Qual é a sua sugestão?`)
            .setColor(`36393e`)
        ]}).catch(() => { b = false });  
        b = true;
        if (b) {
            interaction.channel.send({embeds:[new MessageEmbed()
                .setDescription(`Instruções enviadas em seu privado.`)
                .setColor(`GREEN`)
            ]}).then(i => i.delete({ timeout: 5 * 1000 }))
            interaction.user.dmChannel.createMessageCollector({ filter: x => x.author.id === interaction.user.id, time: 90000, max: 1 })
            .on('collect', m1 => {
                let r1 = m1.content;
                interaction.user.send({embeds:[new MessageEmbed()
                    .setColor(`36393e`)
                    .setDescription(`Por que sua sugestão deve ser implementada?`)
                ]}).then(async msg => {
                    msg.channel.createMessageCollector(x => x.author.id === interaction.user.id, { time: 90000, max: 1 })
                    .on('collect', m2 => {
                        let r2 = m2.content;
                        interaction.guild.channels.cache.find(x => x.id === '793284851889209355').send({embeds:[new MessageEmbed()
                            .setAuthor(`Sugestão enviada por ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                            .setColor(`FFD700`)
                            .setDescription(`<a:Sino_Revo:849415817502523412> ▫️ Sugestão:\n\n\`\`\`${r1}\`\`\`\n\n💭 Motivo para ser implementada: **${r2}**`)
                            .setFooter(`ID: ${interaction.user.id} `)
                        ]}).then(async msg => {
                            await msg.react('<:Minecraftaccept_Revo:845887665617633290>') && await msg.react('<:MinecraftDeny_Revo:845887665445797938>')
                            interaction.user.send({embeds:[new MessageEmbed()
                                .setColor(`36393e`)
                                .setDescription(`Sugestão enviada com êxito.`)]}
                            )
                        })
                    })
                })
            })
        }
      }
    }