const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'evento',
    aliases: [''],
    categories : '',
    description: 'cmd de evento',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sem permissão :(")
        var b;
        if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;
        await message.author.createDM();
        message.author.send(new Discord.MessageEmbed()
            .setDescription(`Qual evento vai ser agendado?\nEventos:\nkiller, arqueiro, guerra, guerreiro`)
            .setColor(`BLUE`)
        ).catch(() => { b = false });  
        b = true;
        if (b) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Instruções enviadas em seu privado.`)
                .setColor(`GREEN`)
            ).then(i => i.delete({ timeout: 5 * 5000 }))
            message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
            .on('collect', m1 => {
                let r1 = m1.content;
                        message.author.send(new Discord.MessageEmbed()
                        .setColor(`36393e`)
                        .setTitle(`Data?`)
                        .setDescription(`Mande a data que o evento ocorrerá. Exemplo: **13/09**`)
                        ).then(async msg => {
                            msg.channel.createMessageCollector(x => x.author.id === message.author.id, { time: 300000, max: 1 })
                            .on('collect', async m2 => {
                                let r2 = m2.content;
                                m2.reply("Sucesso!")
    
                                switch(r1) {
                                    case 'killer':
                                            await message.guild.channels.cache.find(x => x.id === '793501038917320704').send("Mensagem do killer")
                                    break; // Finaliza o código do killer para seguir com outro abaixo
                                    case 'guerreiro':
                                            await message.guild.channels.cache.find(x => x.id === '793501038917320704').send(`<@&795509107503267880>`,new Discord.MessageEmbed()
                                            .setColor(`4caa20`)
                                            .setTitle(`🕒 Segunda dia ${r2} às 20:00h (Horário de Brasília) evento Guerreiro`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'O evento consiste em um sistema de duelos 1x1 e vence o último sobrevivente.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- 1x1\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**1° lugar:**\n- **150.000** Coins\n- TAG temporária **[Guerreiro(a)]**\n**2° lugar:**\n- **100.000** Coins\n**3° lugar:**\n- **50.000** Coins' }
                                            )
                                            .setFooter(`Rede Revo`, message.guild.iconURL({ dynamic: true })))
                                    break;
                                    case 'arqueiro':
                                            await message.guild.channels.cache.find(x => x.id === '793501038917320704')?.send({ content: `<@&795509107503267880>`, embeds: [new Discord.MessageEmbed()
                                            .setColor(`4caa20`)
                                            .setTitle(`🕒 Domingo dia ${r2} às 18:00h (Horário de Brasília) evento Arqueiro`)
                                            .addFields(
                                                { name: '<:PepoSeiLa_Revo:846192575290408990> **Como funciona o evento?**', value: 'Jogadores sem identificação serão munidos igualmente com um kit arqueiro e jogados dentro de uma arena, o foco do evento é matar, o jogador que mais conseguir abates se tornará o **Sniper** e receberá recompensas por isso, além disso, o último sobrevivente receberá uma recompensa extra.\n\u200B' },
                                                { name: '<:Esmeralda_Revo:847520945912414258> **Características**', value: '- Itens setados\n- McMMO desabilitado\n- Todos vs Todos\n- Proibida formação de times\n\u200B' },
                                                { name: ':trophy: **Premiação**', value: '**Jogador com mais abates (Matador)**\n- **50.000** Coins\n- Tag **Sniper** (com duração de 7 dias)\n- **Contador de Sacrifícios**\n\n**Último sobrevivente**\n- **100.000** Coins.' }
                                            )
                                            .setFooter(`Rede Revo`, message.guild.iconURL({ dynamic: true }))]})
                                    break;
                                }
                        })
                        })
                    })
                }
      }
    }