const { token } = require('./token.json');
const { Client, Collection } = require('discord.js');
const simpl = require("simpl.db")
const stardb = simpl({
    autoSave: true,
    dataFile: './starboard.json'
})
const bot = new Client({
    intents: ["GUILD_VOICE_STATES", "GUILDS", "GUILD_BANS", "GUILD_PRESENCES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGES"], ws: {
    }
});

bot.stardb = stardb

bot.slashCommands = new Collection();
bot.limits = new Map();

const events = require('./src/func/Event');
events.run(bot);
bot.login(token);