const { MessageEmbed } = require('discord.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const atrasodelay = new Set();

module.exports = {
    name: 'recrutar',
    aliases: [],
    category: 'Minecraft',
    description: 'Faça um embed de recrutamento para seu clan',
    usage: '',

    run: async (client, interaction) => {
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
                        <:Espadas_Revo:890297997471154186> Clan focado em PvP e Construções <:Espadas_Revo:890297997471154186>
                        __Requisitos:__
                        <:Check_Yes_Revo:845888184806277140> Ter no mínimo 250 de machado
                        <:Check_Yes_Revo:845888184806277140> Saber construir bem
                        <:Check_Yes_Revo:845888184806277140> Respeitar outros jogadores
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
                                .setColor(`RANDOM`)
                                .setDescription(`${r2}`)
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