const { readdirSync, fstat } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, "..", "comandos");

module.exports.run = (bot) => {
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))) {
        const props = require(`${filePath}/${cmd}`)
        bot.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            bot.aliases.set(alias, props);
        }
        if (props.help.category) 
            bot.category.set(props.help.category, props);
        
        if (!props.help.description)
            props.help.description === 'Indefinido.'
    }

    console.log(`Carreguei ${bot.commands.size} comandos!`);
}