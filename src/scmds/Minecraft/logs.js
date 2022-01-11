const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'logs',
  aliases: [],
  category: 'Minecraft',
  description: 'Como pegar logs do minecraft',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#818181`)
      .setTitle(`Como obter os logs do minecraft?`)
      .setDescription(`
No Windows, você pode encontrar os logs do Minecraft seguindo esses passos:

\`1.\` Abra o executar com as teclas **Win + R**;
\`2.\` Digite **%appdata%** e clique em OK;
\`3.\` Abra a pasta **.minecraft**;
\`4.\` Acesse a pasta logs.

O último arquivo, chamado latest.log, tem a sua ultima log ao entrar no minecraft.
      `)
      .setFooter('Equipe Rede Revo', interaction.guild.iconURL({ dynamic: true }));
    interaction.editReply({
      embeds: [embed]
    })
  }
}