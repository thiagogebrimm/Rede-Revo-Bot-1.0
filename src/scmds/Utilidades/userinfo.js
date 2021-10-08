const moment = require('moment')
moment.locale('pt-br');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo',
  aliases: [''],
  category: 'Utilidades',
  description: 'Veja informações de um membro',
  usage: '',
  options: [
    {
      name: 'membro',
      type: 'USER',
      required: false,
      description: "Escollha um membro"
    }
  ],
  run: async (bot, interaction) => {
    const member = interaction.options.getMember("membro") || interaction.member

    let obj = { false: 'Não', true: 'Sim' }

    const infoEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .addField(`${member.user.tag}`, `${member.user}`, true)
      .addField("ID do Discord:", `${member.user.id}`, true)
      .addField("Nick:", `${member.user.username}`, true)
      .addField("É Bot:", `${obj[member.user.bot]}`, true)
      .addField("Entrou no servidor:", `${moment(member.joinedTimestamp).utc(-3).format("DD [de] MMMM[,] YYYY [ás] HH:mm")} (${moment(member.joinedTimestamp).utc(-3).fromNow()})`, true)
      .addField("Conta criada:", `${moment(member.user.createdAt).utc(-3).format("DD [de] MMMM[,] YYYY [ás] HH:mm")} (${moment(member.user.createdAt).utc(-3).fromNow()})`, true)
      .setFooter(`Respondendo para: ${interaction.user.username}#${interaction.user.discriminator}`)

    interaction.editReply({
      embeds: [infoEmbed]
    })
  }
}