const { MessageEmbed } = require('discord.js')
const config = require('../../../config')

const Sus = require('../../db/Models/Sugestao')

module.exports = {
    name: 'Aprovar Sugestão',
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
        if (interaction.channelId !== config.channels.sugestao) return await interaction.editReply('Aqui não é o canal correto.')
        if (!interaction.member.roles.cache.has('793282674827329557')) return interaction.editReply('Sem permissão')

        const findUser = await Sus.findOne({
            where: {
                messageId: interaction.targetId
            }
        })
        if (!findUser) return await interaction.editReply("Sugestão já aprovada ou não existente.")

        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );
        let votosP = (await msg.fetch(true)).reactions.cache.get('893295026325581854').count
        votosP = (votosP - 1);
        let votosN = (await msg.fetch(true)).reactions.cache.get('893295026203918358').count
        votosN = (votosN - 1);
        interaction.followUp({
            content: `Aprovado!`
        })

        findUser.update({
            votosPositivo: votosP,
            votosNegativo: votosN
        })

        /**
         * 
         * findUser.messageId - Id da mensagem
         * findUser.autor - Id do autor da Sugestão
         * findUser.pergunta01 - Sugestão
         * findUser.pergunta02 - Motivo de adicionarmos
         * findUser.votosPositivo - Votos positivos
         * findUser.votosNegativo - Votos Negativos
         * 
         */

        const susebao = client.users.cache.get(findUser.autor)

        let embeddm = new MessageEmbed()
            .setTitle(`<:SIM_Revo:893295026325581854> Sua sugestão foi aprovada <:SIM_Revo:893295026325581854>`)
            .setDescription(`
             
             **Sugestão aprovada**: \`${findUser.pergunta01}\`.
             **Motivo para implementar**: \`${findUser.pergunta02}\`.
             `)
            .addFields(
                { name: '<:SIM_Revo:893295026325581854> Votos Positivos', value: `${findUser.votosPositivo}`, inline: true },
                { name: '<:NAO_Revo:893295026203918358> Votos Negativos', value: `${findUser.votosNegativo}`, inline: true },
            )

        let embedchat = new MessageEmbed()
            .setTitle(`<:SIM_Revo:893295026325581854> Sugestão Aprovada <:SIM_Revo:893295026325581854>`)
            .setDescription(`
            **Sugestão feita por** ${susebao.tag}
            
            **Sugestão aprovada**: \`${findUser.pergunta01}\`
            **Motivo para implementar**: \`${findUser.pergunta02}\`
            `)
            .addFields(
                { name: '<:SIM_Revo:893295026325581854> Votos Positivos', value: `${findUser.votosPositivo}`, inline: true },
                { name: '<:NAO_Revo:893295026203918358> Votos Negativos', value: `${findUser.votosNegativo}`, inline: true },
            )

        susebao.send({ embeds: [embeddm] }).then(async () => {
            await findUser.destroy()
        }).catch(a => {return console.log(`Impossivel mandar mensagens na DM do ${susebao.tag}!`)})

        interaction.guild.channels.cache.find(x => x.id === '893370707466149898').send({ embeds: [embedchat] })

    }
}