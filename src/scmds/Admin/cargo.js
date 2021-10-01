const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { r1, r2, r3, r1m, r2m, r3m} = require('../../../cargos.json')


module.exports = {
  name: 'cargo',
  aliases: [],
  category: 'Admin',
  description: 'Comando para pegar os cargos',
  usage: '',
  run: async (client, interaction) => {

    if (interaction.commandName == 'roles') {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('roles')
            .setPlaceholder('Select a reaction role')
            .addOptions([
              { //edit the option according to you ⚠leave the emoji fields like they are 
                label: 'Notificar Anúncios',
                description: 'Seja notificado com anúncios do servidor',
                value: 'first_option',
                emoji: r1m
              },
              {
                label: 'Notificar Atualizações',
                description: 'Seja notificado com atualizações do servidor',
                value: 'second_option',
                emoji: r2m
              },
              {
                label: 'Notificar Eventos',
                description: 'Seja notificado com eventos do servidor',
                value: 'third_option',
                emoji: r3m
              },
            ]),
        );

      await interaction.reply({ content: "Olá, pegue seus cargos", ephemeral: true, components: [row] })//edit the content here
    }



    //if the interaction is select menu then reply
    if (interaction.isSelectMenu()) {

      let choice = interaction.values[0]
      const member = interaction.member
      if (choice == 'first_option') {
        if (member.roles.cache.some(role => role.id == r1)) {
          interaction.reply({ content: "O cargo foi removido com sucesso", ephemeral: true })
          member.roles.remove('847793663597608990')
        }
        else {
          member.roles.add(r1)
          await interaction.reply({ content: "O cargo foi adicionado com sucesso", ephemeral: true })
        }
      }

      else if (choice == 'second_option') {
        if (member.roles.cache.some(role => role.id == r2)) {
          interaction.reply({ content: "O cargo foi removido com sucesso", ephemeral: true })
          member.roles.remove(r2)
        }
        else {
          member.roles.add(r2)
          await interaction.reply({ content: "O cargo foi adicionado com sucesso", ephemeral: true })
        }
      }


      else if (choice == 'third_option') {
        if (member.roles.cache.some(role => role.id == r3)) {
          interaction.reply({ content: "O cargo foi removido com sucesso", ephemeral: true })
          member.roles.remove(r3)
        }
        else {
          member.roles.add(r3)
          await interaction.reply({ content: "O cargo foi adicionado com sucesso", ephemeral: true })
        }
      }
    }
  }
}