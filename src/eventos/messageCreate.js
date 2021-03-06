const DelMessage = require("../../Utils/DelMessage");
const Message = require("../db/Models/Message");

module.exports = async (client, message) => {

    //Responde marcações ao bot
    if (message.content.toLowerCase().includes(`<@!843655813221580800>`)) {
        message.reply(`
Olá, em que podemos ajudar?
Caso tenha dúvidas pode abrir um <#929227946512777216>`);
    };

    //Responde o chat ajuda
    for (let ips of ['o ip'])
        if (message.channel.id === "859610016244170752") {
            if (message.content.toLowerCase().includes(ips))
                message.reply(`jogar.rederevo.com`);
        };

    //Bloqueia o mídias
    for (let imgs of ['.png', '.jpg', '.jpeg', 'prnt.sc'])
        if (message.channel.id === "845501522166153226") {
            if (message.author.bot) return;
            if (message.content.includes(imgs))
                return await message.channel.threads.create({
                    name: `Bate papo sobre a mídia de ${message.member.displayName}`,
                    autoArchiveDuration: 1440,
                    startMessage: message.id
                }),
                    await message.react('<:Upvote_Revo:881685398114426940>'),
                    await message.react('<:Downvote_Revo:881685397976010783>');
            if (message.attachments.size > 0)
                return await message.channel.threads.create({
                    name: `Bate papo sobre a mídia de ${message.member.displayName}`,
                    autoArchiveDuration: 1440,
                    startMessage: message.id
                }),
                    await message.react('<:Upvote_Revo:881685398114426940>'),
                    await message.react('<:Downvote_Revo:881685397976010783>');
            if (message.attachments.size == 0)
                return await message.delete(),
                    await message.author.send(`❌ | Você não pode enviar mensagens de texto no canal de mídias`)
                        .catch(a => {
                            return message.guild.channels.cache.find(x => x.id === '793599388420800543')
                                .send(`Impossivel mandar mensagens na DM do ${message.author} para avisa-lo que não se pode enviar mensagens de texto no canal de mídias!`)
                        })
        };

    //Bloqueia Everyone
    if (message.content.toLowerCase().includes(`@everyone`)) {
        if (message.author.bot) return;
        if (message.member.permissions.has('KICK_MEMBERS')) return false;
        if (message.channel.id === "845501522166153226") return false;
        await message.delete()
            .then(message.channel.send(`**Você não pode marcar everyone em nosso servidor** ${message.author}**.**`))
    };

    //Bloqueia Links
    for (let links of ['discord.gg/', 'discord.com/invite/', 'bit.ly/', 'Discord Nitro for Free', 'nitro for 3 months', 'scord.com', 'https://d'])
        if (message.content.toLowerCase().includes(links)) {
            if (message.author.bot) return;
            if (message.member.permissions.has('KICK_MEMBERS')) return false;
            if (message.content.includes('discord.com/channels')) return false;
            if (message.content.includes('discord.gg/rederevo')) return false;
            if (message.content.includes('discord.com')) return false;
            if (message.content.includes('docs.google')) return false;
            if (message.content.toLowerCase().includes(`@everyone`)) return false;
            if (message.channel.id === "845501522166153226") return false;
            await message.delete()
                .then(message.channel.send(`**Links não são permitidos em nosso discord** ${message.author}**.**`))
        };

    //Reage nos boosters
    if (message.channel.id === "793280024060362752") { //Booster
        await message.react('<a:PurpHeart_Revo:852621966325186562>')
    };

    //Reage nas divulgações
    if (message.channel.id === "795426717132390441") { //Divulgações
        await message.react('👍')
    };

    if (message.channel.id === "953028492155555880") { // 7d System
        await Message.create({
            authorId: message.author.id,
            time: Date.now() + 604800000,
            timeMs: 604800000, // 604800000
            messageId: message.id,
            channelId: message.channel.id,
            deleted: false
        })

        DelMessage(message);
    }
}
