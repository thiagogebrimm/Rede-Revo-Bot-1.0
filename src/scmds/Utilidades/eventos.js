const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eventos',
  category: 'Utilidades',
  description: 'Mostra a lista de eventos da semana',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🏆 Agenda de Eventos Rede Revo 🏆`)
      .addFields(
		{ name: 'Evento Arqueiro', value: 'Domingo as 18:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Guerreiro', value: 'Segunda-Feira as 20:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Pré Guerra', value: 'Terça-Feira as 19:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Pré Killer', value: 'Quarta-Feira as 20:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Pré Guerra (mcMMO)', value: 'Quinta-Feira as 19:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Killer', value: 'Sexta-Feira as 20:00 (Horário de Brasília)', inline: true },
		{ name: 'Evento Guerra (mcMMO)', value: 'Sábado as 19:00 (Horário de Brasília)', inline: true },
	)
      .setThumbnail('https://i.imgur.com/dh7eXee.png')
      .setFooter('Eventos Rede Revo', interaction.guild.iconURL({ dynamic: true }));
    interaction.editReply({
      embeds: [embed]
    })
  }
}