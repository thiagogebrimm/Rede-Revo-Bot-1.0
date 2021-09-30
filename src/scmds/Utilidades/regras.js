const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'regras',
    aliases: [''],
    categories : '',
    description: 'Veja nossas regras!',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Leia as regras e evite punições`, 'https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif')
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://rederevo.gitbook.io/wiki/regras-1') 
        .setLabel('Acessar as regras')

        interaction.editReply({
            embeds: [TarefaEmbed],
            components: [new Discord.MessageActionRow()
            .addComponents(button)]
        })
        
      }
    }