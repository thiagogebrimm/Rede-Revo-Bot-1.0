const ms = require("ms");

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'sorteio',
    aliases: [''],
    categories : '',
    description: 'Sorteie algo!',
    usage: '',
    options: [
        {
            name: 'tempo',
            description: 'Tempo do sorteio (1d, 1h, 1m)',
            required: true,
            type: 'STRING'
        },
        {
            name: 'premio',
            description: 'Premio do sorteio',
            required: true,
            type: 'STRING'
        },
        {
            name: 'canal',
            description: 'Canal que haverá o anuncio do sorteio',
            required: true,
            type: 'CHANNEL'
        }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     */
      run: async(client, interaction) => {
        if (!interaction.member.permissions.has(['MANAGE_CHANNELS'])) return;

        const args = []

        args.push(interaction.options.getString('tempo'))
        
        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) return interaction.editReply(
        `Você não usou a forma correta para a hora, Use apenas letras minusculas. Exemplo: 1s, 1m, 1h, 1d`
        );
        
        tempo
        
        let channel = interaction.options.getChannel('canal')
        
        if (!channel || channel.type !== "GUILD_TEXT") return interaction.editReply(
        `Eu não consegui encontrar o canal no servidor!`
        );
        
        let prize = interaction.options.getString('prize')
        
        if (!prize) return interaction.editReply(`Nenhum prêmio especificado!`);
        
        interaction.editReply(`*Sorteio criado em ${channel}*`);
        
        let Embed = new MessageEmbed()
        .setTitle(`Novo sorteio!`)
        .setDescription(
        `Sorteando: **${prize}**
        Clique em 💠 para participar`
        )
        .setFooter(`Termina:`, interaction.guild.iconURL)
        .setTimestamp(Date.now() + ms(args[0]))
        .setColor("#00FFFF");
        
        let m = await channel.send({ content: `<@&793614247283261451>`, embeds: [Embed]});
        
        m.react("💠");
        
        setTimeout(() => {
        if (m.reactions.cache.get("💠").count <= 1) {
        interaction.channel.send(`Reações: ${m.reactions.cache.get("💠").count}`);
        return channel.send(`Poucas Pessoas Participaram Do Sorteio, Então Eu Posso Ficar Com O Premio?`);
        }
       
        let ganhador = m.reactions.cache.get("💠").users.cache.filter((u) => !u.bot).random();
        channel.send(`Parabéns ${ganhador}! Por ganhar o sorteio de **${prize}** <:GG_Revo:845859523519578123>\n\nVocê tem 48 horas para abrir um <#851013402696220712> e reivindicar sua recompensa ou refaremos o sorteio.`);
        
        }, ms(args[0]));
      }
    }