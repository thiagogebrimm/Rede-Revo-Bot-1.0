const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'avatar',
  aliases: [''],
  categories: '',
  description: 'Comando para ver o avatar de alguém',
  usage: '',
  options: [
    {
      name: 'membro',
      description: 'Selecione um membro, opcional.',
      required: false,
      type: "USER"
    }
  ],

  run: async (client, interaction) => {
    let user = interaction.options.getUser("membro") || interaction.user

    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    let embed = new MessageEmbed()
      .setColor(`#8A2BE2`)
      .setTitle(`Avatar de ${user.username}`)
      .setImage(avatar)
      .setFooter(`• Solicitado por: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png" }));
    await interaction.editReply({
      embeds: [embed]
    });
  }
}