const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.member.roles.cache.has("855568510637178880")) {
        let role = message.guild.roles.cache.find(r => r.id === "855568510637178880");
        message.member.roles.remove(role);
		message.channel.send(new MessageEmbed()
		.setColor(`228B22`)
		.setDescription(`Cargo removido!`)
		)
	     
	   } 
	else {
	let role = message.guild.roles.cache.find(r => r.id === "855568510637178880");
	// Or add it to yourself
	message.member.roles.add(role);

	message.channel.send(new MessageEmbed()
	.setColor(`228B22`)
	.setDescription(`Cargo setado!`)
	)
   }
}

    module.exports.help = {
        name: 'gartic',
        description: 'Receba o cargo do gartic.', 
        category: 'Utilities'
    }
    
    module.exports.limits = {
        ratelimit: 3,
        cooldown: 6e2
    }
    
    module.exports.requirements = {
        ownerOnly: false
    }