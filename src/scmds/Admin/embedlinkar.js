const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'embedlinkar',
  aliases: [''],
  category: 'Admin',
  description: 'Gera a embed com as vantagens de linkar a conta',
  usage: '',

  run: async (bot, interaction) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    let embedVantagens = new MessageEmbed()
      .setTitle(`<a:Check_Revo:845556618837098506> Vincule a sua conta do discord com a do Servidor <a:Check_Revo:845556618837098506>`)
      .setDescription(`
**Sincronize a sua conta com o servidor e libere funções no discord, além de garantir uma maior segurança para a sua conta.**

\`Vantagens:\`
<:Adicionado_Revo:896504537731440681> Entrar nas salas de voz privadas do discord;
<:Adicionado_Revo:896504537731440681> Fazer transmissões nas salas de voz do discord;
<:Adicionado_Revo:896504537731440681> Criar sugestões para poder melhorar os servidores;
<:Adicionado_Revo:896504537731440681> Votar no canal de <#793508882852216883>;
<:Adicionado_Revo:896504537731440681> Divulgar o seu clã no canal <#894789710705221693>;
<:Adicionado_Revo:896504537731440681> Ter o cargo <@&793614247283261451> e receber o cargo respectivo ao seu vip (caso você tenha VIP no servidor).
\u200B
      `)
      .setColor('GREEN')

      let embedTuto = new MessageEmbed()
      .setTitle(`Como vinculo a minha conta? <:PepeMine_Revo:845563440500441150>`)
      .setDescription(`
No servidor você vai digitar \`/linkar\` e vai aparecer uma pequena explicação com a chave de sincronização, copie a sua chave de sincronização, vá no canal <#846189183550881792> e digite \`/linkar código:<sua chave>\`

Se aparecer a mensagem abaixo é porque a sua sincronização foi um sucesso e sua conta está vinculada com o servidor!
      `)
      .setImage('https://i.imgur.com/VNLYUjH.png')
      .setColor('GREEN')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedVantagens, embedTuto]
    })
  }
}