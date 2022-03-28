const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'influencer',
  aliases: [],
  category: 'Utilidades',
  description: 'Mostra os requisitos para a tag Influencer',
  usage: '',

  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setColor(`#fa03ff`)
      .setTitle(`Segue abaixo os requisitos para a tag Influencer`)
      .setDescription(`
**Segue abaixo os requisitos para a tag [Influencer]**

> <:SetaResposta_RedeRevo:953766529915293746> Se aplica para criadores de conteúdo que não se enquadram no cargo de Streamer ou YouTuber.

> <:Seta_RedeRevo:896501293273718864> Mínimo de **5000** seguidores;
> <:Seta_RedeRevo:896501293273718864> Postar conteúdo frequentemente no último mês;
> <:Seta_RedeRevo:896501293273718864> Ter uma publicação recente em referência ao servidor.

<:Gold_RedeRevo:854554725772296192> **Sistema de recompensas da tag [Influencer]**

- Aviso de entrada destacada no lobby;
- Possibilidade de definir 10 homes
- Poder falar utilizando cores no servidor
- Sem delay de teleporte
- **500** de cash por publicação a cada 3 dias, caso a parceria seja cumprida corretamente

Cumpre os requisitos acima? Favor abrir um <#929227946512777216> para autenticar a parceria.

**OBS:** Lembrando que ao se tornar Influencer suas ações representam diretamente o servidor. Então sempre aja de acordo com as regras.
`)
      .setFooter({ text: 'Rede Revo', iconURL: interaction.guild.iconURL({ dynamic: true }) });
    interaction.editReply({
      embeds: [embed]
    })
  }
}