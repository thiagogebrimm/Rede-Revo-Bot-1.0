const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'streamer',
  aliases: [''],
  category: 'Utilidades',
  description: 'Mostra os requisitos para a tag Streamer',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`Segue abaixo os requisitos para as tags Streamer e Streamer+`)
      .setDescription(`**Streamer:**
      Entre **10** e **30** na média de espectadores em cada live
      **2** lives por semana
      Participar do programa de Afiliados da plataforma
      
      **Streamer+:**
      Mais de **30** na média de espectadores em cada live
      **2** lives por semana
      Participar do programa de Afiliados da plataforma
      
      
      <:Gold_Revo:854554725772296192> **Sistema de recompensas**
      
      **Streamer:**
      - Aviso de entrada destacada no lobby
      - Possibilidade de definir **10** homes
      - Pode falar utilizando cores no servidor
      - Sem delay para se teleportar
      - **750** de cash por semana
      - Pode casar outros jogadores com \`/casar <nick> <nick>\`
      - Comando de divulgação exclusivo dentro do servidor \`/divulgar\`
      - Acesso ao <#795426717132390441>

      **Streamer+:**
      - Vantagens do Streamer
      - **1000** de cash por semana
      - Acesso ao \`/fly\` dentro de proteções
      - Acesso ao \`/back\`
      
      Cumpre os requisitos acima? Favor abrir um #📩・ticket pra autenticar a parceria.
      
      **OBS:** Lembrando que ao você se tornar Streamer e Streamer+ suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.`)
      .setFooter({ text: 'Rede Revo', iconURL: interaction.guild.iconURL({ dynamic: true }) });
    interaction.editReply({
      embeds: [embed]
    })
  }
}