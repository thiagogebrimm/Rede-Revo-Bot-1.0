const { MessageEmbed } = require("discord.js")

module.exports.run = async ({ memberDocument, memberQueryDocument }, message, commandData) => {
	if (message.suffix) {
		if (message.suffix === ".") {
			memberQueryDocument.set("afk_message", null);
			message.send(new MessageEmbed()
			.setTitle(`Bem-Vindo de voltaa! 🎊`)
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`));
		} else {
			memberQueryDocument.set("afk_message", message.suffix)
			message.send(new MessageEmbed()
					.setColor(`GREEN`)
					.setDescription(`Tudo bem, agora vou mostrar essa mensagem quando você for mencionado no bate-papo. 👌`)
					.setFooter (`Use "${message.guild.commandPrefix}${commandData.name} ." para remover`)
			);
		}
	} else if (memberDocument.afk_message) {
		message.send(new MessageEmbed()
		.setColor(`BLUE`)
		.setTitle(`Sua autla mensagem de AFK é:`)
		.setDescription(`${memberDocument.afk_message}`)
		.setFooter (`Use "${message.guild.commandPrefix}${commandData.name} <message>" to change it or "${message.guild.commandPrefix}${commandData.name} ." to remove it.`)
);
	} else {
		message.send(new MessageEmbed()
		.setColor(`LIGHT_RED`)
		.setDescription(`You don't have an AFK message set right now! ⌨`)
		.setFooter (`You can set one by using "${message.guild.commandPrefix}${commandData.name} <message>"`)
);
	}
};

    module.exports.help = {
        name: 'afk',
        description: 'Fique AFK.',
        category: 'Utilities'
    }
    
    module.exports.limits = {
        ratelimit: 3,
        cooldown: 6e2
    }
    
    module.exports.requirements = {
        ownerOnly: false
    }