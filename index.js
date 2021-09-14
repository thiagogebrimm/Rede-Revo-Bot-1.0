const { token, prefix, prefix2 } = require('./config');
const { Client, Collection } = require('discord.js');

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

require('discord-buttons')(bot);
require('discord-reply');
bot.prefix = prefix;
bot.prefix2 = prefix2;
bot.commands = new Collection();
bot.limits = new Map();
bot.aliases = new Collection();
bot.category = new Collection();

const commands = require('./func/Command');
commands.run(bot);

const events = require('./func/Event');
events.run(bot);
bot.login(token);