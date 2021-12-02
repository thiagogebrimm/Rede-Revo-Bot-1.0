const { MessageEmbed } = require('discord.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const atrasodelay = new Set();

module.exports = {
    name: 'recrutar',
    aliases: [],
    category: 'Minecraft',
    description: 'Faça um embed de recrutamento para seu clan',
    usage: '',
    options: [
        {
            name: 'cor',
            type: 'STRING',
            required: false,
            description: 'Qual cor você quer para o embed? (Exemplos: #0099ff, RED)'
        },
    ],

    run: async (client, interaction, args) => {
        let cores = interaction.options.getString("cor")
        if (!args[0]) cores = 'RANDOM'
        else {
            cores = args.slice(0).join(' ');
        }

        var b;
        if (atrasodelay.has(interaction.user.id)) {
            interaction.editReply("Você deve esperar pelo menos um dia para pode enviar uma mensagem de recrutamento novamente.");
        } else {

            if (!interaction.member.roles.cache.has('793614247283261451')) return interaction.editReply("Você precisa ter a sua conta linkada no servidor para poder usar esse comando.");
            await interaction.user.createDM();
            interaction.user.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Qual é a tag e o nome do seu clan?`)
                    .setColor(`36393e`)
                    .setDescription(`Exemplo: \`[DsG] Deuses Gregos\``)]
            }
            ).catch(() => { b = false });
            b = true;
            if (b) {
                interaction.editReply({
                    embeds: [new MessageEmbed()
                        .setDescription(`Instruções enviadas em seu privado.`)
                        .setColor(`GREEN`)]
                }).then(async i => { await delay(5 * 5000); i.delete() })
                interaction.user.dmChannel.createMessageCollector({
                    filter: (x) => (x.author.id === interaction.user.id),
                    time: 1800000,
                    max: 1
                }).on('collect', m1 => {
                    let r1 = m1.content;

                    interaction.user.send({
                        embeds: [new MessageEmbed()
                            .setColor(`36393e`)
                            .setTitle(`Diga mais sobre o seu clan`)
                            .setDescription(`Exemplo:
                            <:Revo:857398325195833344> **===========================** <:Revo:857398325195833344>
                            Clã focado em diversão e em busca do Top 1.
                            
                            <:1010_Revo:855526997522251798> O que fazer para me tornar um Deus Grego? <:1010_Revo:855526997522251798>
                            
                            <:Seta_Revo:896501293273718864> Ter Maturidade e Responsabilidade.
                            <:Seta_Revo:896501293273718864> Respeito acima de tudo.
                            <:Seta_Revo:896501293273718864> Ser ativo e participativo.
                            <:Seta_Revo:896501293273718864> Procurar um dos líderes para fazer o teste.
                            <:Seta_Revo:896501293273718864> Ter ambição! Para ter sucesso na nossa profissão!
                            
                            <:PepePlano_Revo:845533740456476682> Deuses Gregos rumo ao topo! <:PepePlano_Revo:845533740456476682>
                            
                            <:Revo:857398325195833344> **===========================** <:Revo:857398325195833344>
                        `)]
                    })
                    interaction.user.dmChannel.createMessageCollector({
                        filter: (x) => (x.author.id === interaction.user.id),
                        time: 1800000,
                        max: 1
                    })
                        .on('collect', m2 => {
                            let r2 = m2.content;

                            interaction.guild.channels.cache.find(x => x.id === '894789710705221693').send({
                                embeds: [new MessageEmbed()
                                    .setTitle(`<:Espadas_Revo:890297997471154186> ${r1}`)
                                    .setAuthor(`Enviado por: ${interaction.member.displayName}`, interaction.user.displayAvatarURL({ dynamic: true }))
                                    .setDescription(`${r2}`)
                                    .setColor(`${cores}`)
                                    .setThumbnail('https://i.imgur.com/27xTVaF.png')
                                    .setTimestamp()
                                    .setFooter(`Rede Revo - Clãs`, interaction.guild.iconURL({ dynamic: true }))]
                            }).then(async () => {
                                interaction.user.send({
                                    embeds: [new MessageEmbed()
                                        .setColor(`36393e`)
                                        .setDescription(`Postado!`)]
                                })
                            })
                        })
                })
            }

            atrasodelay.add(interaction.user.id);
            setTimeout(() => {
                atrasodelay.delete(interaction.user.id);
            }, (1440 * 60000));
        }

    }
}