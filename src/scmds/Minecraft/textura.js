const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
  name: 'textura',
  aliases: [''],
  category: 'Minecraft',
  description: 'Baixe a nossa textura oficial!',
  usage: '',

  run: async (client, interaction) => {

    let TarefaEmbed = new MessageEmbed()
      .setAuthor(`Baixe a textura oficial do servidor para ter uma melhor jogabilidade.`, interaction.guild.iconURL({ dynamic: true }))
      .setColor(`#FF0000`);

    let button = new Discord.MessageButton()
      .setStyle('LINK')
      .setURL('https://bit.ly/revotext')
      .setLabel('Baixar a textura');

    interaction.editReply({
      components: [new Discord.MessageActionRow().addComponents(button)],
      embeds: [TarefaEmbed]
    })
  }
}       