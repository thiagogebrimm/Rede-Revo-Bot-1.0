
module.exports = {
  name: 'ping',
  aliases: [''],
  category: 'Utilidades',
  description: 'Verifica a latencia do database e da API',
  usage: '',

  run: async (client, interaction) => {
    interaction.editReply(`🏓Ping Revo: \`${Date.now() - interaction.createdTimestamp}ms\`. \n🏓Ping API: \`${Math.round(client.ws.ping)}ms\`.`);
  }
}