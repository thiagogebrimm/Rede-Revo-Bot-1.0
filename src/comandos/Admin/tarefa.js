const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    message.delete({ timeout: 5 * 1000 });
    if (!message.member.permissions.has(['MANAGE_MESSAGES'])) return message.channel.send('Apenas membros da equipe podem utilizar esté comando.');
     const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      message.channel.send( new MessageEmbed()
        .setDescription(`Você deve mencionar um staff válido.`)
        .setColor(`RED`)
    );
    } else {
        let tarefa;
        if (!args[1]) tarefa = 'Nenhuma tarefa especificada.'
        else {
            tarefa = args.slice(1).join(' ');
        }

        message.channel.send(new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Tarefa adicionada!`)
        );
        

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`Solicitado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`Nova Tarefa designada para você`)
        .setDescription(`${tarefa}`)
        .setFooter(`Prioridade: EM BREVE`, message.guild.iconURL( {dynamic: true} ))
        .setColor(`#0000FF`);

        let button = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Marcar como concluida')
        .setID('delete');

        const msg = await message.guild.channels.cache.find(x => x.id === '845490562290810891').send(`${member}`, {
            button: button,
            embed: TarefaEmbed
            })
        member.send(msg.url, { embed: TarefaEmbed})
    }
        
}

module.exports.help = {
    name: 'tarefa',
    aliases: [],
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