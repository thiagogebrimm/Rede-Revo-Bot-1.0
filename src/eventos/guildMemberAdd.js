const { MessageEmbed } = require('discord.js');
const config = require('../../config');
const moment = require('moment');
moment.locale('pt-br');

module.exports = (client, member) => {

    client.channels.cache.get(config.channels.logs)?.send({
        embeds: [new MessageEmbed()
            .setAuthor({ name: `Nova entrada no Discord`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
**${member.user.tag}** entrou no servidor
Conta criada em: **${moment(member.user.createdTimestamp).utc(-3).format('DD[/]MM[/]YYYY [ás] HH:mm')} (${moment(member.user.createdTimestamp).utc(-3).fromNow()})**
Menção: ${member.user}
`)
            .setTimestamp(member.joinedTimestamp)
            .setFooter({ text: `ID: ${member.user.id}` })
            .setColor(`GREEN`)]
    });
}