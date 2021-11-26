const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'textura',
    aliases: [''],
    category : 'Minecraft',
    description: 'Baixe a textura oficial!',
    usage: '',

      run: async(client, interaction, args) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Baixe a textura oficial do servidor para ter uma melhor jogabilidade.`, interaction.guild.iconURL({ dynamic: true }))
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://www.planetminecraft.com/texture-pack/revo-pack-beta-1-0/') 
        .setLabel('Baixar a textura');
        
        interaction.editReply({
            components: [new Discord.MessageActionRow().addComponents(button)],
            embeds: [TarefaEmbed]
            })
      }
    }       