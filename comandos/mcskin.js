const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        message.channel.send("Especifique o nickname do jogador.").then(i => i.delete({ timeout: 5000 }));
        return;
      }

      var player = message.content.split(" ").slice(1).join(" ");
      var link = `https://minotar.net/skin/` + player;
      let embedSkin = new MessageEmbed()
        .setDescription(`Aqui está a skin do(a) **${player}**!`)
        .setImage(link)
        .setColor('36393e')
      message.channel.send(embedSkin);
}

module.exports.help = {
    name: 'mcskin',
    description: 'Retorna a skin de um usuário.',
    category: 'Minecraft',
    aliases: ['minecraftskin', 'skin']
}

module.exports.limits = {
    cooldown: 1e2,
    ratelimit: 3
}

module.exports.requirements = {
    ownerOnly: false
}