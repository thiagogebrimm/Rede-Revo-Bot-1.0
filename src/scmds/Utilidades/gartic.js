const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gartic',
  aliases: [''],
  category: 'Utilidades',
  description: 'Receba o cargo do Gartic',
  usage: '',

  run: async (client, interaction) => {
    if (interaction.member.roles.cache.has("855568510637178880")) {
      let role = interaction.guild.roles.cache.find(r => r.id === "855568510637178880");
      interaction.member.roles.remove(role);
      interaction.editReply({
        embeds: [new MessageEmbed()
          .setColor(`228B22`)
          .setDescription(`Cargo removido!`)
        ]
      })

    }
    else {
      let role = interaction.guild.roles.cache.find(r => r.id === "855568510637178880");
      interaction.member.roles.add(role);

      interaction.editReply({
        embeds: [new MessageEmbed()
          .setColor(`228B22`)
          .setDescription(`Cargo setado!`)
        ]
      })
    }
  }
}