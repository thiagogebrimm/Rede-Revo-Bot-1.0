const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'yt',
    aliases: [''],
    categories : '',
    description: 'Nosso canal do yt',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        let embed = new Discord.MessageEmbed() 
        .setColor(`#0099ff`) 
        .setTitle(`Segue abaixo os requisitos para as tags YT e YT+`) 
        .setDescription('**YT:**\n**250 - 1000** inscritos\n**1** vídeo por semana\n**25%** de visualizações em relação aos inscritos\n\n**YT+:**\n**1000 - 5000** inscritos\n**1** vídeo por semana\n**25%** de visualizações em relação aos inscritos\n\n\n<:Gold_Revo:854554725772296192> **Sistema de recompensas**\n\n**YT:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **300** cash por vídeo semanal caso a parceria seja cumprida corretamente\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\n**YT+:**\n- Aviso de entrada destacada no lobby\n- Possibilidade de definir **10** homes\n- **500** cash por vídeo semanal caso a parceria seja cumprida corretamente\n- Comando de divulgação exclusivo dentro do servidor\n- Acesso ao #🎬・divulgação\n\nCumpre os requisitos acima? Favor abrir um #📩・ticket pra autenticar a parceria.\n\n**OBS:** Lembrando que ao você se tornar Youtuber e Youtuber+ suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.')
        .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
        interaction.editReply({
          embeds: [embed]
        })
      }
    }