const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    if (!db.get(`${message.guild.id}-tickets`)) {
        if (message.member.permissions.has('MANAGE_MESSAGES', { checkAdmin: false, checkOwner: false })) {
            let canal = message.mentions.channels.first();
            if (!canal) canal = message.channel;
            const embed = new MessageEmbed()
                .setColor(`36393e`)
                .setTitle(`🎟️ Atendimento - Rede Revo`)
                .setDescription(`<:Help_Revo:849393026961899520> » Reaja com o emoji paralelamente a área que você identifica a ser mais correspondente ao seu problema.\n
                🛒 | **Problemas com compras em nossa loja.**
                👨‍⚖️ | **Reportar infratores.**
                ❓ | **Dúvidas relacionadas a network..**
                🚀 | **Reporte de bugs relacionados a network..**\n
                🔧 | **Outros assuntos.**
                `)
                .setImage(`https://cdn.discordapp.com/attachments/759299641186582538/760026572413206538/Atendimento.png`)
            canal.send(embed).then(async msg => {
                await msg.react('🛒') && await msg.react('👨‍⚖️') && await msg.react('❓')
                    && await msg.react('🚀') && await msg.react('🔧')
                db.set(`${message.guild.id}-tickets`, msg.id);
            });
        }
    } else {
        if (args[0]) {
            if (args[0] === 'deletar') {
                db.delete(`${message.guild.id}-tickets`)
                message.channel.send(`O ticket foi apagado do banco de dados, porém, você ainda deverá apagar a mensagem.`);
            } else if (args[0] === 'fechar') {
                if (message.channel.name.includes(`-ticket`)) {
                    message.channel.delete();
                }
            }
        } else {
            message.channel.send(`Já existe um canal de ticket.`)
        }
    }
}

module.exports.help = {
    name: 'ticket',
    description: 'Cria um novo ticket no canal em vigor.',
    aliases: [''],
    category: 'Moderation'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 6e4
}