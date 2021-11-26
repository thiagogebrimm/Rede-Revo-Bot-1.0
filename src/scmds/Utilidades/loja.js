const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'loja',
    aliases: [''],
    category : 'Utilidades',
    description: 'Acesse nossa loja.',
    usage: '',

      run: async(client, interaction, args) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Acesse nossa loja.`, interaction.guild.iconURL({ dynamic: true }))
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://rederevo.com/itens') 
        .setLabel('Acessar a loja');
        
        interaction.editReply({
            components: [new Discord.MessageActionRow().addComponents(button)],
            embeds: [TarefaEmbed]
            })
      }
    }       