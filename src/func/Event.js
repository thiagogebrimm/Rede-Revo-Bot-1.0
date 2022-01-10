const { readdirSync } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, "..", "eventos");

module.exports.run = (bot) => {
    for (const eventFile of readdirSync(filePath)) {
        const event = require(`${filePath}/${eventFile}`);
        const eventName = eventFile.split(".").shift();
        bot.on(eventName, event.bind(null, bot));
    }

    console.log(`Carreguei ${readdirSync(filePath).length} eventos!`)
}
