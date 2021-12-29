const { MessageEmbed } = require('discord.js');
const { owners, prefix, prefix2 } = require('../../config');

module.exports = async (bot, message) => {

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

    //Bloqueia Links
    for (let links of ['discord.gg/', 'discord.com/invite/', 'bit.ly/', 'Discord Nitro for Free', 'nitro for 3 months', 'scord.com'])
        if (message.content.includes(links)) {
            if (message.author.bot) return;
            if (message.member.permissions.has('KICK_MEMBERS')) return false;
            if (message.content.includes('discord.com/channels')) return false;
            if (message.content.includes('discord.gg/rederevo')) return false;
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


    //Controlador 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix) || !message.content.startsWith(prefix2)) return;
    const args = message.content.split(/ +/g);
    const command = args.shift().slice((prefix || prefix2).length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
    let cdu = regx.test(message.content.toLowerCase().replace(/\s+/g, ''))
    if (cdu && !message.member.permissions.has(['ADMINISTRATOR'])) message.delete();

    if (!(message.content.toLowerCase().startsWith(prefix) || message.content.toLowerCase().startsWith(prefix2))) return;

    if (!cmd) return;
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.channel.send(`<@${message.member.id}>`, new MessageEmbed()
            .setColor(`36393e`)
            .setDescription(`Este comando está reservado para autoridades do bot.`)
        );

    if (cmd.limits) {
        const current = bot.limits.get(`${command}-${message.author.id}`);

        if (!current) bot.limits.set(`${command}-${message.author.id}`, 1);
        else {
            if (current >= cmd.limits.rateLimit) return;
            bot.limits.get(`${command}-${message.author.id}`, current + 1);
        }

        setTimeout(() => {
            bot.limits.delete(`${command}-${message.author.id}`);
        }, cmd.limits.cooldown);
    }

    if (message.guild == null) return;

    if (cmd && ['846189183550881792'].includes(message.channel.id) || message.member.permissions.has('MANAGE_MESSAGES')) {
        cmd.run(bot, message, args)
    }
}