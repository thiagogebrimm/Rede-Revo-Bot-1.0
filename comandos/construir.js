const { MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    message.delete({ timeout: 5 * 1000 });
    if (!message.member.permissions.has(['MANAGE_MESSAGES'])) return;
     const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      message.channel.send( new MessageEmbed()
        .setDescription(`Você deve mencionar um builder válido.`)
        .setColor(`RED`)
    );
    } else {
        let data = args[1]
        if (!data) data = 'Não foi definido uma data.'

        if (!data.endsWith("d") && !data.endsWith("h") && !data.endsWith("m")) return message.channel.send(
            `Você não usou a forma correta para a hora, Use apenas letras minusculas. Exemplo: 1m, 1h, 1d`
            );
            
        if (isNaN(data[0])) return message.channel.send(`Isso não é um número!`);

        let tarefa = args.slice(2).join(" ");
        if (!tarefa) return message.channel.send( new MessageEmbed()
        .setDescription(`Você deve dizer uma construção.`)
        .setColor(`RED`));

        message.channel.send(new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Construção solicitada!`)
        );

        let TarefaEmbed = new MessageEmbed()
        .setTitle(`Nova Construção designada para você`)
        .setAuthor(`Solicitado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail('https://i.imgur.com/oKZBqno.png')
        .setDescription(`${tarefa}`)
        .setFooter(`Construir até:`, message.guild.iconURL( {dynamic: true} ))
        .setTimestamp(Date.now() + ms(args[1]))
        .setColor(`#FF4500`);

        let button = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Marcar como concluida')
        .setID('delete2');

        const msg = await message.guild.channels.cache.find(x => x.id === '845838609164533802').send(`${member}`, {
            button: button,
            embed: TarefaEmbed
            })
        member.send(msg.url, { embed: TarefaEmbed})
    }
        
}

module.exports.help = {
    name: 'construir',
    aliases: ['builder'],
    category: 'Moderation',
    description: 'Comando utilizado para criar tarefas para a staff.'
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 3e2
}

module.exports.requirements = {
    ownerOnly: false
}