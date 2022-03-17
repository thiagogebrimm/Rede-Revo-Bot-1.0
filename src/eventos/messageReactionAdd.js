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
        .setTitle("⭐ Starboard")
        .setDescription(`
Mensagem enviada por: **${reaction.message.author.username}**
[Clique aqui para ser redirecionado a mensagem.](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})
`)
        .setTimestamp(reaction.message.createdAt)
        if(reaction.message.attachments.size > 0){
            embed.setImage(reaction.message.attachments.first().url)
        }
        let starboard = client.channels.cache.find(x => x.id === config.channel)
        if(!starboard) return;
        starboard.send({embeds: [embed]})
        client.stardb.set(reaction.message.id, {
            id: reaction.message.id,
            channel: reaction.message.channel.id,
            guild: reaction.message.guild.id,
            author: reaction.message.author.id
        })
    }
};