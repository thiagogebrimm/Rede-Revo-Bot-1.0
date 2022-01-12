const { MessageEmbed } = require('discord.js');
const config = require('../../../config')
const Sus = require("../../db/Models/Sugestao")

const cd = new Set()

module.exports = {
    name: 'sugerir',
    aliases: [],
    category: 'Utilitades',
    description: 'Faça uma sugestão para o servidor',
    usage: '',
    options: [
        {
            name: 'servidor',
            type: 'STRING',
            required: true,
            description: 'Escolha o servidor',
            choices: config.choices
        }
    ],

    run: async (client, interaction) => {
        var servidor = interaction.options.getString("servidor", true)

        if (cd.has(interaction.user.id)) {
            interaction.editReply("Você deve esperar 5 minutos para enviar uma nova sugestão.")
            return;
        }

        setTimeout(() => {
            if (cd.has(interaction.user.id)) {
                cd.delete(interaction.user.id)
            }
        }, (5 * 60000) /* 5 = 5 minutos, 60000 = 60 segundos em milisegundos */);


        var embed = new MessageEmbed()
            .setTitle('<:NAO_Revo:893295026203918358> | Limite de Sugestões')
            .setDescription('Olá, você está limitado á enviar sugestões pois possui 5 sugestões pendentes, espere até um staff responder alguma sugestão sua para fazer uma nova')
            .setColor('RED')
            .setFooter('Rede Revo', interaction.guild.iconURL({ dynamic: true }))


        var bope = true;
        const findU = await Sus.findAndCountAll({ where: { autor: interaction.user.id, resolved: false } }).then(f => f.count)
        if (findU >= 5) return interaction.editReply({
            embeds: [embed]
        })

        embed
            .setTitle('<:SIM_Revo:893295026325581854> | Verifique seu privado')
            .setDescription('Enviarei uma mensagem em seu privado, caso esteja fechado abra ele.')
            .setColor('BLUE')

        interaction.editReply({
            embeds: [embed]
        })

        const DM = await interaction.user.createDM()
        embed
            .setTitle('<a:Cicle_Revo:848288463488548864> | Sugestão')
            .setDescription(`
Qual é a sugestão?

\`\`\`Envie uma mensagem clara e com o máximo de detalhes possível\`\`\`
`)

        await DM.send({ embeds: [embed] }).catch((err) => {
            bope = false
            embed
                .setTitle(`<:NAO_Revo:893295026203918358> | Sugestão`)
                .setDescription(`Não foi possivel te contatar em seu privado, caso esteja fechado abra ele.`)
                .setColor(`RED`)

            interaction.editReply({
                embeds: [embed]
            })
        });
        if (bope) {

            cd.add(interaction.user.id);
            const col = DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 })
            col.on('collect', async (m) => {
                let sugestao = m.content;
                embed
                    .setTitle(`<a:Cicle_Revo:848288463488548864> | Sugestão`)
                    .setDescription(`
Porque devemos aceitar a sugestão?
                    
\`\`\`Envie o porque a sugestão deve ser aprovada e implementada;
OBS: Se a sugestão não tiver um motivo válido para ser adicionada ela será negada!\`\`\`
`);
                DM.send({ embeds: [embed] });
                DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                    let motivo = m.content;

                    embed
                        .setTitle('<a:Cicle_Revo:848288463488548864> | Sugestão')
                        .setDescription(`
Como essa sugestão afetará na jogabilidade?
                    
\`OBS:Seja claro e objetivo para que sua sugestão tenha mais chances de ser aprovada\`
`);
                    DM.send({ embeds: [embed] });
                    DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                        let jogabilidade = m.content;

                        embed
                            .setTitle('<a:Cicle_Revo:848288463488548864> | Sugestão')
                            .setDescription('A sugestão foi enviada, retornaremos uma resposta em breve.');
                        m.reply({ embeds: [embed] });

                        let S = await Sus.create({
                            autor: interaction.user.id,
                            pergunta01: sugestao,
                            pergunta02: motivo,
                            pergunta03: jogabilidade,
                            resolved: false
                        });

                        embed
                            .setTitle(`<a:Sino_Revo:849415817502523412> | Nova Sugestão para o ${servidor}`)
                            .setDescription(`
**Sugestão feita por** \`${interaction.member.displayName}\`
                    
▫️ __**Minha sugestão é:**__ \`\`\`${S.dataValues.pergunta01.slice(0, 2000)}\`\`\`
__**Motivo para implementar:**__ \`${S.dataValues.pergunta02}\`
__**Como afetará na jogabilidade:**__ \`${S.dataValues.pergunta03}\`
                    `)
                            .setColor('GREEN');
                        client.channels.cache.get(config.channels.sugestao).send({
                            embeds: [embed]
                        }).then(async f => {
                            S.update({
                                messageId: f.id
                            })
                            client.channels.cache.get(config.channels.sugestao).threads.create({
                                name: S.dataValues.pergunta01.slice(0, 95),
                                autoArchiveDuration: 1440,
                                reason: 'Sugestão \'-\'',
                                startMessage: f.id
                            });

                        });

                    });
                })
            }
            )
        }
    }
}