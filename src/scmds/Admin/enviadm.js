const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'dm',
    aliases: [''],
    categories : '',
    description: 'Enviar DM',
    usage: '',
    options: [
        {
            name: "usuario",
            type: "USER",
            required: true,
            description: "Quem é o meliante que devo enviar uma mensagem?"
        },
        {
            name: "msg",
            type: "STRING",
            required: true,
            description: "Mensagem?"
        },
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        let msg = interaction.options.getString("msg")
        const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
        let user = interaction.options.getUser("usuario")
        if(!user) return interaction.editReply(`Você precisa marcar um usuario`)
        if(user.id === interaction.user.id) return interaction.editReply(`Você não pode enviar a você mesmo a mensagem`)
        if(!msg) return interaction.editReply(`Você precisa me dar uma mensagem`)
        if(regex.exec(msg.content)) return interaction.editReply(`Sua mensagem não pode conter links`)
        if(msg.length > 1000) return interaction.editReply(`Sua mensagem não pode passar de 1k de caracteres`)
        
        
        const embed = new MessageEmbed()
          .setColor("PURPLE")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setDescription(`Hey ${user} Sabia que ${interaction.user.tag} te ama? se liga na mensagem deixada\n> ${msg}`)
          .setFooter(`Menssagem enviada por ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        user.send({
            embeds: [embed]
        }).catch(a => {return interaction.channel.send(`Impossivel mandar mensagens na dm deste usuario!`)})
        
        interaction.editReply(`${interaction.user} Foi enviada sua mensagem para ${user.tag}`)
      }
    }