const { MessageEmbed } = require('discord.js');

module.exports = (bot, member) => {
    let canal = member.guild.channels.cache.find(x => x.id === '793278937232965632')
    canal.send({embeds: [new MessageEmbed()
        .setAuthor(`Boas-vindas, ${member.user.username}.`, `https://cdn.discordapp.com/emojis/746791200866041886.png?v=1`)
        .setDescription(`Olá, você acaba de participar do Discord da **Rede Revo**.`)
        .addField(`<:Esmeralda_Revo:847520945912414258> Server IP: `, `rederevo.com`, true)
        .addField(`📖 Regras: `, `[Clique aqui](https://rederevo.gitbook.io/wiki/regras-1)`, true)
        .addField(`🌐 Site: `, `[Clique aqui](https://rederevo.com)`, true)
        .addField(`<:Instagram_Revo:854866638524252200> Instagram: `, `[Clique aqui](https://www.instagram.com/rede.revo/)`, true)
        .setFooter(`Agradecemos a participação, caso tenha qualquer dúvida abra um ticket!`, `https://i.imgur.com/dMswI7f.png`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor(`#1E90FF`)]}
    )
}