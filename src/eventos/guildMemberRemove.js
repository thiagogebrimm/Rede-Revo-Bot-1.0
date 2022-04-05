const { MessageEmbed } = require('discord.js');
const config = require('../../config');
const moment = require('moment');
moment.locale('pt-br');

module.exports = (client, member) => {

    client.channels.cache.get(config.channels.logs).send({
        embeds: [new MessageEmbed()
            .setAuthor({ name: `Nova saída no Discord`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
**${member.user.tag}** saiu do servidor
Entrou em: **${moment(member.joinedTimestamp).utc(-3).format('DD[/]MM[/]YYYY [ás] HH:mm')} (${moment(member.joinedTimestampt).utc(-3).fromNow()})**
Menção: ${member.user}
`)
            .setTimestamp(member.removedTimestamp)
            .setFooter({ text: `${member.user.id}` })
            .setColor(`RED`)]
    });
}