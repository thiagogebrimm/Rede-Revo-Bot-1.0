const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'form',
  aliases: ['formulario'],
  category: 'Utilidades',
  description: 'Retorna o link do formulário por meio de um texto clicável',
  usage: '',
  run: async (bot, interaction) => {
    let link = 'https://rederevo.com';

    interaction.editReply({
      embeds:
        [new MessageEmbed()
          .setAuthor(`FORMULARIO EXCLUSIVO`, `https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif`)
          .setDescription(`Clique [aqui](${link}) para ser redirecionado ao formulário participativo da equipe.`)
          .setColor(`YELLOW`)
          .setFooter(`Solicitado por ${interaction.member.user.username}`, interaction.user.avatarURL({ dynamic: true }))
          .setTimestamp(Date.now())
        ]
    })
  }
}