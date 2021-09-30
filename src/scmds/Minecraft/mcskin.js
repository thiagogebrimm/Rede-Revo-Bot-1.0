const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mcskin',
  aliases: [''],
  categories: '',
  description: 'Comando para ver a skin de um jogador',
  usage: '',
  options: [
    {
      name: "nick",
      required: true,
      type: 'STRING',
      description: 'Nick do Usuario'
    }
  ],

  run: async (client, interaction) => {
    var player = interaction.options.getString("nick", true)
    var link = `https://minotar.net/skin/` + player;

    let embedSkin = new MessageEmbed()
      .setDescription(`Aqui está a skin do(a) **${player}**!`)
      .setImage(link)
      .setColor('36393e')
    interaction.editReply({
      embeds: [embedSkin]
    });
  }
}