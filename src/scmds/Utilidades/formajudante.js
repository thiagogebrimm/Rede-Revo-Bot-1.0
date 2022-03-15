const { MessageEmbed } = require('discord.js');
const config = require('../../../config')
const FormA = require("../../db/Models/FormAjudante")

const cd = new Set()

module.exports = {
    name: 'formajudante',
    aliases: [],
    category: 'Utilitades',
    description: 'Faça formulário para se tornar ajudante da Rede Revo',
    usage: '',

    run: async (client, interaction) => {
        if (!interaction.member.roles.cache.has('793614247283261451')) return interaction.editReply("Para se inscrever na staff é necessário ter a sua conta linkada com o servidor!")

        if (cd.has(interaction.user.id)) {
            interaction.editReply("Você deve esperar 30 minutos para poder refazer o formulário.")
            return;
        }

        setTimeout(() => {
            if (cd.has(interaction.user.id)) {
                cd.delete(interaction.user.id)
            }
        }, (30 * 60000) /* 5 = 5 minutos, 60000 = 60 segundos em milisegundos */);


        var embed = new MessageEmbed()
            .setTitle('<:NAO_Revo:893295026203918358> | Limite de Sugestões')
            .setDescription('Sua aplicação é única, não é permitido realizar o formulário mais de uma vez')
            .setColor('RED')
            .setFooter('Rede Revo', interaction.guild.iconURL({ dynamic: true }))


        var bope = true;
        const findU = await FormA.findAndCountAll({ where: { autor: interaction.user.id, resolved: false } }).then(f => f.count)
        if (findU >= 1) return interaction.editReply({
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
**Você cumpre os seguintes requisitos mínimos?**

✅ Possuir um microfone decente
✅ Ter disponibilidade de horário
✅ Ser ativo na comunidade (discord e minecraft)
✅ Ter pelo menos 48 horas jogadas no servidor
✅ Ter um bom comportamento dentro da Rede Revo
✅  Ser educado e profissional
✅ Ser maior de 14 anos

\`\`\`Se sim, responda a pergunta a seguir:\`\`\`
Você gosta de responder dúvidas de pessoas, mesmo que sejam perguntas super simples e bobas?
`)

        await DM.send({ embeds: [embed] }).catch((err) => {
            bope = false
            embed
                .setTitle(`<:NAO_Revo:893295026203918358> | Aplicação para Ajudante`)
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
                let requisitos = m.content;
                embed
                    .setTitle(`<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante`)
                    .setDescription(`
Você tem conhecimento sobre todas regras?
`);
                DM.send({ embeds: [embed] });
                DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                    let conhecimentoregras = m.content;

                    embed
                        .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                        .setDescription(`
Qual a diferença entre flood e spam? Em qual regra essa conduta se enquadra?

\`OBS:Limite máximo de 1000 caracteres\`
`);
                    DM.send({ embeds: [embed] });
                    DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                        let floodespam = m.content;

                        embed
                            .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                            .setDescription(`
**Informações sobre você**
Qual o seu nome?
Qual o seu nick na Rede Revo?
Qual sua idade?
Qual a sua disponibilidade de horário?
`);
                        DM.send({ embeds: [embed] });
                        DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                            let infosobre = m.content;

                            embed
                                .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                .setDescription('O formulário foi enviado, retornaremos uma resposta em breve.');
                            m.reply({ embeds: [embed] });

                            let S = await FormA.create({
                                autor: interaction.user.id,
                                pergunta01: requisitos,
                                pergunta02: conhecimentoregras,
                                pergunta03: floodespam,
                                pergunta04: infosobre,
                                resolved: false
                            });

                            embed
                                .setTitle(`<:New_RedeRevo:845540256861126666> | Formulario de ${interaction.member.displayName}`)
                                .setDescription(`
__**Você gosta de responder dúvidas de pessoas, mesmo que sejam perguntas super simples e bobas?**__ \`${S.dataValues.pergunta02}\`
__**Você tem conhecimento sobre todas regras?**__ \`${S.dataValues.pergunta02}\`
`)
                                .addField('Qual a diferença entre flood e spam? Em qual regra essa conduta se enquadra?', `\`${S.dataValues.pergunta03.slice(0, 1000)}\``, false)
                                .setColor('GREEN');
                            let embed2 = new MessageEmbed()
                                .setDescription(`
**Informações sobre você**
Qual o seu nome?
Qual o seu nick na Rede Revo?
Qual sua idade?
Qual a sua disponibilidade de horário? 

\`\`\`${S.dataValues.pergunta04.slice(0, 2000)}\`\`\`
`)
                                .setColor('GREEN');
                            client.channels.cache.get(config.channels.forms).send({
                                embeds: [embed, embed2]
                            }).then(async f => {
                                S.update({
                                    messageId: f.id
                                })

                            });

                        });
                    });
                })
            }
            )
        }
    }
}