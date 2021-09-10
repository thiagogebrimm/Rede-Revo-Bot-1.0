const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        message.channel.send("Especifique o nickname do jogador.").then(i => i.delete({ timeout: 5000 }));
        return;
      }

      var player = message.content.split(" ").slice(1).join(" ");
      var url = `https://minotar.net/helm/` + player + `/100.png`;
      let embedHead = new MessageEmbed()
        .setDescription(`Aqui está a cabeça da skin do(a) **${player}**!`)
        .setImage(url)
        .setColor(`36393e`)
      message.channel.send(embedHead);
}

module.exports.help = {
    name: 'mchead',
    description: 'Retorna a cabeça da skin um usuário.',
    category: 'Minecraft',
    aliases: ['minecrafthead', 'head', 'mcavatar']
}

module.exports.limits = {
    cooldown: 1e2,
    ratelimit: 3
}

module.exports.requirements = {
    ownerOnly: false
}