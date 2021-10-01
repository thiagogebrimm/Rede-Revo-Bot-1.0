const config = require('../../../config')

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

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
     run: async(client, interaction) => {
        if(interaction.channelId !== config.channels.sugestao) return await interaction.editReply('Aqui não é o canal correto.')
        if(!interaction.member.roles.cache.has('793282674827329557')) return interaction.editReply('Sem permissão')

        const findUser = await Sus.findOne({
            where: {
                messageId: interaction.targetId
            }
        })
        if(!findUser) return await interaction.editReply("Sugestão já aprovada ou não existente.")

        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
        );
        let votosP = (await msg.fetch(true)).reactions.cache.get('893295026325581854').count
        votosP = (votosP - 1);
        let votosN = (await msg.fetch(true)).reactions.cache.get('893295026203918358').count
        votosN = (votosN - 1);
        console.log(votosP, votosN)
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

         let embed = new MessageEmbed()
         .setTitle(susebao.tag)
         .setDescription(JSON.stringify(findUser.dataValues))

        susebao.send({embeds: [embed]}).then(async (msg) => {
           await findUser.destroy()
        })

  }
}