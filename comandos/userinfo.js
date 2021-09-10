const Discord = require('discord.js');
const moment = require('moment')

module.exports.run = async (bot, message, args) => {
    if(!args[0]){
        var user = message.author;
      } else var user = message.mentions.users.first()
         
      
      const member = message.guild.member(user);
      
          const activities = [];
          for (const activity of user.presence.activities.values()) {
            switch (activity.type) {
              case 'PLAYING':
                activities.push(`Jogando **${activity.name}**`);
                break;
              case 'LISTENING':
                if (user.bot) activities.push(`Escutando **${activity.name}**`);
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
        .setTitle(`Informações sobre ${user.username}`)
        .setThumbnail(user.avatarURL({dynamic: true}))
        .setFooter('Solicitado')
        .setTimestamp()
        .addFields(
            { 
                name: "Informações do Usuario",
                value: "```Username:"+user.username+"\nDiscriminator: #"+user.discriminator+"\nTag: "+user.tag+"\nNickname: "+member.displayName+"\nÉ um bot?: "+obj[user.bot]+"\nID: "+user.id+" ```",
                inline: true
            },
            {
                name: `Status`,
                value: "```"+user.presence.status+"\n"+activities+"```",
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
      
        return message.channel.send(infoEmbed)
}

module.exports.help = {
    name: 'userinfo',
    aliases: ['sobre'],
    category: 'Utilities',
    description: 'Retorna as informações sobre um membro.'
}

module.exports.limits = {
    cooldown: 1,
    ratelimit: 1e2
}

module.exports.requirements = {
    ownerOnly: false
}
