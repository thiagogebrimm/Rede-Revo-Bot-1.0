const util = require('minecraft-server-util');

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'online',
  aliases: [''],
  categories: '',
  description: 'Veja o status do servidor',
  usage: '',

  run: async (client, interaction) => {
    const bed = await util.statusBedrock('jogar.rederevo.com')

    util.status('rederevo.com', { port: 25565 })
      .then((response) => {
        let embed = new MessageEmbed()
          .setColor(`#FF0000`)
          .setTitle(`rederevo.com`)
          .setDescription(`
                         Total de jogadores:  \`${response.onlinePlayers}/${response.maxPlayers}\`\n
                         Versões JAR: \`${response.version.replace('Waterfall ', '')}\`
                         Versões BEDROCK: \`${bed.version}\``)
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setTimestamp(interaction.createdAt)
          .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }))
        interaction.editReply({
          embeds: [embed]
        })

      })
  }
}