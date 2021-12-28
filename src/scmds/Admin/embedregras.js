const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'embedregras',
  aliases: [''],
  category: 'Admin',
  description: 'Gera o embed para pegar cargos',
  usage: '',

  run: async (bot, interaction) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    let embedRegras = new MessageEmbed()
      .setTitle(`📚 Regras Rede Revo 📚`)
      .setURL('https://wiki.rederevo.com/regras')
      .setDescription(`A Rede Revo possui regras de conduta que devem ser respeitadas para que todos possam jogar sem chateações ou problemas.
      Abaixo, você pode conferir o link com todas as regras de nossa rede e também as punições que podem ser aplicadas caso você as descumpra.
      
      _Toda e qualquer alteração nas regras são registradas em <#845531157990866974>, fique de olho!_

      **Link para as regras:** https://wiki.rederevo.com/regras`)
      .setThumbnail('https://blogexamedeordem.com.br/uploads/2018/01/regras.png')
      .setColor('RED')

    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedRegras]
    })
  }
}