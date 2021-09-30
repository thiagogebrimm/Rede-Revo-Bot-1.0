const { token, prefix, prefix2 } = require('./config');
const { Client, Collection } = require('discord.js');

const bot = new Client({
    intents: ["GUILD_VOICE_STATES", "GUILDS", "GUILD_BANS", "GUILD_PRESENCES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGES"], ws: {
    }
});


bot.prefix = prefix;
bot.prefix2 = prefix2;
bot.slashCommands = new Collection();
bot.limits = new Map();

const events = require('./src/func/Event');
events.run(bot);
bot.login(token);