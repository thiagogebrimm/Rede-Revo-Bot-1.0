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
      .setTitle(`<:Seta_Revo:896501293273718864> **__Perguntas Frequentes__** <:Revo:857398325195833344>`)
      .setThumbnail(`https://static.wikia.nocookie.net/minecraft_br_gamepedia/images/5/55/Livro_e_pena.png/revision/latest/scale-to-width-down/150?cb=20180826024116.png`)
      .setDescription(`\u200B
**<a:aAxolot_Revo:878087398901284874>・[Sistema de Temporadas](https://wiki.rederevo.com/sistemas/sistema-de-temporadas)**
**<:Estrela_Revo:917616701774909470>・[Sistema de Liga](https://wiki.rederevo.com/sistemas/sistema-de-liga)**
**<:Esmeralda_Revo:847520945912414258>・[Sistema de Cash](https://wiki.rederevo.com/sistemas/sistema-de-cash)**
**<a:DirtyPulando_Revo:852710345012543490>・**[Sistema de Terrenos](https://wiki.rederevo.com/sistemas/sistema-de-terrenos)
**<:esqueleto_Revo:870518827425882202>・**[Sistema de cabeças personalizadas](https://wiki.rederevo.com/sistemas/sistema-de-cabecas)
**<:Espadas_Revo:890297997471154186>・**[Agenda de eventos do servidor](https://wiki.rederevo.com/eventos/eventos-do-servidor/agenda-de-eventos)
**<a:AxolotNadando_Revo:908448485232226314>・**[Como utilizo cores RGB no servidor?](https://wiki.rederevo.com/ajuda/cores-hex)
**<:PepeMine_Revo:845563440500441150>・**[Problemas com skin TLauncher](https://wiki.rederevo.com/ajuda/tlauncher/problemas-com-skin-no-tlauncher)
**<a:ChuvaSad_Revo:855654740510375957>・**[Problemas de conexão no servidor?](https://wiki.rederevo.com/ajuda/problemas-de-conexao)
      `)
      .setColor('#836FFF')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedRegras]
    })
  }
}