const config = require('../../../config')
const { MessageEmbed } = require('discord.js')
const Sus = require('../../db/Models/FormAjudante')

module.exports = {
    name: 'Aprovar Ajudante',
    aliases: [''],
    category: 'Admin',
    type: 'MESSAGE',
    description: '',
    usage: '',
    permissions: [
        {
            id: '793282674827329557',
            type: 'ROLE',
            permission: true,
        },
    ],
    run: async (client, interaction) => {
        if (interaction.channelId !== config.channels.forms) return await interaction.editReply('Aqui não é o canal correto.')
        if (!interaction.member.roles.cache.has('793282674827329557')) return interaction.editReply("Sem permissão para executar esse comando!")

        const findUser = await Sus.findOne({
            where: {
                messageId: interaction.targetId
            }
        })
        if (!findUser) return await interaction.editReply("Formulário já aprovado/rejeitado ou não existente.")

        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );
        interaction.followUp({
            content: `Formulário aprovad!`
        })

        /**
         * 
         * findUser.messageId - Id da mensagem
         * findUser.messageId2 - Id da mensagem 2
         * findUser.autor - Id do autor da Sugestão
         * 
         */

        const idDiscord = await client.users.fetch(findUser.autor)
        const nick = interaction.guild.members.cache.get(findUser.autor)

        let embeddm = new MessageEmbed()
            .setTitle(`Olá, ${nick.displayName}.`)
            .setDescription(`        
Muito obrigado(a) por seu formulário e pela dedicação e tempo investidos na realização do formulário. Gostamos muito do que você apresentou para nós e ficamos satisfeitos com sua entrega, parabéns!

Desse modo, em breve um membro de nossa equipe irá entrar em contato via discord para conversarmos, te conhecer mais e poder saber melhor sobre seu interesse em participar de nossa equipe.

Estamos ansiosos para conhecê-lo(a). Até breve.            
`)
            .setColor('RANDOM')

        idDiscord.send({ embeds: [embeddm] }).then(async () => {
            await findUser.destroy()
        }).catch(a => { return console.log(`Impossivel mandar mensagens na DM do ${idDiscord.tag}!`) })

        await msg.delete()
        await client.channels.cache.get(config.channels.forms).messages.fetch(findUser.messageId2).then((msg) => msg.delete());
        await client.channels.cache.get(config.channels.forms).messages.fetch(findUser.messageId3).then((msg) => msg.delete());
    }
}