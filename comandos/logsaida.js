const { MessageEmbed } = require('discord.js');
const moment = require("moment")
moment.locale("pt-BR")



module.exports.run = async (bot, message, args) => {

  const cchu = new MessageEmbed()
  .setDescription(`Você deve mencionar o usuário e o cargo. Ex: /logentrada @usuário @cargo`)
  .setColor(`RED`)
      if (!message.member.hasPermission('ADMINISTRATOR')) return;
      let testedUser = message.mentions.members.first()
if (!testedUser) {
  return message.channel.send(cchu).then(msg => {
    msg.delete({ timeout: 5000 })
  })
}

let role = message.mentions.roles.first()
testedUser.roles.remove(role.id)
let staff = message.guild.roles.cache.find(r => r.id === "852039893207351328")
testedUser.roles.remove(staff)
let hora = moment().format("D [de] MMM [de] YYYY, [às] hh:mm");
const cu = new MessageEmbed()
.setTitle(`**Alteração na equipe**`)
.setColor("#ff0000")
.setDescription(`O jogador **<@${testedUser.id}>** não integra mais na equipe como **${role}**

\`${hora}\``)  
.setThumbnail(message.guild.iconURL)
.setFooter(`Atenciosamente Rede Revo`, message.guild.iconURL({ dynamic: true }))
message.guild.channels.cache.find(x => x.id === '845531157990866974').send(`<@&795509113307004938>`,cu)

  }


module.exports.help = {
    name: 'logsaida',
    description: 'Faça a log de saida na equipe.',
    category: 'Moderation'
}

module.exports.limits = {
    cooldown: 1e2,
    ratelimit: 3
}

module.exports.requirements = {
    ownerOnly: false
}