const util = require("minecraft-server-util");

const Sus = require("../db/Models/Sugestao")
const SusEBao = require("../db/DatabaseLogin")

const { MessageEmbed } = require("discord.js")

module.exports = (bot) => {

  SusEBao.authenticate().then((result) => {
    console.log("DB iniciada.")
    Sus.init(SusEBao).sync({ force: false })
  }).catch((err) => {
    console.log(err)
    process.exit(0)
  });

  console.log(`Autenticado como ${bot.user.tag}`);

  const commands = require('../func/Command');
  commands.run(bot);

  setInterval(async () => {

    try {



      const sv = await util.status('rederevo.com')
      const bed = await util.statusBedrock('jogar.rederevo.com')

      if (bot.channels.cache.get('893151200160141312')?.isText()) {
        await bot.channels.cache.get('893151200160141312').messages.fetch().then(f => {
          f.get('893151338186297384').edit({
            embeds: [new MessageEmbed().setTitle("Informações da Rede").setDescription(`
          Motd: **${sv.description.toRaw()}**
          
          Versões JAR: \`${sv.version.replace('Waterfall ', '')}\`
          Versões BEDROCK: \`da ${bed.version} até a mais recente\`

          Players: **${sv.onlinePlayers}/${sv.maxPlayers}**`)
              .setColor('RED')
              .setFooter('Rede Revo')
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
    } catch (error) {
      console.log(error)
    }
  }, 5000);

};