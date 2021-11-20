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
        },
        {
            name: "motivo",
            required: true,
            description: "Por que esse membro vai ser mutado?",
            type: 'STRING'
        }
    ],

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(['MANAGE_MESSAGES'])) return interaction.editReply("Sem permissão para executar esse comando!");
        const member = interaction.options.getMember("membro")
        if (!member) {
            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setDescription(`Você deve mencionar um membro válido.`)
                    .setColor(`RED`)]
            })
        } else {
            if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.owner.id) return;

            let time = interaction.options.getString("tempo");
            if (!time || isNaN(ms(args[1]))) return interaction.editReply({
                embeds: [new MessageEmbed()
                    .setDescription(`Você deve dizer um tempo válido (s, m, d ou h)`)
                    .setColor(`36393e`)]
            })

            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`${member.displayName.toString()} foi punido!`)]
            });

            let reason = interaction.options.getString("motivo");
            if (!reason) reason === 'Nenhum motivo aparente.'
            interaction.guild.channels.cache.find(x => x.id === '849452824970264626').send({
                embeds: [new MessageEmbed()
                    .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                    .setDescription(`\`${member.displayName.toString()}\` foi silenciado(a) por ${interaction.member.toString()}.
                Motivo: \`${reason}\`
                Duração: \`${time}\``)
                    .setColor(`RED`)]
            });

            member.roles.add('847830245851660290');

            member.send({
                embeds: [new MessageEmbed()
                    .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                    .setDescription(`Você foi silenciado(a) por ${interaction.member.toString()}.
                    Motivo: \`${reason}\`
                    Duração: \`${time}\``)
                    .setColor(`RED`)]
            }).catch(a => { return message.channel.send(`Impossivel mandar mensagens na DM deste usuario para notifica-lo!`) });

            setTimeout(async () => {
                member.roles.remove('847830245851660290');
            }, ms(time));
        }
    }
}