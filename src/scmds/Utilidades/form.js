const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'form',
  aliases: ['formulario'],
  category: 'Utilidades',
  description: 'Retorna o link do formulário por meio de um texto clicável',
  usage: '',
  run: async (bot, interaction) => {

    interaction.editReply({
      embeds:
        [new MessageEmbed()
          .setAuthor(`APLICAÇÃO PARA STAFF`, `https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif`)
          .setDescription(`Sua aplicação é importante e única, não faça correndo ou de qualquer forma. Nós olhamos sua atividade em jogo, suas denuncias e entre outros comportamentos.
          
          📌 Caso você seja aprovado, entraremos em contato para uma entrevista completa via Discord.
          `)
          .addField(`🧢 Ajudante: `, `[Clique aqui](https://forms.gle/aG1VdsBPUxs8RWQ87)`, true)
          .addField(`🦺 Construtor: `, `[Clique aqui](https://forms.gle/SS7Gxhg93WBN35iDA)`, true)
          .setColor(`YELLOW`)
          .setFooter(`Solicitado por ${interaction.member.user.username}`, interaction.user.avatarURL({ dynamic: true }))
          .setTimestamp(Date.now())
        ]
    })
  }
}