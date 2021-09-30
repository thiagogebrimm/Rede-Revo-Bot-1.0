const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'tiktok',
  aliases: [],
  category: 'Utilidades',
  description: 'Requisitos para receber as recompensas TikToker',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`Segue abaixo os requisitos para receber as recompensas TikToker`)
      .setDescription('Decidimos entrar na onda do TikTok e adicionar no servidor a tag **TikToker**.\n\n**O que essa tag me da como vantagem? **\nAlém da tag permanente você ganha 500 de cash e um item especial (O prêmio tem reivindicação única).\n\n**Como posso ter direito as recompensas?**\nFazendo um vídeo no TikTok e em algum momento citar o servidor nele, e para receber as recompensas é preciso atingir um mínimo de 1.000 mil visualizações no seu vídeo.\n\n**Fiz o vídeo e atingiu 1.000 mil visualizações, como faço para revindicar minha recompensa?**\nAbra um ticket em nosso discord, diga que veio para revindicar sua recompensa por ter feito vídeo no TikTok e envie o link de seu vídeo, e logo apos verificarmos o vídeo iremos entregar as recompensas.\n\nTAG:')
      .setImage('https://imgur.com/aWXW2fL.png')
      .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
    interaction.editReply({
      embeds: [embed]
    })
  }
}