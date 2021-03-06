const { MessageEmbed } = require('discord.js');
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
        if (interaction.channelId !== '893370707466149898') return await interaction.editReply('Aqui não é o canal correto.')
        if (!interaction.member.roles.cache.has('793282674827329557')) return interaction.editReply("Sem permissão para executar esse comando!")

        const findUser = await Sus.findOne({
            where: {
                messageId: interaction.targetId,
                resolved: true
            }
        })
        if (!findUser) return await interaction.editReply("Sugestão não aprovada ou não existente.")

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
         * findUser.pergunta03 - Como afetará na jogabilidade
         * findUser.pergunta04 - Quem vai ser beneficiado
         * 
         */

        const idDiscord = client.users.cache.get(findUser.autor)
        const nick = interaction.guild.members.cache.get(findUser.autor)

        let embeddm = new MessageEmbed()
            .setTitle(`<a:Check_Revo:845556618837098506> Sua sugestão foi implementada <a:Check_Revo:845556618837098506>`)
            .setDescription(`
▫️ __**Sugestão implementada:**__ \`\`\`${findUser.pergunta01}\`\`\`
__**Motivo para implementar:**__ \`${findUser.pergunta02}\`
             `)
            .addField('Como afetará na jogabilidade?', `\`${findUser.pergunta03}\``, false)
            .addField('Quem será beneficiado?', `\`${findUser.pergunta04}\``, false)
            .setColor(`#001EBE`)

        let embedchat = new MessageEmbed()
            .setTitle(`<a:Check_Revo:845556618837098506> Sugestão Implementada <a:Check_Revo:845556618837098506>`)
            .setDescription(`
**Sugestão feita por** __${nick.displayName}__
            
▫️ __**Sugestão implementada:**__ \`\`\`${findUser.pergunta01}\`\`\`
__**Motivo para implementar:**__ \`${findUser.pergunta02}\`
            `)
            .addField('Como afetará na jogabilidade?', `\`${findUser.pergunta03}\``, false)
            .addField('Quem será beneficiado?', `\`${findUser.pergunta04}\``, false)
            .setColor(`#001EBE`)

        idDiscord.send({ embeds: [embeddm] }).then(async () => {
            await findUser.destroy()
        }).catch(a => { return console.log(`Impossivel mandar mensagens na DM do ${idDiscord.tag}!`) })

        interaction.guild.channels.cache.find(x => x.id === '893370899905003520').send({ embeds: [embedchat] })
        msg.delete()
    }
}