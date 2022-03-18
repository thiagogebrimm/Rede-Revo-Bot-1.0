const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ip',
  aliases: [''],
  category: 'Minecraft',
  description: 'Veja o nosso IP!',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`Atualmente nosso ip é`)
      .setDescription(`
<a:DirtyPulando_Revo:852710345012543490> **Java:** jogar.rederevo.com
      
**<a:DirtyPulando_Revo:852710345012543490> Bedrock:** jogar.rederevo.com:19132`)
      .setFooter({ text: 'Equipe Rede Revo', string: interaction.guild.iconURL({ dynamic: true }) });
    await interaction.editReply({
      embeds: [embed]
    });
  }
}