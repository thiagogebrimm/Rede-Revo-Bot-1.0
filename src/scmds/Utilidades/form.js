const db = require('quick.db');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'form',
    aliases: ['formulario'],
    category: 'Utilidades',
    description: 'Retorna o link do formulário por meio de um texto clicável',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        let link = db.get(`${message.guild.id}-form.link`);
        if (link === null) link === 'https://forms.gle/Wj1WZVCBCcN6khUM7';
    
            interaction.editReply({embeds: [new MessageEmbed()
                .setAuthor(`FORMULARIO EXCLUSIVO`, `https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif`)
                .setDescription(`Clique [aqui](${link}) para ser redirecionado ao formulário participativo da equipe.`)
                .setColor(`36393e`)
                .setFooter(`Solicitado por ${message.member.user.username}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp(Date.now())]})
      }
    }