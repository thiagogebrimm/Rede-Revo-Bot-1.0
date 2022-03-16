const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: ['mutar'],
    category: 'Admin',
    description: 'Coloca um membro de castigo',
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

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(['MANAGE_MESSAGES'])) return interaction.editReply("Sem permissão para executar esse comando!");
        
        const user = interaction.options.getUser("membro");
        const tempo = interaction.options.getString("tempo");
        const reason = interaction.options.getString("motivo");
        const member = interaction.guild.members.cache.get(user.id);

        const timeInMs = ms(tempo)
        if (!timeInMs) return interaction.followUp({
            embeds: [new MessageEmbed()
                .setDescription(`Você deve dizer um tempo válido (s, m, d ou h)`)
                .setColor(`36393e`)]
        })

        member.timeout(timeInMs, reason)
        interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`${member.displayName.toString()} foi punido!`)]
        });

        interaction.guild.channels.cache.find(x => x.id === '849452824970264626').send({
            embeds: [new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                .setDescription(`
\`${member.displayName.toString()}\` foi silenciado(a) por ${interaction.member.toString()}.
Motivo: \`${reason}\`
Duração: \`${tempo}\``)
                .setColor(`RED`)]
        });

        member.send({
            embeds: [new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                .setDescription(`
Você foi silenciado(a) por ${interaction.member.toString()}.
Motivo: \`${reason}\`
Duração: \`${tempo}\``)
                .setColor(`RED`)]
        }).catch(a => { return message.channel.send(`Impossivel mandar mensagens na DM deste usuario para notifica-lo!`) });
    }
}