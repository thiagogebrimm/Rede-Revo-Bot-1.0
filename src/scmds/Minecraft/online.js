const util = require('minecraft-server-util');

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'online',
    aliases: [''],
    categories : '',
    description: 'Veja o status do servidor',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        util.status('rederevo.com', { port: 25565 })
        .then((response) => {
        let embed = new MessageEmbed()
        .setColor(`#FF0000`)
        .setTitle(`rederevo.com`)
        .setDescription(`
                         Total de jogadores:  \`${response.onlinePlayers}/${response.maxPlayers}\` 
                         Versão: 1.8x/1.17.1\n`)
                         .setThumbnail(message.guild.iconURL({ dynamic: true }))
                         .setTimestamp(message.createdAt)
                         .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                         interaction.editReply({
                             embeds: [embed]
                         })
    
                    })
      }
    }