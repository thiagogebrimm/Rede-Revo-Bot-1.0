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
**<a:Diamante_Revo:945812902990974976>・[Sistema de Liga](https://wiki.rederevo.com/sistemas/sistema-de-liga)**
**<:Esmeralda_Revo:847520945912414258>・[Sistema de Cash](https://wiki.rederevo.com/sistemas/sistema-de-cash)**
**<a:Chest_Revo:856608120623988796>・**[Sistema de Terrenos](https://wiki.rederevo.com/sistemas/sistema-de-terrenos)
**<:esqueleto_Revo:870518827425882202>・**[Sistema de cabeças personalizadas](https://wiki.rederevo.com/sistemas/sistema-de-cabecas)
**<:DiamondSword_Revo:945813200560066641>・**[Agenda de eventos do servidor](https://wiki.rederevo.com/eventos/eventos-do-servidor/agenda-de-eventos)
**<a:AxolotNadando_Revo:908448485232226314>・**[Como utilizo cores RGB no servidor?](https://wiki.rederevo.com/ajuda/cores-hex)
**<:SteveSpyGlass_Revo:945813016635666463>・**[Problemas com skin TLauncher](https://wiki.rederevo.com/ajuda/tlauncher/problemas-com-skin-no-tlauncher)
**<:EnderPearl_Revo:945813117097619486>・**[Problemas de conexão no servidor?](https://wiki.rederevo.com/ajuda/problemas-de-conexao)
**<:Allay_Revo:901984149223661568> ・**[Como posso entrar na equipe?](https://wiki.rederevo.com/outros/faca-parte-da-equipe)
      `)
      .setColor('#836FFF')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedRegras]
    })
  }
}