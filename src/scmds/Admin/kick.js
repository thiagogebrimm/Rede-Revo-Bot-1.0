const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    aliases: ['expulsar'],
    categories: 'Admin',
    description: 'Comando para expulsar um membro.',
    usage: '',
    options: [
        {
            name: "membro",
            type: "USER",
            description: "Selecione o membro que será expulso!",
            required: true
        },
        {
            name: "motivo",
            type: "STRING",
            description: "Diga o porque o membro deve ser expulso!",
            required: true
        },
    ],
    run: async (client, interaction) => {
        const member = interaction.options.get("membro").member

        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.editReply("Sem permissão para executar esse comando!") // caso o membro não possua a permissão 'EXPULSAR_MEMBROS', vamos botar o erro


        if (!member) return interaction.editReply("Digite **/kick (usuário) (motivo)**, caso queira expulsar alguém.") // caso o autor esqueça de mencionar um membro, vamos dar o erro
        if (!member.kickable) return interaction.editReply("Não é possível expulsar esse usuário.")
        let reason = interaction.options.getString("motivo")
        if (!reason) reason = "Nenhum motivo fornecido." // caso nao haja, daremos com tal mensagem

        interaction.guild.channels.cache.find(x => x.id === '849452824970264626').send({
            embeds: [new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
                .setDescription(`\`${member.user.tag.toString()}\` foi expulso(a) por ${interaction.member.toString()}.
            Motivo: \`${reason}\``)
                .setColor(`RED`)]
        });
        await member.send({
            embeds: [new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                .setDescription(`Você foi expulso(a) por ${interaction.member.toString()}.
                Motivo: \`${reason}\``)
                .setColor(`RED`)]
        }).catch(a => { return interaction.channel.send(`Impossivel mandar mensagens na DM deste usuario para notifica-lo!`) });

        await member.kick({
            reason
        })

        interaction.editReply({
            embeds: [new MessageEmbed()
                .setColor(`RED`)
                .setDescription(`\`${member.user.username.toString()}\` foi expulso!`)]
        });

    }
}