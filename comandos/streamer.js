const Discord = require("discord.js"); 

exports.run = async (client, message) => {
    
  message.delete({ timeout: 5 * 1000 });

  let embed = new Discord.MessageEmbed() 
    .setColor(`#0099ff`) 
    .setTitle(`Segue abaixo os requisitos para as tags Streamer e Streamer+`) 
    .setDescription('**Streamer:**\nEntre **5** e **30** no máximo de espectadores em cada live\n**2** lives por semana\n\n**Streamer+:**\nMais de **30** no máximo de espectadores em cada live\n**2** lives por semana\n\n\n<:Gold_Revo:854554725772296192> **Sistema de recompensas**\n\n**Streamer:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **300** de cash por semana\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\n**Streamer+:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **500** de cash por semana\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\nCumpre os requisitos acima? Favor abrir um #📩・ticket pra autenticar a parceria.\n\n**OBS:** Lembrando que ao você se tornar Streamer e Streamer+ suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.')
    .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
 await message.channel.send(embed); 

};

module.exports.help = {
  name: 'streamer',
  aliases: [],
  category: 'Utilities',
  description: 'Mostra os requisitos para ser streamer.'
}

module.exports.limits = {
  cooldown: 1,
  ratelimit: 1e2
}

module.exports.requirements = {
  ownerOnly: false
}