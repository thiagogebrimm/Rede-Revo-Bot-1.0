module.exports.help = {
    name: 'evnto',
    category: 'Moderation',
    description: 'Comando agendar um evento.'
}
module.exports.limits = {
    rateLimit: 3,
    cooldown: 1e2
}

module.exports.requirements = {
    ownerOnly: false,
}

const Eventos = require("../db/Models/Eventos")
const Discord = require("discord.js")

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */

module.exports.run = async (client, message) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sem permissão :(")
    var b;
    if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
    await message.author.createDM();
    message.author.send(new Discord.MessageEmbed()
        .setDescription(`Qual evento vai ser agendado?`)
        .setColor(`36393e`)
    ).catch(() => { b = false });  
    b = true;
    if (b) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Instruções enviadas em seu privado.`)
            .setColor(`GREEN`)
        ).then(i => i.delete({ timeout: 5 * 1000 }))
        message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
        .on('collect', m1 => {
            let r1 = m1.content;
                    message.author.send(new Discord.MessageEmbed()
                    .setColor(`36393e`)
                    .setTitle(`Data?`)
                    .setDescription(`Mande a data que o evento ocorrerá Exemplo: 13/09`)
                ).then(async msg => {
                    msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
                    .on('collect', m2 => {
                        let r2 = m2.content;
                        message.author.send(new Discord.MessageEmbed()
                        .setColor(`36393e`)
                        .setTitle(`Data?`)
                        .setDescription(`Mande a hora que o evento ocorrerá Exemplo: 12:46`)
                    ).then(async msg => {
                        msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
                        .on('collect', async m2 => {
                            let r23 = m2.content;
                            m2.reply("Sucesso!")

                            await Eventos.create({
                                evento: r1,
                                dia: r2.split("/")[0],
                                mes: r2.split("/")[1],
                                hora: r23.split(":")[0],
                                min: r23.split(":")[1],
                                authorId: message.author.id
                            })
                            client.emit("ready", client)
                    })
                    })
                })
            })
            })
    }
}
