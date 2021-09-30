const { Client } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
// const L = require('../db/Models/LicenceTable')
/**
 * @param {Client} client
*/
module.exports.run = async (client) => {
  // slashcommands start
  const slashCommands = await globPromise(
`${process.cwd()}/src/scmds/**/*.js`
);
  
const arrayofslashCommands = [];
  
slashCommands.map((value) => {
const file = require(value);
if (!file?.name) return;
client.slashCommands.set(file.name, file);
arrayofslashCommands.push(file);
});
client.guilds.cache.map(async f => {
/**      const findS = await L.findOne({
where: {
grupo: f.id
}
})
if(!findS) return;
*/
await client.guilds.cache.get(f.id).commands.set(arrayofslashCommands);
})
};