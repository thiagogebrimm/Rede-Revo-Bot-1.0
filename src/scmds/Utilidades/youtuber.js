const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'youtuber',
  aliases: ['yt'],
  category: 'Utilidades',
  description: 'Mostra os requisitos para a tag Youtuber',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`Segue abaixo os requisitos para as tags YT e YT+`)
      .setDescription(`**YT:**
      **250 - 1000** inscritos
      **1** vídeo por semana
      **25%** de visualizações em relação aos inscritos
      
      **YT+:**
      **1000 - 5000** inscritos
      **1** vídeo por semana
      **25%** de visualizações em relação aos inscritos
      
      
      <:Gold_Revo:854554725772296192> **Sistema de recompensas**
      
      **YT:**
      - Aviso de entrada destacada no lobby
      - Possibilidade de definir **10** homes
      - Pode falar utilizando cores no servidor
      - Sem delay para se teleportar
      - **300** cash por vídeo semanal caso a parceria seja cumprida corretamente
      - Comando de divulgação exclusivo dentro do servidor \`/divulgar\`
      - Acesso ao <#795426717132390441>
      
      **YT+:**
      - Vantagens do YT
      - **500** cash por vídeo semanal caso a parceria seja cumprida corretamente
      - Acesso ao \`/fly\` dentro de proteções
      - Acesso ao \`/back\`
      
      Cumpre os requisitos acima? Favor abrir um #📩・ticket pra autenticar a parceria.
      
      **OBS:** Lembrando que ao você se tornar Youtuber e Youtuber+ suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.`)
      .setFooter('Rede Revo', interaction.guild.iconURL({ dynamic: true }));
    interaction.editReply({
      embeds: [embed]
    })
  }
}