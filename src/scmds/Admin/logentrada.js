const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'logentrada',
    aliases: [''],
    categories : '',
    description: 'log de entrada',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        const cchu = new MessageEmbed()
        .setDescription(`Você deve mencionar o usuário e o cargo. Ex: /logentrada @usuário @cargo`)
        .setColor(`RED`)
            if (!interaction.member.hasPermission('ADMINISTRATOR')) return;
            let testedUser = interaction.mentions.members.first()
      if (!testedUser) {
        return interaction.channel.send(cchu).then(msg => {
          msg.delete({ timeout: 5000 })
        })
      }
      
      
      let role = interaction.mentions.roles.first()
      testedUser.roles.add(role.id)
      let staff = interaction.guild.roles.cache.find(r => r.id === "852039893207351328")
      testedUser.roles.add(staff)
      let hora = moment().format("D [de] MMM [de] YYYY, [às] hh:mm");
      const cu = new MessageEmbed()
                  .setTitle(`**Novo integrante na equipe**`)
                  .setColor("GREEN")
                  .setDescription(`O jogador **<@${testedUser.id}>** agora integra na equipe como **${role}**
      
                  \`${hora}\``)  
                  .setThumbnail(interaction.guild.iconURL)
                  .setFooter(`Atenciosamente Rede Revo`, interaction.guild.iconURL({ dynamic: true }))
      interaction.guild.channels.cache.find(x => x.id === '845531157990866974').send({ content: `<@&795509113307004938>`, 
        embeds: [cu]
      })
      }
    }