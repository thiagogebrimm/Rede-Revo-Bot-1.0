const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: ['mutar'],
    category: 'Admin',
    description: 'Muta um membro',
    usage: '',
    options: [
        {
            name: "membro",
            required: true,
            description: "Quem vai ser mutado?",
            type: 'USER'
        },
        {
            name: "tempo",
            required: true,
            description: "Qual o tempo do mute?",
            type: 'STRING'
        }
    ],

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(['MANAGE_MESSAGES'])) return;
        const member = interaction.options.getMember("membro")
        if (!member) {
            interaction.channel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Você deve mencionar um membro válido.`)
                    .setColor(`RED`)]
            })
        } else {
            if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.owner.id) return;

            let time = interaction.options.getString("tempo");
            if (!time || isNaN(ms(args[1]))) return interaction.channel.send(new MessageEmbed()
                .setDescription(`Você deve dizer um tempo válido (s, m, d ou h)`)
                .setColor(`36393e`)
            )

            interaction.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`${member.user.username.toString()} foi punido!`)]
            });

            let reason = args.slice(2).join(' ')
            if (!reason) reason === 'Nenhum motivo aparente.'
            interaction.guild.channels.cache.find(x => x.id === '849452824970264626').send(new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                .setDescription(`${member.toString()} foi silenciado(a) por ${interaction.member.toString()}.\nMotivo: \`${reason}\`\nDuração: \`${time}\``)
                .setColor(`RED`)
            );

            member.roles.add('847830245851660290');

            member.send({
                embeds: [new MessageEmbed()
                    .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                    .setDescription(`Você foi silenciado(a) por ${interaction.member.toString()}.\nMotivo: \`${reason}\`\nDuração: \`${time}\``)
                    .setColor(`RED`)]
            });

            setTimeout(async () => {
                member.roles.remove('847830245851660290');
            }, ms(time));
        }
    }
}