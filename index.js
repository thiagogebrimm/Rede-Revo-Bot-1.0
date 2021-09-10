const { token, prefix, prefix2 } = require('./config');
const { Client, Collection, MessageEmbed } = require('discord.js');

const bot = new Client({
    disableMentions: 'everyone',
    partials: ['CHANNEL', 'REACTION', 'MESSAGE', 'USER', 'GUILD_MEMBER']
})

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