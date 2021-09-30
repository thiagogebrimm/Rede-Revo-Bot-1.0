const util = require("minecraft-server-util");

const { Client, MessageEmbed } = require("discord.js")

module.exports = (bot) => {
  console.log(`Autenticado como ${bot.user.tag}`);

  const commands = require('../func/Command');
  commands.run(bot);

  setInterval(async () => {
    const sv = await util.status('rederevo.com')
    const bed = await util.statusBedrock('jogar.rederevo.com')

    if (bot.channels.cache.get('893151200160141312').isText()) {
      await bot.channels.cache.get('893151200160141312').messages.fetch().then(f => {
        f.get('893151338186297384').edit({
          embeds: [new MessageEmbed().setTitle("Servidor").setDescription(`
          Motd: ${sv.description.toRaw()}
          
          Versão JAR: ${sv.version.replace('Waterfall ', '')}
          Versão BEDROCK: ${bed.version}

          Players: ${sv.onlinePlayers}/${sv.maxPlayers}`)
            .setColor('RED')
            .setFooter('')
            .setThumbnail('https://api.mcsrvstat.us/icon/rederevo.com')], content: null
        })
      })
    }
    let status = [`com ${sv.onlinePlayers} jogadores`, `IP: rederevo.com`];
    let statuses = status[Math.floor(Math.random() * status.length)];

    bot.user.setActivity({
      name: statuses,
      type: 'PLAYING'
    });
  }, 5000);
};