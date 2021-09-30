const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'negar',
    aliases: [''],
    categories : '',
    description: 'Negar uma sugestão',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        var b;
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return;
        await interaction.user.createDM();
        interaction.user.send({ embeds: [new MessageEmbed()
            .setDescription(`Qual sugestão será negada?`)
            .setColor(`36393e`)
        ]}).catch(() => { b = false });  
        b = true;
        if (b) {
            interaction.channel.send({ embeds: [new MessageEmbed()
                .setDescription(`Instruções enviadas em seu privado.`)
                .setColor(`GREEN`)
            ]}).then(i => i.delete({ timeout: 5 * 1000 }))
            interaction.user.dmChannel.createMessageCollector({ filter: x => x.author.id === interaction.user.id, time: 300000, max: 1 })
            .on('collect', m1 => {
                let r1 = m1.content;
                        interaction.user.send({ embeds: [new MessageEmbed()
                        .setColor(`36393e`)
                        .setTitle(`Autor da sugestão?`)
                        .setDescription(`Mande o ID de quem fez a sugestão`)
                    ]}).then(async msg => {
                        msg.channel.createMessageCollector({ filter: x => x.author.id === interaction.user.id, time: 300000, max: 1 })
                        .on('collect', m2 => {
                            let r2 = m2.content;
                        interaction.guild.channels.cache.find(x => x.id === '849420024829050910').send({ content: `<@${r2}>`, embeds: [new MessageEmbed()
                            .setAuthor(`Sugestão negada por ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                            .setTitle('<:MinecraftDeny_Revo:845887665445797938> SUA SUGESTÃO FOI NEGADA <:MinecraftDeny_Revo:845887665445797938>')
                            .setColor(`B22222`)
                            .setDescription(`<a:Sino_Revo:849415817502523412> ▫️ Sugestão:\n\`\`\`${r1}\`\`\`\n\n💭 **Agradecemos sua sugestão, porém após cuidadosa análise por parte da nossa equipe, ela foi negada.**`)
                        ]}).then(async () => {
                            interaction.user.send(new MessageEmbed()
                                .setColor(`36393e`)
                                .setDescription(`Resultado enviado com êxito.`)
                                )
                            })
                        })
                    })
                })
            }
      }
    }