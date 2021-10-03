const { MessageEmbed } = require('discord.js');

const config = require('../../../config')

const Sus = require('../../db/Models/Sugestao')

module.exports = {
    name: 'Implementar Sugestão',
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
        if (interaction.channelId !== '893293613851758603') return await interaction.editReply('Aqui não é o canal correto.')
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

        interaction.followUp({
            content: `Implementado!`
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
            .setTitle(`<a:Check_Revo:845556618837098506> Sua sugestão foi implementada <a:Check_Revo:845556618837098506>`)
            .setDescription(`
             
             ▫️ Sugestão implementada: \`\`\`${findUser.pergunta01}\`\`\`
             Motivo para implementar: \`${findUser.pergunta02}\`
             `)

        let embedchat = new MessageEmbed()
            .setTitle(`<a:Check_Revo:845556618837098506> Sugestão Implementada <a:Check_Revo:845556618837098506>`)
            .setDescription(`
            **Sugestão feita por** ${susebao.tag}
            
            ▫️ Sugestão implementada: \`\`\`${findUser.pergunta01}\`\`\`
            Motivo para implementar: \`${findUser.pergunta02}\`
            `)

        susebao.send({ embeds: [embeddm] }).then(async () => {
            await findUser.destroy()
            msg.delete()
        }).catch(a => { return console.log(`Impossivel mandar mensagens na DM do ${susebao.tag}!`) })

        interaction.guild.channels.cache.find(x => x.id === '893370899905003520').send({ embeds: [embedchat] })

    }
}