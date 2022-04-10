const { Client } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const AsciiTable = require("ascii-table");
var table = new AsciiTable('Comandos');

module.exports.run = async (client) => {

  table.setHeading('Nome', 'Categoria', 'Alias', 'Comando original', 'Ativo')

  const slashCommands = await globPromise(
    `${process.cwd()}/src/scmds/**/*.js`
  );

  const arrayofslashCommands = [];

  slashCommands.map((value) => {
    const file = require(value);
    if (!file.name) return;
    table.addRow(file.name, file.category ? file.category : 'Nenhum', 'Não', 'Nenhum', 'Sim')
    client.slashCommands.set(file.name, file);
    if (file.aliases && file.aliases[0]) {
      file.aliases.map(f => {
        client.slashCommands.set(f, file);
        arrayofslashCommands.push({
          ...file,
          name: f,
          aliases: []
        });
        table.addRow(f, file.category ? file.category : 'Nenhum', 'Sim', file.name, 'Sim')
      })
    }
    arrayofslashCommands.push(file);
  });

  client.guilds.cache.forEach(async f => {

      try {
        await client.guilds.cache.get(f.id).commands.set(arrayofslashCommands)
      } catch (error) {
        console.log(error.message + ' on ' + f.id)
      }
  })
  console.log(table.toString())
};