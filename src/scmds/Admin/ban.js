const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['banir'],
    category: 'Admin',
    description: 'Banir um membro',
    usage: '',
    needPermissions: true,
    permissionsNeeded: ['BAN_MEMBERS'],
    options: [
        {
            name: "membro",
            type: "USER",
            required: true,
            description: "Quem é o meliante que devo banir?"
        },
        {
            name: "motivo",
            type: "STRING",
            required: true,
            description: "Motivo do meliante ser banido?"
        }
    ],
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(['BAN_MEMBERS'])) return;
        const member = interaction.options.getMember("membro", true)
        if (!member) {
            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setDescription(`Você deve mencionar um membro válido.`)
                    .setColor(`RED`)]
            })

        } else {
            let reason = interaction.options.get("motivo")?.value
            if (!reason) reason = 'Nenhum motivo especificado.'
            else {
                reason = args.slice(1).join(' ');
            }

            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`\`${member.user.username.toString()}\` foi banido!`)]
            });


            if (member.user.id !== interaction.user.id) {
                if (member.bannable) {
                    const { guild } = interaction;

                    await member.user.send({
                        embeds: [new MessageEmbed()
                            .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                            .setDescription(`Você foi banido(a) por ${interaction.member.toString()}.
                           Motivo: \`${reason}\``)
                            .setColor(`RED`)]
                    }).catch(a => { return interaction.channel.send(`Impossivel mandar mensagens na DM deste usuario para notifica-lo!`) });

                    await interaction.guild.channels.cache.find(x => x.id === '849452824970264626')?.send({
                        embeds: [new MessageEmbed()
                            .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                            .setDescription(`\`${member.user.tag.toString()}\` foi banido(a) por ${interaction.member.toString()}.
                           Motivo: \`${reason}\``)
                            .setColor(`RED`)]
                    });

                    await member.ban({ reason: reason })


                } else return interaction.editReply("Não foi possivel banir o usuario.")
            }
        }

    }
}