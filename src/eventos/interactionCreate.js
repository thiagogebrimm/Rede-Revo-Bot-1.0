const { Client, Interaction } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @returns 
 */

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
      interaction.reply(`Olá querido amigo, o comando ${interaction.commandName} está com erros, e por isto não foi inicializado, enviei mais detalhes do erro em sua DM, caso ela esteja fechada, não será enviada`)

      interaction.user.send(`\`\`\`
        
        ${error}

        \`\`\``)
    }
  }

}