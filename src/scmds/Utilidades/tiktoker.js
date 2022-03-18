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
      .setDescription(`Decidimos entrar na onda do TikTok e adicionar no servidor a tag **TikToker**.
      
      **O que essa tag me da como vantagem? **
      Além da tag permanente você ganha 500 de cash e um item especial (O prêmio tem reivindicação única).
      
      **Como posso ter direito as recompensas?**
      Fazendo um vídeo no TikTok e em algum momento citar o servidor nele, e para receber as recompensas é preciso atingir um mínimo de 1.000 mil visualizações no seu vídeo.
      
      **Fiz o vídeo e atingiu 1.000 mil visualizações, como faço para revindicar minha recompensa?**
      Abra um ticket em nosso discord, diga que veio para revindicar sua recompensa por ter feito vídeo no TikTok e envie o link de seu vídeo, e logo apos verificarmos o vídeo iremos entregar as recompensas.
      
      TAG:`)
      .setImage('https://i.imgur.com/1iwpeXe.png')
      .setFooter({ text: 'Rede Revo', string: interaction.guild.iconURL({ dynamic: true }) });
    interaction.editReply({
      embeds: [embed]
    })
  }
}