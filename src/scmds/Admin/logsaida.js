const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'logsaida',
  aliases: [''],
  category: 'Admin',
  description: 'Remover um membro da equipe',
  usage: '',
  options: [
    {
      name: "membro",
      type: "USER",
      description: "Selecione o membro da equipe",
      required: true
    },
    {
      name: "cargo",
      type: "ROLE",
      description: "Diga o cargo que será removido",
      required: true
    },
  ],
  run: async (client, interaction) => {
    const moment = require("moment")
    moment.locale("pt-BR")

    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply("Sem permissão para executar esse comando!")

    const cchu = new MessageEmbed()
      .setDescription(`Você deve mencionar o usuário e o cargo. Ex: /logentrada @usuário @cargo`)
      .setColor(`RED`)

    let testedUser = interaction.options.get("membro").member
    if (!testedUser) {
      return interaction.channel.send(cchu).then(msg => {
        msg.delete({ timeout: 5000 })
      })
    }

    let role = interaction.options.get("cargo").role
    await testedUser.roles.remove(role.id)
    let staff = interaction.guild.roles.cache.find(r => r.id === "852039893207351328")
    await testedUser.roles.remove(staff)
    let hora = moment().format("D [de] MMM [de] YYYY");
    const cu = new MessageEmbed()
      .setTitle(`**Alteração na equipe**`)
      .setColor("#ff0000")
      .setDescription(`**${testedUser.displayName}** não integra mais na equipe como **${role}**
        
        \`${hora}\``)
      .setThumbnail(interaction.guild.iconURL)
      .setFooter({ text: `Atenciosamente Rede Revo`, iconURL: interaction.guild.iconURL({ dynamic: true })})
    await interaction.guild.channels.cache.find(x => x.id === '845531157990866974')?.send({
      embeds: [cu]
    })

    await interaction.editReply({
      embeds: [new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`\`${testedUser.displayName.toString()}\` foi removido do cargo ${role}`)]
    });
  }
}