const { MessageEmbed } = require("discord.js")

module.exports = async (bot, oldMessage, newMessage) => {

    try {
        let canal = oldMessage.guild.channels.cache.find(x => x.id === '793599388420800543')
        if (newMessage.content != oldMessage.content) {
            if (!canal) return;
            canal.send({
                embeds: [new MessageEmbed()
                    .setTitle(`MENSAGEM EDITADA <:Alerta_Revo:870516091330388058>`)
                    .setColor(`4682B4`)
                    .setDescription(`
[Clique aqui para ser redirecionado a mensagem.](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})
                
📝 **Mensagem antiga:** ${oldMessage.content}

✏️ **Nova mensagem:**  ${newMessage.content}
                `)
                    .addField("Autor:", `${oldMessage.author.tag}`, true)
                    .addField("Canal:", `${oldMessage.channel}`, true)
                    .setTimestamp(newMessage.createdAt)
                    .setFooter(`ID do autor: ${oldMessage.author.id}`, oldMessage.author.avatarURL({ dynamic: true }))
                ]
            })
        }
    } catch (e) {
        return console.log(e);
    }

    //Bloqueia Links em atualizações de mensagens
    for (let links of ['discord.gg/', 'discord.com/invite/', 'bit.ly/', 'Discord Nitro for Free', 'nitro for 3 months', 'scord.com', 'https://d'])
        if (newMessage.content.toLowerCase().includes(links)) {
            if (newMessage.author.bot) return;
            if (newMessage.member.permissions.has('KICK_MEMBERS')) return false;
            if (newMessage.content.includes('discord.com/channels')) return false;
            if (newMessage.content.includes('discord.gg/rederevo')) return false;
            if (newMessage.content.includes('discord.com')) return false;
            if (newMessage.content.includes('docs.google')) return false;
            if (newMessage.content.toLowerCase().includes(`@everyone`)) return false;
            if (newMessage.channel.id === "845501522166153226") return false;
            await newMessage.delete()
                .then(newMessage.channel.send(`**Links não são permitidos em nosso discord** ${newMessage.author}**.**`))
        }  

}
