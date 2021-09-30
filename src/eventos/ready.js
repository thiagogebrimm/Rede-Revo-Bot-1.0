const util = require("minecraft-server-util");

module.exports = (bot) => {
  console.log(`Autenticado como ${bot.user.tag}`);

  const commands = require('../func/Command');
  commands.run(bot);

  setInterval(() => {
    util.status("srv1.rederevo.com", {port: 25565}).then((response) => {
      let status = [`com ${response.onlinePlayers} jogadores`, `IP: rederevo.com`];
      let statuses = status[Math.floor(Math.random() * status.length)];

      bot.user.setPresence({
        activity: {
          name: statuses
        },
        status: "online"
      });
    }).catch((e) => {
        console.log(e);
    }) ;
  }, 5000);
};