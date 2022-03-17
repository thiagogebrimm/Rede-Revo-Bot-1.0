const { Client, User, MessageReaction, MessageEmbed } = require("discord.js");
const config = require("../../starboard")
/**
 *
 * @param {Client} client
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = async (client, reaction, user) => {
    if(reaction.emoji.name !== config.emoji) return;
    if(reaction.users.cache.filter((f) => !f.bot).size >= config.startcount){
        if(client.stardb.get(reaction.message.id)) return;
        let embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`⭐ ${reaction.message.author.username}`)
        .addField("Ir para mensagem", `**[Clique aqui](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})**`)
        .setTimestamp(reaction.message.createdAt)
        if(reaction.message.content.length >= 1) embed.setDescription(`${reaction.message.content}`)
        if(reaction.message.attachments.size > 0){
            let attachments = reaction.message.attachments.map((a) => `🖇️ | [${a.name}](${a.url})`).join("\n")
            embed.addField("Arquivos", attachments)
            embed.setImage(reaction.message.attachments.first().url)
        }
        let starboard = client.channels.cache.find(x => x.id === config.channel)
        if(!starboard) return;
        starboard.send({content: `**${reaction.users.cache.filter((f) => !f.bot).size} -** <#${reaction.message.channel.id}>`, embeds: [embed]})
        client.stardb.set(reaction.message.id, {
            id: reaction.message.id,
            channel: reaction.message.channel.id,
            guild: reaction.message.guild.id,
            author: reaction.message.author.id
        })
    }
};
