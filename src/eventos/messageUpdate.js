const { MessageEmbed } = require("discord.js")

module.exports = (bot, oldMessage, newMessage) => {

    let canal = oldMessage.guild.channels.cache.find(x => x.id === '793599388420800543')
        if(newMessage.content != oldMessage.content){
            if(!canal) return;
            canal.send({embeds: [new MessageEmbed()
                .setTitle(`MENSAGEM EDITADA EM #${newMessage.channel.name}`)
                .setColor(`4682B4`) 
                .setDescription(`[Clique aqui para ser redirecionado a mensagem.](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})
                
                📝 **Mensagem antiga:** ${oldMessage.content}

                ✏️ **Nova mensagem:**  ${newMessage.content}
                `)
                .setTimestamp(newMessage.createdAt)
                .setFooter(`Autor da mensagem: ${oldMessage.author.tag}`, oldMessage.author.avatarURL({ dynamic: true }))
            ]})
        }
        return;
    }
