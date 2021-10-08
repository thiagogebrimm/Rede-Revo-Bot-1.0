const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = (bot, member) => {
    let canalentrada = member.guild.channels.cache.find(x => x.id === '793278937232965632')
    let canallog = member.guild.channels.cache.find(x => x.id === '793599388420800543')

    canalentrada.send({
        embeds: [new MessageEmbed()
            .setAuthor(`Boas-vindas, ${member.user.username}.`, `https://cdn.discordapp.com/emojis/746791200866041886.png?v=1`)
            .setDescription(`Olá, você acaba de participar do Discord da **Rede Revo**.`)
            .addField(`<:Esmeralda_Revo:847520945912414258> Server IP: `, `rederevo.com`, true)
            .addField(`📖 Regras: `, `[Clique aqui](https://rederevo.gitbook.io/wiki/regras-1)`, true)
            .addField(`🌐 Site: `, `[Clique aqui](https://rederevo.com)`, true)
            .addField(`<:Instagram_Revo:854866638524252200> Instagram: `, `[Clique aqui](https://www.instagram.com/rede.revo/)`, true)
            .setFooter(`Agradecemos a participação, caso tenha qualquer dúvida abra um ticket!`, `https://i.imgur.com/dMswI7f.png`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor(`#1E90FF`)]
    });

    canallog.send({
        embeds: [new MessageEmbed()
            .setAuthor(`Nova entrada no Discord`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user} **entrou em nosso discord, sua conta foi criada em:** ${moment(member.user.createdTimestamp).utc(-3).format('DD[/]MM[/]YYYY [ás] HH:mm')} (${moment(member.user.createdTimestamp).utc(-3).fromNow()})`)
            .setTimestamp(member.joinedTimestamp)
            .setFooter(`${member.user.tag}`)
            .setColor(`GREEN`)]
    });
}