const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'gartic',
    aliases: [''],
    categories : '',
    description: 'Receba o cargo gartic',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        if (interaction.member.roles.cache.has("855568510637178880")) {
            let role = interaction.guild.roles.cache.find(r => r.id === "855568510637178880");
            interaction.member.roles.remove(role);
            interaction.editReply({ embeds: [new MessageEmbed()
            .setColor(`228B22`)
            .setDescription(`Cargo removido!`)
            ]})
             
           } 
        else {
        let role = interaction.guild.roles.cache.find(r => r.id === "855568510637178880");
        // Or add it to yourself
        interaction.member.roles.add(role);
    
        interaction.editReply({ embeds: [new MessageEmbed()
        .setColor(`228B22`)
        .setDescription(`Cargo setado!`)
        ]})
       }
      }
    }