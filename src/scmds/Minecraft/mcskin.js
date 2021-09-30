const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'mcskin',
    aliases: [''],
    categories : '',
    description: 'Comando McSkin',
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
        var link = `https://minotar.net/skin/` + player;
        
        let embedSkin = new MessageEmbed()
          .setDescription(`Aqui está a skin do(a) **${player}**!`)
          .setImage(link)
          .setColor('36393e')
        interaction.editReply({
          embeds: [embedSkin]
        });
      }
    }