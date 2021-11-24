const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'vencedores',
    aliases: [''],
    category : 'Minecraft',
    description: 'Acesse a lista de vencedores das Guerras de Clans e eventos de Construção do Servidor',
    usage: '',

      run: async(client, interaction, args) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Acesse a lista de vencedores das Guerras de Clans e eventos de Construção do Servidor.`, 'https://i.imgur.com/dMswI7f.png')
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://1drv.ms/x/s!AoQJvjmmU2SrgqduSty2nMXN1hctWA?e=sICVV0') 
        .setLabel('Lista de Vencedores');
        
        interaction.editReply({
            components: [new Discord.MessageActionRow().addComponents(button)],
            embeds: [TarefaEmbed]
            })
      }
    }       