const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: [''],
    categories : '',
    description: 'Comando de avatar',
    usage: '',
    options: [
      {
        name: 'usuario',
        description: 'Selecione um usuario, opcional.',
        required: false,
        type: "USER"
      }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        let user = interaction.options.getUser("usuario") || interaction.user
  
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
      
        let embed = new Discord.MessageEmbed() 
          .setColor(`#8A2BE2`) 
          .setTitle(`Avatar de ${user.username}`) 
          .setImage(avatar) 
          .setFooter(`• Solicitado por: ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png"}));
       await interaction.editReply({
         embeds: [embed]
       }); 
      }
    }