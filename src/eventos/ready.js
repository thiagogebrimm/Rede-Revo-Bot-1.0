const util = require("minecraft-server-util");

const Sus = require("../db/Models/Sugestao")
const SusEBao = require("../db/DatabaseLogin")

const { MessageEmbed } = require("discord.js")

module.exports = (bot) => {

  SusEBao.authenticate().then((result) => {
    console.log("DB iniciada com sucesso.")
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



      const sv = await util.status('jogar.rederevo.com')
      const bed = await util.statusBedrock('jogar.rederevo.com')

      if (bot.channels.cache.get('893151200160141312')?.isText()) {
        await bot.channels.cache.get('893151200160141312').messages.fetch().then(f => {
          f.get('893151338186297384').edit({
            embeds: [new MessageEmbed()
              .setTitle("Informações da Rede")
              .setDescription(`
Motd: **${sv.motd.clean}**
          
Versões JAVA: \`${sv.version.name.replace('Velocity ', 'Waterfall ', '')}\`
Versões BEDROCK: \`da ${bed.version.name} até a mais recente\`

Players: **${sv.players.online}/${sv.players.max}**`)
              .setColor('RED')
              .setFooter('rederevo.com')
              .setThumbnail('https://api.mcsrvstat.us/icon/rederevo.com')], content: null
          })
        })
      }
      let status = [`com ${sv.players.online} jogadores`, `rederevo.com`];
      let statuses = status[Math.floor(Math.random() * status.length)];

      bot.user.setActivity({
        name: statuses,
        type: 'PLAYING'
      });
    } catch (error) {
      if (bot.channels.cache.get('893151200160141312')?.isText()) {
        await bot.channels.cache.get('893151200160141312').messages.fetch().then(f => {
          f.get('893151338186297384').edit({
            embeds: [new MessageEmbed()
              .setTitle("Informações da Rede")
              .setDescription(`
**Servidores Offline**
Voltamos em breve`)
              .setColor('RED')
              .setFooter('rederevo.com')
              .setThumbnail('https://api.mcsrvstat.us/icon/rederevo.com')], content: null
          })
        })
      }
    }
  }, 5000);

};