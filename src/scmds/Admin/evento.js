const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    name: 'evento',
    aliases: [''],
    categories: '',
    description: 'Comando para agendar um evento',
    usage: '',

    run: async (client, interaction) => {
        var b;
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return message.reply("Você não tem permissão")
        await interaction.user.createDM();
        interaction.user.send({
            embeds: [new MessageEmbed()
                .setDescription(`Qual evento vai ser agendado?\n\nEventos disponíveis:\n<:Seta_Revo:858912363377721364> **killer** \`(sexta 20h)\`\n<:Seta_Revo:858912363377721364> **arqueiro** \`(domingo 18h)\`\n<:Seta_Revo:858912363377721364> **guerra** \`(sábado 19h)\`\n<:Seta_Revo:858912363377721364> **guerreiro** \`(segunda 20h)\`\n<:Seta_Revo:858912363377721364> **preguerra** \`(terça 19h)\`\n<:Seta_Revo:858912363377721364> **preguerramc** \`(quinta 19h)\`\n<:Seta_Revo:858912363377721364> **prekiller** \`(quarta 20h)\`\n`)
                .setColor(`BLUE`)]
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
                time: 300000,
                max: 1
            })
                .on('collect', m1 => {
                    let r1 = m1.content;
                    interaction.user.send({
                        embeds: [new MessageEmbed()
                            .setColor(`36393e`)
                            .setTitle(`Data?`)
                            .setDescription(`Mande a data que o evento ocorrerá. Exemplo: **13/09**`)]
                    }
                    ).then(async msg => {
                        msg.channel.createMessageCollector({
                            filter: (x) => (x.author.id === interaction.user.id),
                            time: 300000,
                            max: 1
                        })
                            .on('collect', async m2 => {
                                let r2 = m2.content;
                                m2.reply("Sucesso!")

                                switch (r1) {
                                    case 'killer':
                                        interaction.guild.channels.cache.find(x => x.id === '793599388420800543').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                                .setColor(`FF0000`)
                                                .setTitle(`🕒 Sexta dia ${r2} às 20:00h (Horário de Brasília) evento Killer`)
                                                .addFields(
                                                    { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Jogadores sem identificação serão munidos igualmente com kits de duelo e jogados dentro de uma arena, o foco do evento é matar, o jogador que mais conseguir abates se tornará o **Killer** e receberá recompensas por isso, além disso, o último sobrevivente receberá uma recompensa extra.\n\u200B' },
                                                    { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- Todos vs Todos\n- Proibida formação de times\n- Proibido remover completamente a armadura\n\u200B' },
                                                    { name: ':trophy: **Premiação**', value: '**Jogador com mais abates (Matador)**\n- 150.000 Coins\n- TAG temporária [Killer]\n- Estátua exposta na /warp evento\n- Contador de Almas\n**Último sobrevivente**\n- 100.000 Coins' }
                                                )
                                                .setImage('https://imgur.com/4PgkRIg.png')
                                                .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; // Finaliza o código do killer para seguir com outro abaixo
                                    case 'guerreiro':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`FF0000`)
                                            .setTitle(`🕒 Segunda dia ${r2} às 20:00h (Horário de Brasília) evento Guerreiro`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'O evento consiste em um sistema de duelos 1x1 e vence o último sobrevivente.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- 1x1\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**1° lugar:**\n- **150.000** Coins\n- TAG temporária **[Guerreiro(a)]**\n**2° lugar:**\n- **100.000** Coins\n**3° lugar:**\n- **50.000** Coins' }
                                            )
                                            .setImage('https://imgur.com/J2DB4nd.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //guerreiro finalizado
                                    case 'arqueiro':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`4caa20`)
                                            .setTitle(`🕒 Domingo dia ${r2} às 18:00h (Horário de Brasília) evento Arqueiro`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Jogadores sem identificação serão munidos igualmente com um kit arqueiro e jogados dentro de uma arena, o foco do evento é matar, o jogador que mais conseguir abates se tornará o **Sniper** e receberá recompensas por isso, além disso, o último sobrevivente receberá uma recompensa extra.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- Todos vs Todos\n- Proibida formação de times\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**Jogador com mais abates (Matador)**\n- **50.000** Coins\n- Tag **Sniper** (com duração de 7 dias)\n- Estátua exposta na /warp evento\n- **Contador de Sacrifícios**\n\n**Último sobrevivente**\n- **100.000** Coins' }
                                            )
                                            .setImage('https://imgur.com/OETLMQa.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //arqueiro finalizado
                                    case 'preguerra':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`8B0000`)
                                            .setTitle(`🕒 Terça dia ${r2} às 19:00h (Horário de Brasília) evento Pré-Guerra`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Resumidamente uma guerra de clans, diversos clans batalham na arena e vence o último clan sobrevivente.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO **desabilitado**\n- Clans vs Clans\n- Sistema de barreira que encurta o mapa conforme o tempo\n- Utilize /gps para localizar inimigos\n- Sistema de refil de poções\n- Limite de 15 membros participando por clan\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**250.000** coins depositados no banco do clan vencedor' }
                                            )
                                            .setImage('https://imgur.com/CAqN9O4.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //preguerra finalizado
                                    case 'preguerramc':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`8B0000`)
                                            .setTitle(`🕒 Quinta dia ${r2} às 19:00h (Horário de Brasília) evento Pré-Guerra`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Resumidamente uma guerra de clans, diversos clans batalham na arena e vence o último clan sobrevivente.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO **habilitado**\n- Clans vs Clans\n- Sistema de barreira que encurta o mapa conforme o tempo\n- Utilize /gps para localizar inimigos\n- Sistema de refil de poções\n- Limite de 15 membros participando por clan\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**250.000** coins depositados no banco do clan vencedor' }
                                            )
                                            .setImage('https://imgur.com/mhmfaCA.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //preguerramc finalizado
                                    case 'prekiller':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`FF0000`)
                                            .setTitle(`🕒 Quarta dia ${r2} às 20:00h (Horário de Brasília) evento Pré-Killer`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Jogadores sem identificação serão munidos igualmente com kits de duelo e jogados dentro de uma arena, o foco do evento é matar, o jogador que mais conseguir abates se tornará o **Killer** e receberá recompensas por isso, além disso, o último sobrevivente receberá uma recompensa extra.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- Todos vs Todos\n- Proibida formação de times\n- Proibido remover completamente a armadura\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**Jogador com mais abates (Matador)**\n- 50.000 Coins\n**Último sobrevivente**\n- 100.000 Coins' }
                                            )
                                            .setImage('https://imgur.com/KeB5ubA.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //prekiller finalizado
                                    case 'guerra':
                                        interaction.guild.channels.cache.find(x => x.id === '793501038917320704').send({
                                            content: `<@&795509107503267880>`, embeds: [new MessageEmbed()
                                            .setColor(`8B0000`)
                                            .setTitle(`🕒 Sábado dia ${r2} às 19:00h (Horário de Brasília) evento Guerra`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Resumidamente uma guerra de clans, diversos clans batalham na arena e vence o último clan sobrevivente.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Jogadores precisam levar seus próprios itens\n- McMMO **habilitado**\n- Clans vs Clans\n- Sistema de barreira que encurta o mapa conforme o tempo\n- Keep inventory **Habilitado**\n- Utilize /gps para localizar inimigos\n- Sistema de refil de poções\n- Limite de 15 membros participando por clan\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '- **1.000.000** coins depositados no banco do clan vencedor\n- **Troféu** exclusivo com textura personalizada\n\n**Jogador que mais acumular abates**\n- Tag [Mito]' }
                                            )
                                            .setImage('https://imgur.com/AbhIZy4.png')
                                            .setFooter(`Rede Revo`, interaction.guild.iconURL({ dynamic: true }))]
                                        })
                                        break; //prekiller finalizado
                                }
                            })
                    })
                })
        }
    }
}