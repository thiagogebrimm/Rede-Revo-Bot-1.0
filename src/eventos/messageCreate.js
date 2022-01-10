const config = require('../../config')

module.exports = async (client, message) => {

    //Responde o chat ajuda
    for (let ips of ['o ip', 'O ip', 'O IP', 'o IP'])
        if (message.channel.id === "859610016244170752") {
            if (message.content.includes(ips))
                message.reply(`rederevo.com`);
        };

    //Bloqueia o mídias
    if (message.channel.id === "845501522166153226") {
        if (message.author.bot) return;
        if (message.content.includes('.png')) return false;
        if (message.content.includes('.jpg')) return false;
        if (message.content.includes('.jpeg')) return false;
        if (message.content.includes('prnt.sc')) return false;
        await message.react('<:Upvote_Revo:881685398114426940>')
        await message.react('<:Downvote_Revo:881685397976010783>')
        if (message.attachments.size == 0) message.delete({ timeout: 5 * 100 }, message.author.send(`❌ | Você não pode enviar mensagens de texto no canal de mídias`)
            .catch(a => {
                return message.guild.channels.cache.find(x => x.id === '793599388420800543')
                    .send(`Impossivel mandar mensagens na DM do ${message.author} para avisa-lo que não se pode enviar mensagens de texto no canal de mídias!`)
            }))
    };

    //Criar conversa respondendo a midia
    if (message.channel.id === "845501522166153226") {
        if (message.content.includes('.png'))
        return client.channels.cache.get(config.channels.midias).threads.create({
            name: 'teste',
            autoArchiveDuration: 1440,
            reason: 'Teste',
        });
    };

    //Bloqueia Links
    for (let links of ['discord.gg/', 'discord.com/invite/', 'bit.ly/', 'Discord Nitro for Free', 'nitro for 3 months', 'scord.com', 'https://discord'])
        if (message.content.includes(links)) {
            if (message.author.bot) return;
            if (message.member.permissions.has('KICK_MEMBERS')) return false;
            if (message.content.includes('discord.com/channels')) return false;
            if (message.content.includes('discord.gg/rederevo')) return false;
            if (message.content.includes('discord.com')) return false;
            if (message.channel.id === "845501522166153226") return false;
            message.delete()
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
}
