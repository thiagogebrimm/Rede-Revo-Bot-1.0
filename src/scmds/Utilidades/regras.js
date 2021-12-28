const { MessageEmbed, MessageButton } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
  name: 'regras',
  aliases: [''],
  category: 'Utilidades',
  description: 'Veja nossas regras!',
  usage: '',

  run: async (client, interaction) => {

    let TarefaEmbed = new MessageEmbed()
      .setAuthor(`Leia as regras e evite punições`, 'https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif')
      .setColor(`#FF0000`);

    let button = new MessageButton()
      .setStyle('LINK')
      .setURL('https://wiki.rederevo.com/regras')
      .setLabel('Acessar as regras')

    interaction.editReply({
      embeds: [TarefaEmbed],
      components: [new Discord.MessageActionRow()
        .addComponents(button)]
    })

  }
}