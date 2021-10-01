const Discord = require("discord.js");

module.exports = {
    name: 'expulsar',
    aliases: ['kick'],
    categories: 'Admin',
    description: 'Comando para expulsar um membro.',
    usage: '',
    options: [
        {
            name: "usuario",
            type: "USER",
            description: "Selecione o usuario para expulso!",
            required: true
        },
        {
            name: "motivo",
            type: "STRING",
            description: "Selecione o porque o usuario deve ser expulso!",
            required: true
        },
    ],
    run: async (client, interaction) => {
        const member = interaction.options.get("usuario").member

        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.editReply("Permissões insuficientes!") // caso o membro não possua a permissão 'EXPULSAR_MEMBROS', vamos botar o erro


        if (!member) return interaction.editReply("Digite **/kick (usuário) (motivo)**, caso queira expulsar alguém.") // caso o autor esqueça de mencionar um membro, vamos dar o erro
        if (!member.kickable) return interaction.editReply("Não é possível expulsar esse usuário.")
        let reason = interaction.options.get("motivo")
        if (!reason) reason = "Nenhum motivo fornecido." // caso nao haja, daremos com tal mensagem

        await member.kick({
            reason
        })
        console.log(member.username + " foi expulso")
        let pEmbed = new Discord.MessageEmbed()
            .setTitle(`<:Press_F_Revo:850543446003286017> Nova Punição no Discord`)
            .setDescription(`${member.toString()} foi expulso(a) por ${interaction.member.toString()}.
        Motivo: \`${reason}\``)
            .setColor(`RED`)
        interaction.guild.channels.cache.get(`844251449391448085`).send(pEmbed);

        member.send({
            embeds: [new MessageEmbed()
                .setTitle(`<:Press_F_Revo:850543446003286017>Você não seguiu as regras e foi punido`)
                .setDescription(`Você foi expulso(a) por ${interaction.member.toString()}.
                Motivo: \`${reason}\``)
                .setColor(`RED`)]
        }).catch(a => { return message.channel.send(`Impossivel mandar mensagens na DM deste usuario para notifica-lo!`) });

        interaction.channel.send("Usuário expulso com sucesso!")

    }
}