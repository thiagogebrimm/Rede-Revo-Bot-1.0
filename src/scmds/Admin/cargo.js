const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

const config = require('../../../cargos')

module.exports = {
  name: 'cargos',
  aliases: [''],
  category: 'Admin',
  description: 'Gera o embed para pegar cargos',
  usage: '',

  run: async (client, interaction) => {
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
      .setDescription(`**IPs:** 
      Java: \`rederevo.com\`
      Bedrock: \`jogar.rederevo.com\` <:SetaAzul_Revo:845829681450188881>  Porta: \`19132\`

      **Discord**: https://discord.gg/h6pQ5VwcMz
      
      **Loja**: https://rederevo.com/
      
      **Votar**: http://votar.rederevo.com/`)
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