const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    message.delete({ timeout: 5 * 1000 });

    if (!message.member.permissions.has(['KICK_MEMBERS'])) return;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
        message.channel.send(new MessageEmbed()
        .setDescription(`Você deve mencionar um membro válido.`)
        .setColor(`RED`)
    )

    } else {
        let reason;
        if (!args[1]) reason = 'Nenhum motivo especificado.'
        else {
            reason = args.slice(1).join(' ');
        }
        console.log(reason)

        message.channel.send(new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`${member.user.username.toString()} foi punido!`)
    )
    
        try {
            if (member && member.user != message.author) {
                if (member.kickable) {
                    await member.send(new MessageEmbed()
                    .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                    .setDescription(`Você foi expulso(a) por ${message.member.toString()}.\nMotivo: \`${reason}\``)
                    .setColor(`RED`));
                    await member.kick();
                    await message.guild.channels.cache.find(x => x.id === '849452824970264626').send(new MessageEmbed()
                        .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                        .setDescription(`${member.user.username.toString()} foi expulso(a) por ${message.member.toString()}.\nMotivo: \`${reason}\``)
                        .setColor(`RED`));
                }
            }
        } catch (e) {
            return;
        }
    }
}

module.exports.help = {
    name: 'kick',
    aliases: ['kickar', 'expulsar'],
    category: 'Moderation',
    description: 'Comando utilizado para expulsar usuários.'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 3e2
}

module.exports.requirements = {
    ownerOnly: false
}