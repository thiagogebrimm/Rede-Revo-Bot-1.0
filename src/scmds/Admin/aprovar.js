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
        if (!interaction.member.roles.cache.has('793282674827329557')) return interaction.editReply("Sem permissão para executar esse comando!")

        const findUser = await Sus.findOne({
            where: {
                messageId: interaction.targetId,
                resolved: false
            }
        })
        if (!findUser) return await interaction.editReply("Sugestão já aprovada/negada ou não existente.")

        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );
        interaction.followUp({
            content: `Aprovado!`
        })

        findUser.update({
            resolved: true
        })

        /**
         * 
         * findUser.messageId - Id da mensagem
         * findUser.autor - Id do autor da Sugestão
         * findUser.pergunta01 - Sugestão
         * findUser.pergunta02 - Motivo de adicionarmos
         * 
         */

        const susebao = client.users.cache.get(findUser.autor)

        let embeddm = new MessageEmbed()
            .setTitle(`<:SIM_Revo:893295026325581854> Sua sugestão foi aprovada <:SIM_Revo:893295026325581854>`)
            .setDescription(`
▫️ Sugestão aprovada: \`\`\`${findUser.pergunta01}\`\`\`
Motivo para implementar: \`${findUser.pergunta02}\`

💭 **Agradecemos sua sugestão, e após a cuidadosa análise por parte da nossa equipe, ela foi aprovada.**
             `)
            .setColor('GREEN')
        let embedchat = new MessageEmbed()
            .setTitle(`<:SIM_Revo:893295026325581854> Sugestão Aprovada <:SIM_Revo:893295026325581854>`)
            .setDescription(`
**Sugestão feita por** ${susebao.tag}
            
▫️ Sugestão aprovada: \`\`\`${findUser.pergunta01}\`\`\`
Motivo para implementar: \`${findUser.pergunta02}\`
            `)
            .setColor('GREEN')

        susebao.send({ embeds: [embeddm] }).catch(a => { return console.log(`Impossivel mandar mensagens na DM do ${susebao.tag}!`) })

        interaction.guild.channels.cache.find(x => x.id === '893370707466149898').send({ embeds: [embedchat] }).then(f => {
            findUser.update({
                messageId: f.id
            })
        })
        msg.delete()
    }
}