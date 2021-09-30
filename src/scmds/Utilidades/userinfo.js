const moment = require('moment')

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'userinfo',
    aliases: [''],
    category: 'Utilidades',
    description: 'Veja informações de um usuario',
    usage: '',
    options: [
      {
        name: 'user',
        type: 'USER',
        required: false,
        description:"Escollha um usuario"
      }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        const member = interaction.options.getMember("user") || interaction.member
      
        const activities = [];
        for (const activity of member.user.presence.activities.values()) {
          switch (activity.type) {
            case 'PLAYING':
              activities.push(`Jogando **${activity.name}**`);
              break;
            case 'LISTENING':
              if (member.user.bot) activities.push(`Escutando **${activity.name}**`);
              else activities.push(`Escutando **${activity.details}** de **${activity.state}**`);
              break;
            case 'WATCHING':
              activities.push(`Assistindo **${activity.name}**`);
              break;
            case 'STREAMING':
              activities.push(`Transmitindo **${activity.name}**`);
              break;
            case 'CUSTOM_STATUS':
              customStatus = activity.state;
              break;
          }}
    
    
          let obj = { false: 'Não', true: 'Sim' }
    
    
      const infoEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Informações sobre ${member.user.username}`)
      .setThumbnail(member.user.avatarURL({dynamic: true}))
      .setFooter('Solicitado')
      .setTimestamp()
      .addFields(
          { 
              name: "Informações do Usuario",
              value: "```Username:"+member.user.username+"\nDiscriminator: #"+member.user.discriminator+"\nTag: "+member.user.tag+"\nNickname: "+member.displayName+"\nÉ um bot?: "+obj[member.user.bot]+"\nID: "+member.user.id+" ```",
              inline: true
          },
          {
              name: `Status`,
              value: "```"+member.user.presence.status+"\n"+activities+"```",
              inline: false
          },
          {
              name: `Datas`,
              value: "```Entrou aqui em: "+moment(member.joinedTimestamp).format('LLL')+"\n\nConta criada em: "+moment(member.user.createdTimestamp).format('LLL')+"```",
              inline: true
          },
          {
            name: `Cargos`,
            value: ""+member.roles.cache.map(r => r).join(' | ')+"",
            inline: true
          },
        
    
      )
      interaction.editReply({
        embeds: [infoEmbed]
      })
      }
    }