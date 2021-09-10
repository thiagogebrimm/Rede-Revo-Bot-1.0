const Discord = require("discord.js"); 

module.exports.run = async (client, message, args) => {
    
    message.delete();

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let embed = new Discord.MessageEmbed() 
    .setColor(`#8A2BE2`) 
    .setTitle(`Avatar de ${user.username}`) 
    .setImage(avatar) 
    .setFooter(`• Solicitado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
 await message.channel.send(embed); 

};

module.exports.help = {
  name: 'avatar',
  aliases: ['av'],
  category: 'Utilities',
  description: 'Mostra o avatar de um membro.'
}

module.exports.limits = {
  cooldown: 1,
  ratelimit: 1e2
}

module.exports.requirements = {
  ownerOnly: false
}