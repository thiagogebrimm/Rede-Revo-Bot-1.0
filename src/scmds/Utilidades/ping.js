const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: [''],
    categories : '',
    description: 'Verifica a latencia do bot em um calculo matemático',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        interaction.editReply(`🏓Ping Revo:\`${Date.now() - message.createdTimestamp}ms\`. \n🏓Ping API:\`${Math.round(bot.ws.ping)}ms\`.`);
      }
    }