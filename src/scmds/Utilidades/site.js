const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'site',
    aliases: [''],
    category : 'Utilidades',
    description: 'Acesse nosso site.',
    usage: '',

      run: async(client, interaction, args) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Acesse nosso site.`, 'https://i.imgur.com/dMswI7f.png')
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://rederevo.com/') 
        .setLabel('Acessar o site');
        
        interaction.editReply({
            components: [new Discord.MessageActionRow().addComponents(button)],
            embeds: [TarefaEmbed]
            })
      }
    }       