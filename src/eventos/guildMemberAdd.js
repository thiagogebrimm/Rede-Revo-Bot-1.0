const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = (bot, member) => {
    let canallog = member.guild.channels.cache.find(x => x.id === '793599388420800543')

    canallog.send({
        embeds: [new MessageEmbed()
            .setAuthor({ text: `Nova entrada no Discord`, string: member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${member.user} **entrou em nosso discord, sua conta foi criada em:** ${moment(member.user.createdTimestamp).utc(-3).format('DD[/]MM[/]YYYY [ás] HH:mm')} (${moment(member.user.createdTimestamp).utc(-3).fromNow()})`)
            .setTimestamp(member.joinedTimestamp)
            .setFooter({ text: `${member.user.tag}` })
            .setColor(`GREEN`)]
    });
}