const util = require("minecraft-server-util");

const Sus = require("../db/Models/Sugestao")
const SusEBao = require("../db/DatabaseLogin")

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

      let status = [`com ${sv.players.online} jogadores`, `rederevo.com`];
      let statuses = status[Math.floor(Math.random() * status.length)];

      bot.user.setActivity({
        name: statuses,
        type: 'PLAYING'
      });
    } catch (error) {
      console.log
    }
  }, 3000);

};