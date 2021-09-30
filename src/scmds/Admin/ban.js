const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'banir',
    description: 'Comando pra punir os meliante :>',
    usage: '',
    needPermissions: true,
    permissionsNeeded: ['BAN_MEMBERS'],
    options: [
        {
            name: "usuario",
            type: "USER",
            required: true,
            description: "Quem é o meliante que devo banir?"
        },
        {
            name: "motivo",
            type: "STRING",
            required: false,
            description: "Motivo do meliante ser banido?"
        }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        if (!interaction.member.permissions.has(['BAN_MEMBERS'])) return;
        const member = interaction.options.getMember("usuario", true)
       if (!member) {
           interaction.editReply({ embeds: [new MessageEmbed()
           .setDescription(`Você deve mencionar um meliante válido.`)
           .setColor(`RED`)]})
   
       } else {
           let reason = interaction.options.get("motivo")?.value
           if (!reason) reason = 'Nenhum motivo especificado.'
           else {
               reason = args.slice(1).join(' ');
           }
   
           interaction.editReply({embeds:[new MessageEmbed()
           .setColor(`RED`)
           .setDescription(`O meliante ${member.user.username.toString()} foi punido!`)]});
       
            
               if (member.user.id !== interaction.user.id) {
                    if (member.bannable) {
                        console.log("DaPaBanir")
                           const { guild } = interaction;
                           try {
                           await member.user.send({embeds:[new MessageEmbed()
                           .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                           .setDescription(`Você foi banido(a) por ${interaction.member.toString()}.\nMotivo: \`${reason}\``)
                           .setColor(`RED`)]});
                        } catch(error) {
                            console.log(error.message)
                        }
                           await interaction.guild.channels.cache.find(x => x.id === '849452824970264626')?.send({embeds:[new MessageEmbed()
                           .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                           .setDescription(`${member.user.username.toString()} foi banido(a) por ${interaction.member.toString()}.\nMotivo: \`${reason}\``)
                           .setColor(`RED`)]});

                           let a = await member.ban({ reason: reason })

                           console.log(a)
                        

                   } else return interaction.editReply("Não foi possivel banir o usuario.")
               }
           }
       
      }
    }