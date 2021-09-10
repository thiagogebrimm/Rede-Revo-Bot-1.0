const Discord = require("discord.js"); 

module.exports.run = async (bot, message) => {
    
    message.delete();

  let embed = new Discord.MessageEmbed() 
    .setColor(`#0099ff`) 
    .setTitle(`Atualmente nosso ip é`) 
    .setDescription('<a:DirtyPulando_Revo:852710345012543490> **IP:** rederevo.com\n\n**<a:DirtyPulando_Revo:852710345012543490> Bedrock:** srv1.rederevo.com:19132')
    .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
 await message.channel.send(embed); 

};

module.exports.help = {
  name: 'ip',
  aliases: [],
  category: 'Utilities',
  description: 'Mostra o ip de nosso servidor.'
}

module.exports.limits = {
  cooldown: 1,
  ratelimit: 1e2
}

module.exports.requirements = {
  ownerOnly: false
}