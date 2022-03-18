const util = require('minecraft-server-util');

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'online',
  aliases: [''],
  category: 'Minecraft',
  description: 'Veja o status do servidor',
  usage: '',

  run: async (client, interaction) => {
    const bed = await util.statusBedrock('jogar.rederevo.com')

    util.status('jogar.rederevo.com')
      .then((response) => {
        let embed = new MessageEmbed()
          .setColor(`#FF0000`)
          .setTitle(`rederevo.com`)
          .setDescription(`
Total de jogadores:  \`${response.players.online}/${response.players.max}\`\n
Versões JAVA: \`${response.version.name.replace('Velocity ', '')}\`
Versões BEDROCK: \`da ${bed.version.name} até a mais recente\``)
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setTimestamp(interaction.createdAt)
          .setFooter({ text: `${interaction.user.tag}`, string: interaction.user.avatarURL({ dynamic: true }) })
        interaction.editReply({
          embeds: [embed]
        })

      })
  }
}