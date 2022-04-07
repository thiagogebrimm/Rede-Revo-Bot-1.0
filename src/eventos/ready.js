const util = require("minecraft-server-util");

const Sus = require("../db/Models/Sugestao")
const FormA = require("../db/Models/FormAjudante")
const SusEBao = require("../db/DatabaseLogin");
const Message = require("../db/Models/Message");
const Sorteios = require("../db/Models/Sorteio");
const { Client } = require("discord.js");
const DelMessage = require("../../Utils/DelMessage");
const EndPrize = require("../../Utils/EndPrize");
const { findSourceMap } = require("module");


/**
 * 
 * @param {Client} bot 
 */
module.exports = (bot) => {

  SusEBao.authenticate().then((result) => {
    console.log("DB iniciada com sucesso.")
    Sus.init(SusEBao).sync({ force: false })
    FormA.init(SusEBao).sync({ force: false })
    Message.init(SusEBao).sync({ force: false })
    Sorteios.init(SusEBao).sync({ force: false })
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
      console.log(error)
    }
  }, 3000);

  setTimeout(async () => {
    const findA = await Message.findAll({
      where: {
        deleted: false
      }
    })

    findA.map(async (d) => {
      const findM = bot.channels.cache.get(d.channelId);
      if(!findM || findM.type !== 'GUILD_TEXT') return;

      await findM.messages.fetch();

      const findMsg = findM.messages.cache.get(d.messageId);
      if(!findMsg) return;

      DelMessage(findMsg)
    })

    const findAS = await Sorteios.findAll({
      where: {
        ended: false
      }
    })
    findAS.forEach(async (f) => {
      const findM = bot.channels.cache.get(f.channelId);
      if(!findM || findM.type !== 'GUILD_TEXT') return;

      await findM.messages.fetch()
      const findMsg = findM.messages.cache.get(f.messageId);
      if(!findMsg) return f.update({
        ended: true
      });

      EndPrize(findMsg)
    })
  }, 2000)

};