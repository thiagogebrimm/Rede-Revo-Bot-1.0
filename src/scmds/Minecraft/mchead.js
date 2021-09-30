const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'mchead',
    aliases: [''],
    categories : '',
    description: 'Comando McHead',
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
        var url = `https://minotar.net/helm/` + player + `/100.png`;
        let embedHead = new MessageEmbed()
          .setDescription(`Aqui está a cabeça da skin do(a) **${player}**!`)
          .setImage(url)
          .setColor(`36393e`)
        interaction.editReply({
          embeds: [embedHead]
        });
      }
    }