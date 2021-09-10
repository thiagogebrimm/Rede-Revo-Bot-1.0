const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (message.member.permissions.has(['MANAGE_MESSAGES'])) {
		let amount = args[0];
		if(!amount || isNaN(amount) || amount < 1){
            message.channel.send(new MessageEmbed()
                .setDescription(`Você deve utilizar \`/limpar [ 2 | 100 ]\` para limpar o chat.`)
                .setColor(`RED`)
            )
        } else {
            try {
                let messages = await message.channel.messages.fetch({limit:amount});
                messages = messages.array();
                message.channel.bulkDelete(messages, true);
                message.channel.send(new MessageEmbed()
                    .setDescription(`aVocê teve êxito em apagar **${amount}** mensagens neste canal.`)
                    .setColor(`GREEN`)
                )
            } catch (e) {
                message.channel.send(new MessageEmbed()
                    .setDescription(`Erro ao tentar apagar as mensagens neste canal.`)
                    .setColor(`RED`)
                )
                console.error(e);
            }
        }
    } else {
        return;
    }
}

module.exports.help = {
    name: 'clear',
    description: 'Apaga uma quantidade de mensagens do chat.',
    aliases: ['limpar'],
    category: 'Moderation'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    cooldown: 6e4,
    rateLimit: 3
}