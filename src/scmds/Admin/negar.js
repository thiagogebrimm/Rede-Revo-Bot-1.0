const config = require('../../../config')
const { MessageEmbed } = require('discord.js')
const Sus = require('../../db/Models/Sugestao')

module.exports = {
    name: 'Negar Sugestão',
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
                messageId: interaction.targetId
            }
        })
        if (!findUser) return await interaction.editReply("Sugestão já aprovada/negada ou não existente.")

        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );
        interaction.followUp({
            content: `Negado!`
        })

        /**
         * 
         * findUser.messageId - Id da mensagem
         * findUser.autor - Id do autor da Sugestão
         * findUser.pergunta01 - Sugestão
         * findUser.pergunta02 - Motivo de adicionarmos
         * findUser.pergunta03 - Como afetará na jogabilidade
         * 
         */

        const idDiscord = await client.users.fetch(findUser.autor)
        const nick = interaction.guild.members.cache.get(findUser.autor)

        let embeddm = new MessageEmbed()
            .setTitle(`<:NAO_Revo:893295026203918358> Sua sugestão foi negada <:NAO_Revo:893295026203918358>`)
            .setDescription(`        
▫️ __**Sugestão negada:**__ \`\`\`${findUser.pergunta01}\`\`\`
__**Motivo para implementar:**__ \`${findUser.pergunta02}\`
__**Como afetará na jogabilidade:**__ \`${findUser.pergunta03}\`

💭 **Agradecemos sua sugestão, e após a cuidadosa análise por parte da nossa equipe, ela foi negada.**
             `)
            .setColor('RED')
        let embedchat = new MessageEmbed()
            .setTitle(`<:NAO_Revo:893295026203918358> Sugestão Negada <:NAO_Revo:893295026203918358>`)
            .setDescription(`
**Sugestão feita por** __${nick ? nick.displayName : '<@' + findUser.autor + '>'}__
            
▫️ __**Sugestão negada:**__ \`\`\`${findUser.pergunta01}\`\`\`
__**Motivo para implementar:**__ \`${findUser.pergunta02}\`
__**Como afetará na jogabilidade:**__ \`${findUser.pergunta03}\`
            `)
            .setColor('RED')

        idDiscord.send({ embeds: [embeddm] }).then(async () => {
            await findUser.destroy()
        }).catch(a => { return console.log(`Impossivel mandar mensagens na DM do ${idDiscord.tag}!`) })

        interaction.guild.channels.cache.find(x => x.id === '893370741611974656').send({ embeds: [embedchat] })
        msg.delete()
    }
}