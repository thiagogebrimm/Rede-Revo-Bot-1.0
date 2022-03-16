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
            .setTitle('<:NAO_Revo:893295026203918358> | Limite de Aplicações')
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
            .setDescription('Enviarei uma mensagem em seu privado e por lá farei sua entrevista, caso esteja fechado abra ele.')
            .setColor('BLUE')

        interaction.editReply({
            embeds: [embed]
        })

        const DM = await interaction.user.createDM()
        embed
            .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
            .setDescription(`
**Você cumpre os seguintes requisitos mínimos?**

✅ Possuir um microfone decente
✅ Ter disponibilidade de horário
✅ Ser ativo na comunidade (discord e minecraft)
✅ Ter pelo menos 48 horas jogadas no servidor
✅ Ter um bom comportamento dentro da Rede Revo
✅ Ser educado e profissional
✅ Ser maior de 14 anos
✅ Gostar de responder dúvidas, mesmo que sejam perguntas super simples e bobas

Você cumpre com os requisitos listados acima? Se não, qual você não cumpre?
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
Qual o seu nome e a sua idade?
Qual o seu nick na Rede Revo?
Qual a sua disponibilidade de horário?
Possui microfone e disponibilidade para falar em futuras reuniões?
`);
                        DM.send({ embeds: [embed] });
                        DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                            let infosobre = m.content;

                            embed
                                .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                .setDescription(`
Porque se candidatou a vaga?

\`OBS: Limite máximo de 3000 caracteres\`
`);
                            DM.send({ embeds: [embed] });
                            DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                let falesobre = m.content;

                                embed
                                    .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                    .setDescription(`
Já foi staff de outro servidor, se sim, qual? Caso afirmativo, qual o motivo de ter saído da equipe desse servidor e qual o seu antigo cargo nele?

\`OBS: Limite máximo de 3000 caracteres\`
`);
                                DM.send({ embeds: [embed] });
                                DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                    let expstaff = m.content;

                                    embed
                                        .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                        .setDescription(`
Um player te perguntou sobre como define uma warp pública, quanto custa e como funciona o passe de batalha, como você explicaria? Qual a diferença entre o premium e o normal?

\`OBS: Limite máximo de 3000 caracteres\`
`);
                                    DM.send({ embeds: [embed] });
                                    DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                        let passe = m.content;

                                        embed
                                            .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                            .setDescription(`
Quero que um jogador só tenha permissão em um lugar específico da minha claim. Como eu faço isso?

\`OBS: Limite máximo de 1000 caracteres\`
`);
                                        DM.send({ embeds: [embed] });
                                        DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                            let perm = m.content;

                                            embed
                                                .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                                .setDescription(`
Você já tem ajudado outros jogadores no servidor? Se sim, nos envie uma print mostrando você realizando tal atitude(s).

\`OBS: O envio tem que ser por meio de link. Limite máximo de 1000 caracteres\`
`);
                                            DM.send({ embeds: [embed] });
                                            DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                                let ajudando = m.content;

                                                embed
                                                    .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                                    .setDescription(`
Qual seu histórico como jogador de Minecraft? Possui experiência em quais modos de jogo? Joga a quanto tempo? Nos diga um pouco mais sobre sua vida como jogador...

\`OBS: Limite máximo de 4000 caracteres\`
`);
                                                DM.send({ embeds: [embed] });
                                                DM.createMessageCollector({ filter: f => f.author.id === interaction.user.id, max: 1 }).on('collect', async (m) => {
                                                    let minesobre = m.content;

                                                    embed
                                                        .setTitle('<a:Cicle_Revo:848288463488548864> | Aplicação para Ajudante')
                                                        .setDescription(`
**Agradecemos sua candidatura à vaga de ajudante aqui na Rede Revo!**

Ficamos muito gratos em saber que cada vez mais pessoas querem fazer parte da equipe.

Recebemos sua inscrição e agora pedimos que aguarde que em breve iremos analisá-la. Se você tiver entre os perfis que desejamos, você será avisado(a), assim como caso seja reprovado(a).

Pedimos que siga as orientações estabelecidas em nossa wiki - https://wiki.rederevo.com/outros/faca-parte-da-equipe para uma melhor informação. 
Agradecemos, novamente, por dedicar um tempo para se inscrever. 

Boa sorte!
`);
                                                    m.reply({ embeds: [embed] });

                                                    let S = await FormA.create({
                                                        autor: interaction.user.id,
                                                        pergunta01: requisitos,
                                                        pergunta02: conhecimentoregras,
                                                        pergunta03: floodespam,
                                                        pergunta04: infosobre,
                                                        pergunta05: falesobre,
                                                        pergunta06: expstaff,
                                                        pergunta07: passe,
                                                        pergunta08: perm,
                                                        pergunta09: ajudando,
                                                        pergunta10: minesobre,
                                                        resolved: false
                                                    });

                                                    embed
                                                        .setTitle(`<:New_RedeRevo:845540256861126666> | Formulario de ${interaction.member.displayName}`)
                                                        .setDescription(`
✅ Possuir um microfone decente
✅ Ter disponibilidade de horário
✅ Ser ativo na comunidade (discord e minecraft)
✅ Ter pelo menos 48 horas jogadas no servidor
✅ Ter um bom comportamento dentro da Rede Revo
✅ Ser educado e profissional
✅ Ser maior de 14 anos
✅ Gostar de responder dúvidas, mesmo que sejam perguntas super simples e bobas

Você cumpre com os requisitos listados acima? Se não, qual você não cumpre? \`${S.dataValues.pergunta01}\`
Você tem conhecimento sobre todas regras? \`${S.dataValues.pergunta02}\`

Já foi staff de outro servidor, se sim, qual? Caso afirmativo, qual o motivo de ter saído da equipe desse servidor e qual o seu antigo cargo nele?
\`\`\`${S.dataValues.pergunta06.slice(0, 3000)}\`\`\`
`)
                                                        .addField('Qual a diferença entre flood e spam? Em qual regra essa conduta se enquadra?', `\`${S.dataValues.pergunta03.slice(0, 1000)}\``, false)
                                                        .setColor('GREEN');

                                                    let embed2 = new MessageEmbed()
                                                        .setDescription(`
**Informações sobre você**
Qual o seu nome e a sua idade?
Qual o seu nick na Rede Revo?
Qual a sua disponibilidade de horário?
Possui microfone e disponibilidade para falar em futuras reuniões?
\`\`\`${S.dataValues.pergunta04.slice(0, 3000)}\`\`\`
`)
                                                        .setColor('GREEN');

                                                    let embed3 = new MessageEmbed()
                                                        .setDescription(`
Porque se candidatou a vaga?
\`\`\`${S.dataValues.pergunta05.slice(0, 3000)}\`\`\`
`)
                                                        .setColor('GREEN');

                                                    let embed4 = new MessageEmbed()
                                                        .setDescription(`
Um player te perguntou sobre como define uma warp pública, quanto custa e como funciona o passe de batalha, como você explicaria? Qual a diferença entre o premium e o normal?
\`\`\`${S.dataValues.pergunta07.slice(0, 3000)}\`\`\`

Quero que um jogador só tenha permissão em um lugar específico da minha claim. Como eu faço isso?
\`\`\`${S.dataValues.pergunta08.slice(0, 1000)}\`\`\`
`)
                                                        .setColor('GREEN');
                                                    let embed5 = new MessageEmbed()
                                                        .setDescription(`
Você já tem ajudado outros jogadores no servidor? Se sim, nos envie uma print mostrando você realizando tal atitude(s).
\`\`\`${S.dataValues.pergunta09.slice(0, 1000)}\`\`\`

Qual seu histórico como jogador de Minecraft? Possui experiência em quais modos de jogo? Joga a quanto tempo? Nos diga um pouco mais sobre sua vida como jogador...
\`\`\`${S.dataValues.pergunta10.slice(0, 4000)}\`\`\`
`)
                                                        .setTimestamp()
                                                        .setColor('GREEN');

                                                    await client.channels.cache.get(config.channels.forms).send({
                                                        embeds: [embed]
                                                    }).then(async f => {
                                                        S.update({
                                                            messageId: f.id
                                                        })
                                                    });
                                                    await client.channels.cache.get(config.channels.forms).send({
                                                        embeds: [embed2, embed3]
                                                    }).then(async f => {
                                                        S.update({
                                                            messageId2: f.id
                                                        })
                                                    });
                                                    await client.channels.cache.get(config.channels.forms).send({
                                                        embeds: [embed4, embed5]
                                                    }).then(async f => {
                                                        S.update({
                                                            messageId3: f.id
                                                        })
                                                    });

                                                });
                                            });
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
            )
        }
    }
}