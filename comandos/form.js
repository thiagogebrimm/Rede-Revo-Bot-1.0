const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    let link = db.get(`${message.guild.id}-form.link`);
    if (link === null) link === 'https://forms.gle/Wj1WZVCBCcN6khUM7';

    if (!args[0]) {
        message.channel.send(new MessageEmbed()
            .setAuthor(`FORMULARIO EXCLUSIVO`, `https://cdn.discordapp.com/attachments/758923209264857091/760650649142165514/book.gif`)
            .setDescription(`Clique [aqui](${link}) para ser redirecionado ao formulário participativo da equipe.`)
            .setColor(`36393e`)
            .setFooter(`Solicitado por ${message.member.user.username}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp(Date.now())
        )
    } else {
        if (args[0] === 'link') {
            if (message.member.permissions.has(['MANAGE_MESSAGES'])) {
                if (args[1]) {
                    if (!args[1].startsWith('https://')) args[1] === `https://${args[1]}`
                    db.set(`${message.guild.id}-form.link`, `${args[1]}`)
                    message.channel.createWebhook('Hyperlink', {
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5SlvhZgRblaNO5llFAwNxWJtawoGS3Y880A&usqp=CAU',
                    })
                        .then(webhook => {
                            webhook.send(`O [link do formulário](${args[1]}) foi definido com êxito.`)
                        })
                        .catch(console.error);
                }
            }
        }
    }
}

module.exports.help = {
    name: 'form',
    category: 'Utilities',
    description: 'Retorna o link do formulário por meio de um texto clicável.'
}

module.exports.limits = {
    rateLimit: 3,
    cooldown: 1e2
}

module.exports.requirements = {
    ownerOnly: false,
}