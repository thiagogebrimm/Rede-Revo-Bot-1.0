const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

const config = require('../../../config')

const Sus = require("../../db/Models/Sugestao")

module.exports = {
    name: 'sugerir',
    aliases: ['sugestão'],
    categories : 'Sugestão',
    description: 'Comando de sugestão =)',
    usage: '',
    options: [
        {
            name: 'servidor',
            type: 'STRING',
            required: true,
            description: 'Escolha o servidor.',
            choices: config.choices
        }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {

        var embed = new MessageEmbed()
        .setTitle('<:naoo:892467966644469870> | Limite de Sugestões')
        .setDescription('Olá, você está limitado á enviar sugestões pois possue 5 sugestões pendentes, espere até alguem recusar alguma sugestão para continuar')
        .setColor('RED')
        .setFooter('Desenvolvido por uVini__#7127')


        var bope = true;
        const findU = await Sus.findAndCountAll().then(f => f.count)
        
        if(findU === 5) return interaction.editReply({
            embeds: [embed]
        })

        embed
        .setTitle('<:sim:890932023370330162> | Verifique sua DM')
        .setDescription('Enviarei uma mensagem em sua DM, caso esteja fechada, abra ela.')
        .setColor('BLUE')

        interaction.editReply({
            embeds: [embed]
        })

        const DM = await interaction.user.createDM()
        embed
        .setTitle('<a:lab_atencao:892468298527150191> | Sugestão')
        .setDescription('Qual é a sugestão?')

        DM.send({embeds: [embed]}).catch((err) => {
            bope===false
            embed
            .setTitle('<:naoo:892467966644469870> | Sugestão')
            .setDescription('Não foi possivel te contatar em sua DM, abra ela, por favor.')
            .setColor('RED')

            interaction.editReply({
                embeds: [embed]
            })
        });
        if(bope) {
            
            const col = DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 })
           col.on('collect', async (m) => {
                let sugestao = m.content;

                embed
                    .setTitle('<a:lab_atencao:892468298527150191> | Sugestão')
                    .setDescription('Porque devemos aceitar a sugestão?');
                DM.send({ embeds: [embed] });
                DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id }).on('collect', async (m) => {
                    let motivo = m.content;

                    embed
                        .setTitle('<a:lab_atencao:892468298527150191> | Sugestão')
                        .setDescription('A sugestão foi enviada, retornaremos em breve.');
                    m.reply({ embeds: [embed] });

                    let S = await Sus.create({
                        autor: interaction.user.id,
                        pergunta01: sugestao,
                        pergunta02: motivo
                    });

                    embed
                        .setTitle('<:Calendario:892468324989030461> | Sugestão')
                        .setDescription(`
                    **Sugestão de** @<${interaction.member.id}>
                    
                    **Minha Sugestão é** \`${S.dataValues.pergunta01.slice(0, 2000)}\`.
                    **Deve adicionar pois** \`${S.dataValues.pergunta02}\`.
                    `)
                        .setColor('GREEN');
                        client.channels.cache.get(config.channels.sugestao).send({
                        embeds: [embed]
                    }).then(f => {
                        f.react('892467965130321930');
                        f.react('892467966644469870');
                        S.update({
                            messageId: f.id
                        })
                    });

                });
            })
        }


      }
    }