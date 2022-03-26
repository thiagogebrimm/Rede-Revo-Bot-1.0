const config = require('../../../config')
const { MessageEmbed } = require('discord.js')
const Sus = require('../../db/Models/FormAjudante')

module.exports = {
    name: 'Rejeitar Ajudante',
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
            content: `Formulário rejeitado!`
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
            .setTitle(`Olá, ${nick ? nick.displayName: '<@' + findUser.autor + '>'}. Tudo bem?`)
            .setDescription(`        
Antes de qualquer coisa, queremos muito te agradecer pelo interesse em integrar a nossa equipe, pela dedicação e tempo investidos na realização do formulário.

Estamos entrando em contato com você para te dar uma resposta sobre o formulário que você nos enviou.

Depois de uma avaliação detalhada, entendemos que, neste momento, a entrega não se alinha inteiramente às nossas expectativas em relação à vaga. Por conta disso, não vamos seguir com a próxima etapa.

Eu sei que a notícia que estamos te trazendo é bem chata. Ainda assim, esperamos que o desafio possa, de alguma forma, contribuir para o seu desenvolvimento profissional. Desejamos sucesso na sua busca.

Abraços e, novamente agradecemos por seu formulário.             
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