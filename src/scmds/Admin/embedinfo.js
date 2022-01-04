const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

const config = require('../../../cargos')

module.exports = {
  name: 'embedinfo',
  aliases: [''],
  category: 'Admin',
  description: 'Gera o embed para o canal de informações',
  usage: '',

  run: async (bot, interaction) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    const select = new Discord.MessageSelectMenu()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder('Escolher Cargo')
      .setCustomId('cargos')

    config.roles.forEach(element => {
      select.addOptions({
        value: element.id,
        label: element.label,
        emoji: {
          id: element.emojiId
        }
      })
    });

    let embedInfo = new MessageEmbed()
      .setAuthor(`Bem-vindo ao nosso Discord`, `https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b7/Crafting_Table_JE4_BE3.png`)
      .setDescription(`**Nossos IPs:** 
Java: \`rederevo.com\`
Bedrock: \`jogar.rederevo.com\` <:SetaAzul_Revo:845829681450188881>  Porta: \`19132\`

**Convite para o Discord**: https://discord.com/invite/h6pQ5VwcMz`)
      .addField(`\u200B`, `\u200B`)
      .addField(`🌐 Site: `, `[Clique aqui](https://rederevo.com)`, true)
      .addField(`💰 Loja: `, `[Clique aqui](https://rederevo.com/itens)`, true)
      .addField(`<:chave_Revo:893281226784395294> Votar: `, `[Clique aqui](http://votar.rederevo.com)`, true)
      .addField(`📚 Regras: `, `[Clique aqui](https://wiki.rederevo.com/regras)`, true)
      .addField(`<:YT_Revo:864883359263096832> Youtube: `, `[Clique aqui](https://www.youtube.com/channel/UC9j_5RH3wx8fBcudLGFSD9w)`, true)
      .addField(`<:Instagram_Revo:854866638524252200> Instagram: `, `[Clique aqui](https://www.instagram.com/rede.revo/)`, true)
      .setColor('BLURPLE')

    let embedCargo = new MessageEmbed()
      .setTitle('Seleção de cargos para Notificações <:Discord_Revo:849415817186639893>')
      .setDescription("Selecione o(s) cargo(s) que corresponde ao que você deseja receber notificações em nosso discord!")
      .setColor('BLURPLE')
      .setThumbnail('https://unifei.edu.br/pessoal/wp-content/uploads/sites/64/2017/04/Descri%C3%A7%C3%A3o-de-Cargo-e1492694015349.png')
    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedInfo, embedCargo], components: [
        new Discord.MessageActionRow().addComponents(select)
      ]
    })
  }
}