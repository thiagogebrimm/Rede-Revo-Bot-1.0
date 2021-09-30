const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

let ms = require("ms")

module.exports = {
    name: 'contruir',
    aliases: [''],
    categories : '',
    description: 'Comando de construir =D',
    usage: '',
    options: [
        {
            name: "usuario",
            type: "USER",
            required: true,
            description: "Quem é o builder?"
        },
        {
            name: "tarefa",
            type: "STRING",
            required: true,
            description: "Qual é a tarefa?"
        },
        {
            name: "data",
            type: "STRING",
            required: true,
            description: "Qual é a data?"
        },
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        if (!interaction.member.permissions.has(['MANAGE_MESSAGES'])) return interaction.editReply('Apenas membros da equipe podem utilizar esté comando.');
        const member = interaction.options.getMember("usuario")
       if (!member) {
         interaction.editReply( new MessageEmbed()
           .setDescription(`Você deve mencionar um builder válido.`)
           .setColor(`RED`)
       );
       } else {
        let data = interaction.options.getString("data");
           if (!data) data = 'Não foi definido uma data.'
   
           if (!data.endsWith("d") && !data.endsWith("h") && !data.endsWith("m")) return interaction.editReply(
               `Você não usou a forma correta para a hora, Use apenas letras minusculas. Exemplo: 1m, 1h, 1d`
               );
               
           if (isNaN(data[0])) return interaction.editReply(`Isso não é um número!`);
   
           let tarefa = interaction.options.getString("tarefa");
           if (!tarefa) return interaction.editReply({
               embeds: [ new MessageEmbed()
                .setDescription(`Você deve dizer uma construção.`)
                .setColor(`RED`)]
           });
   
           interaction.editReply({
               embeds: [new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Construção solicitada!`)]
           }
           );
   
           let TarefaEmbed = new MessageEmbed()
           .setTitle(`Nova Construção designada para você`)
           .setAuthor(`Solicitado por: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
           .setThumbnail('https://i.imgur.com/oKZBqno.png')
           .setDescription(`${tarefa}`)
           .setFooter(`Construir até:`, interaction.guild.iconURL( {dynamic: true} ))
           .setTimestamp(Date.now() + ms(args[1]))
           .setColor(`#FF4500`);
   
           let button = new Discord.MessageButton()
           .setStyle('DANGER')
           .setLabel('Marcar como concluida')
           .setCustomId('delete2');
   
           const msg = await interaction.channel?.send(`${member}`, {
               components: [new Discord.MessageActionRow().addComponents(button)],
               embeds: [TarefaEmbed]
               })
           member.send({ embeds: [TarefaEmbed], content: msg.url})
       }
      }
    }