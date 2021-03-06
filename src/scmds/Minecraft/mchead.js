const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mchead',
  aliases: [''],
  category : 'Minecraft',
  description: 'Comando para ver a cabeça de um jogador',
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
    var url = `https://minotar.net/helm/` + player + `/100.png`;
    let embedHead = new MessageEmbed()
      .setDescription(`Aqui está a cabeça da skin do(a) **${player}**!`)
      .setImage(url)
      .setColor(`36393e`)
    interaction.editReply({
      embeds: [embedHead]
    });
  }
}