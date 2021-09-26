const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    message.delete({ timeout: 5 * 1000 });

    if (!message.member.permissions.has(['MANAGE_MESSAGES'])) return;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
        message.channel.send(new MessageEmbed()
        .setDescription(`Você deve mencionar um membro válido.`)
        .setColor(`RED`)
    )
    } else {
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) return;

        let time = args[1];
        if (!time || isNaN(ms(args[1]))) return message.channel.send(new MessageEmbed()
        .setDescription(`Você deve dizer um tempo válido (s, m, d ou h)`)
        .setColor(`36393e`)
    )

        message.channel.send(new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`${member.user.username.toString()} foi punido!`)
    );

        let reason = args.slice(2).join(' ')
        if (!reason) reason === 'Nenhum motivo aparente.'
        message.guild.channels.cache.find(x => x.id === '849452824970264626').send(new MessageEmbed()
            .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
            .setDescription(`${member.toString()} foi silenciado(a) por ${message.member.toString()}.\nMotivo: \`${reason}\`\nDuração: \`${time}\``)
            .setColor(`RED`)
        );

        member.roles.add('847830245851660290');
            
        member.send(new MessageEmbed()
            .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
            .setDescription(`Você foi silenciado(a) por ${message.member.toString()}.\nMotivo: \`${reason}\`\nDuração: \`${time}\``)
            .setColor(`RED`)).catch(a => {return message.channel.send(`Impossivel mandar mensagens na dm deste usuario!`)});;

        setTimeout(async () => {
            member.roles.remove('847830245851660290');
            }, ms(time));
        } 
    } 
    
module.exports.help = {
    name: 'mute',
    aliases: ['mutar', 'silence', 'silenciar'],
    category: 'Moderation',
    description: 'Comando utilizado para silenciar usuários.'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 3e2
}

module.exports.requirements = {
    ownerOnly: false
}