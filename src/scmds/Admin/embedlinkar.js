const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'embedlinkar',
  aliases: [''],
  category: 'Admin',
  description: 'Gera a embed com as vantagens de linkar a conta',
  usage: '',

  run: async (bot, interaction) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    let embedRegras = new MessageEmbed()
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

      `)
      .setColor('GREEN')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedRegras]
    })
  }
}