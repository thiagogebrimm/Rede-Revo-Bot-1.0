const { MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');

module.exports.run = async (bot, message, args) => {

    message.delete({ timeout: 5 * 1000 }).catch(O_o=>{});

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Leia as regras e evite punições`, 'https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif')
        .setColor(`#FF0000`);

        let button = new disbut.MessageButton()
        .setStyle('url')
        .setURL('https://rederevo.gitbook.io/wiki/regras-1') 
        .setLabel('Acessar as regras');
        
        message.channel.send({
            button: button,
            embed: TarefaEmbed
            })
}

module.exports.help = {
    name: 'regras',
    aliases: [],
    category: 'Utilities',
    description: 'Comando utilizado para mostrar as regras.'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 3e2
}

module.exports.requirements = {
    ownerOnly: false
}