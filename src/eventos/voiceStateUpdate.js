const { MessageEmbed } = require("discord.js")

module.exports = async (bot, oldUser, newUser) => {

  let newUserChannel = newUser.channel
  let oldUserChannel = oldUser.channel
  let canallog = oldUser.guild.channels.cache.find(x => x.id === '793599388420800543')

  canallog.send({
    embeds: [new MessageEmbed()
      .setTitle(`MUDANÇA DE CANAL DE VOZ <:Alerta_Revo:870516091330388058>`)
      .setColor(`4682B4`)
      .setDescription(`
      
**Canal antigo:** ${oldUserChannel}

**Canal novo:**  ${newUserChannel}
      `)
      .addField("Quem trocou de canal:", `${newUser.tag}`, true)
      .setFooter({ text: `ID do autor: ${oldUser.tag}` })
    ]
  })

};