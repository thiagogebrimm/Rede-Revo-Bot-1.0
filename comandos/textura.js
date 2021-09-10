const { MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');

module.exports.run = async (bot, message) => {

    message.delete({ timeout: 5 * 1000 }).catch(O_o=>{});

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Baixe a textura oficial do servidor para ter uma melhor jogabilidade.`, 'https://i.imgur.com/dMswI7f.png')
        .setColor(`#FF0000`);

        let button = new disbut.MessageButton()
        .setStyle('url')
        .setURL('https://www.planetminecraft.com/texture-pack/revo-pack-beta-1-0/') 
        .setLabel('Baixar a textura');
        
        message.channel.send({
            button: button,
            embed: TarefaEmbed
            })
}

module.exports.help = {
    name: 'textura',
    aliases: ['text'],
    category: 'Utilities',
    description: 'Comando utilizado para mostrar o link de download da textura.'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 3e2
}

module.exports.requirements = {
    ownerOnly: false
}