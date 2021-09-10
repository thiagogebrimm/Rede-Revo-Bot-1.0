const Discord = require("discord.js"); 

exports.run = async (client, message) => {
    
    message.delete({ timeout: 5 * 1000 });

  let embed = new Discord.MessageEmbed() 
    .setColor(`#0099ff`) 
    .setTitle(`Segue abaixo os requisitos para as tags YT e YT+`) 
    .setDescription('**YT:**\n**250 - 1000** inscritos\n**1** vídeo por semana\n**25%** de visualizações em relação aos inscritos\n\n**YT+:**\n**1000 - 5000** inscritos\n**1** vídeo por semana\n**25%** de visualizações em relação aos inscritos\n\n\n<:Gold_Revo:854554725772296192> **Sistema de recompensas**\n\n**YT:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **300** cash por vídeo semanal caso a parceria seja cumprida corretamente\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\n**YT+:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **500** cash por vídeo semanal caso a parceria seja cumprida corretamente\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\nCumpre os requisitos acima? Favor abrir um #📩・ticket pra autenticar a parceria.\n\n**OBS:** Lembrando que ao você se tornar Youtuber e Youtuber+ suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.')
    .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
 await message.channel.send(embed); 

};

module.exports.help = {
  name: 'youtuber',
  aliases: ['yt'],
  category: 'Utilities',
  description: 'Mostra os requisitos para ser youtuber.'
}

module.exports.limits = {
  cooldown: 1,
  ratelimit: 1e2
}

module.exports.requirements = {
  ownerOnly: false
}