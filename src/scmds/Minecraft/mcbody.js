const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'mcbody',
    aliases: [''],
    categories : '',
    description: 'Comando McBody',
    usage: '',
    options: [
        {
            name: "nick",
            required: true,
            type: 'STRING',
            description: 'Nick do Usuario'
        }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        var player = interaction.options.getString("nick", true)
        var link = `https://minotar.net/armor/body/` + player + `/100.png`;
        let embedSkin = new MessageEmbed()
          .setDescription(`Aqui está o corpo da skin do(a) **${player}**!`)
          .setImage(link)
          .setColor('36393e')
        interaction.editReply({
          embeds: [embedSkin]
        });
      }
    }