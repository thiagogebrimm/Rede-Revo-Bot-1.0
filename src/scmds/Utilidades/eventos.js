const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eventos',
  category: 'Utilidades',
  description: 'Mostra a lista de eventos da semana',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🏆 Agenda de Eventos Rede Revo Survival 🏆`)
      .addFields(
        { name: 'Evento Guerra (mcMMO)', value: 'Domingo as 18:00 (Horário de Brasília)', inline: true },
        { name: 'Evento Guerreiro', value: 'Segunda-Feira as 19:30 (Horário de Brasília)', inline: true },
        { name: 'Evento Pré Guerra', value: 'Terça-Feira as 19:30 (Horário de Brasília)', inline: true },
        { name: 'Evento Arqueiro', value: 'Quarta-Feira as 19:30 (Horário de Brasília)', inline: true },
        { name: 'Evento Pré Guerra (mcMMO)', value: 'Quinta-Feira as 19:30 (Horário de Brasília)', inline: true },
        { name: 'Evento Killer', value: 'Sexta-Feira as 19:30 (Horário de Brasília)', inline: true },
        { name: 'Evento MobArena', value: 'Sábado as 18:00 (Horário de Brasília)', inline: true },
      )
      .setThumbnail('https://i.imgur.com/dh7eXee.png')
      .setFooter({ text: 'Lista de Eventos Rede Revo', string: interaction.guild.iconURL({ dynamic: true }) });
    interaction.editReply({
      embeds: [embed]
    })
  }
}