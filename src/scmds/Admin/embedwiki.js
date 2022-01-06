const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'embedwiki',
  aliases: [''],
  category: 'Admin',
  description: 'Gera o embed para a WIKI',
  usage: '',

  run: async (bot, interaction) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    let embedRegras = new MessageEmbed()
      .setTitle(`<:Revo:857398325195833344> Perguntas Frequentes <:Revo:857398325195833344>`)
      .setDescription(`
**<:Estrela_Revo:917616701774909470> | [Como funciona o Cash?](https://wiki.rederevo.com/sistemas/sistema-de-cash)**
**<:Espadas_Revo:890297997471154186> |** [Qual é a agenda de Eventos do servidor?](https://wiki.rederevo.com/eventos/eventos-do-servidor/agenda-de-eventos)
**<:PepoSeiLa_Revo:846192575290408990> |** [Quanto tempo eu posso ficar offline até perder meu terreno?](https://wiki.rederevo.com/sistemas/sistema-de-protecao/protecao-abandonada)
**<a:AxolotNadando_Revo:908448485232226314> |** [Como utilizo cores RGB no servidor?](https://wiki.rederevo.com/ajuda/cores-hex)
**<:PepeMine_Revo:845563440500441150> |** [Como desativo as skins do TLauncher?](https://wiki.rederevo.com/ajuda/tlauncher/problemas-com-skin-no-tlauncher)
      `)
      .setColor('#836FFF')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedRegras]
    })
  }
}