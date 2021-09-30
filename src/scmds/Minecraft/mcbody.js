const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mcbody',
  aliases: [''],
  category : 'Minecraft',
  description: 'Comando para ver o corpo da skin de um jogador',
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
    var link = `https://minotar.net/armor/body/` + player + `/100.png`;
    let embedSkin = new MessageEmbed()
      .setDescription(`Aqui está o corpo da skin do(a) **${player}**!`)
      .setImage(link)
      .setColor('36393e')
    interaction.editReply({
      embeds: [embedSkin]
    });
  }
}