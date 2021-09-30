const { Client, ContextMenuInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

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
            id: '889521010288762890',
            type: 'ROLE',
            permission: true,
        },
    ],
     /** 
     * @param {Client} client 
     * @param {ContextMenuInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
            if(interaction.channelId !== config.channels.sugestao) return await interaction.editReply('Aqui não é o canal correto.')
            if(!interaction.member.roles.cache.has('889521010288762890')) return interaction.editReply('Sem permissão')

            const findUser = await Sus.findOne({
                where: {
                    messageId: interaction.targetId
                }
            })
            if(!findUser) return await interaction.editReply("Sugestão já aprovada ou não existente.")

            const msg = await interaction.channel.messages.fetch(
                interaction.targetId
            );
            let votosP = (await msg.fetch(true)).reactions.cache.get('892467965130321930').count
            votosP = (votosP - 1);
            let votosN = (await msg.fetch(true)).reactions.cache.get('892467966644469870').count
            votosN = (votosN - 1);
            console.log(votosP, votosN)
            interaction.followUp({
                content: `Rejeitado!`
            })

            findUser.update({
                votosPositivos: votosP,
                votosNegativos: votosN
            })

            

            /**
             * 
             * findUser.messageId - Id da mensagem
             * findUser.authir - Id do autor da Sugestão
             * findUser.pergunta01 - Sugestão
             * findUser.pergunta02 - Motivo de adicionarmos
             * findUser.votosPositivos - Votos positivos
             * findUser.votosNegativos - Votos Negativos
             * 
             */

            const user = client.users.cache.get(findUser.autor).send('OK!').then(async (msg) => {
               
            })

      }
    }