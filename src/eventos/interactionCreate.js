module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    try {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return;
      if (cmd.needPermissions && !interaction.member.permissions.has(cmd.permissionsNeeded)) return async () => {
        await interaction.deferReply({ ephemeral: true }).catch((e) => {
          console.log(e);
        });
        interaction.editReply("Você não possue permissão para utilizar este comando.")
      }
      await interaction.deferReply({ ephemeral: false }).catch((e) => {
        console.log(e);
      });
      const args = [];
      interaction.options.data.map((x) => {
        args.push(x.value);
      });
      cmd.run(client, interaction, args)
    } catch (error) {
      interaction.reply(`Olá, o comando ${interaction.commandName} está com erros, e por isto não foi inicializado, enviei mais detalhes do erro em sua DM, caso ela esteja fechada, não será enviada`)

      interaction.user.send(`\`\`\`
        
        ${error}

        \`\`\``)
    }
  } else if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: true });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId === 'cargos') {
      const role = interaction.guild.roles.cache.get(interaction.values[0])
      if (interaction.member.roles.cache.has(role.id)) {
        interaction.member.roles.remove(role.id)
        return interaction.reply({ ephemeral: true, content: `Cargo <@&${role.id}> removido!` })
      } else {

        interaction.member.roles.add(role.id)

        interaction.reply({ ephemeral: true, content: `Cargo <@&${role.id}> adicionado!` })
      }

    }
  }
}