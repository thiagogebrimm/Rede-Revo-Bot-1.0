const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require("ms");
const G = require("../../db/Models/Sorteio")
module.exports = {
    name: 'sortear',
    aliases: ['sorteio', 'giveaway'], 
    categories : 'adm', 
    description: 'Comando de sortear.',
    usage: '',
    options: [
        {
            name: "tempo",
            type: "STRING",
            description: "Tempo do sorteio",
            required: true
        },
        {
            name: "premio",
            type: "STRING",
            description: "Premio do sorteio",
            required: true
        },
        {
            name: "canal",
            type: "CHANNEL",
            description: "Canal do sorteio",
            required: true
        },
        
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply(`Você não possui permissão para isso.`);
  const tempo = interaction.options.get("tempo").value
  
        if (!tempo) return interaction.editReply(`Você precisa especificar o tempo!\n Exemplo:\`5m | 7h | 10d\``);
        if (
          !tempo.endsWith("d") &&
          !tempo.endsWith("h") &&
          !tempo.endsWith("m") &&
          !tempo.endsWith("s") 
        )
          return interaction.editReply(
            `Você não está usando o tempo da forma correta.`
          );
        if (isNaN(tempo.split("m")[0]) && isNaN(tempo.split("s")[0]) && isNaN(tempo.split("h")[0]) && isNaN(tempo.split("d")[0])) return interaction.editReply(`Isso não é um número.`);
        let channel = interaction.options.get("canal").channel;
        if(channel.isText()) {
        if (!channel)
          return interaction.editReply(
            `Você precisa informar o canal ou eu não consegui achar esse canal nesse servidor.`
          );
        let premio = interaction.options.get("premio").value
        if (!premio) return interaction.editReply(`Especifique o prêmio!`);
        interaction.editReply(`<:aviso:854929386394615848> Sorteio criado em ${channel}`);
        let Embed = new MessageEmbed()
          .setTitle('<a:hyper_boost:810634732949078026> SORTEIO!')
          .setDescription(
            `<:aviso:854929386394615848> Sorteio iniciado por: ${interaction.user}\n\n<a:ovelha_arco_iris:859854575040069664> ➠ **Prêmio:** ${premio}\n<a:abelha:854928199900987403> ➠ **Tempo:** ${tempo}`
          )
          .setTimestamp(Date.now() + ms(tempo))
          .setFooter('RedeTower')
          .setColor(`ORANGE`)
          .setThumbnail(`https://api.mcsrvstat.us/icon/147.135.64.147:10145`);
        channel.send({
            embeds: [Embed]
        }).then( async m => { m.react("854929181133766676");

        await G.create({
          authorId: interaction.user.id,
          tempo: tempo,
          tempoMS: ms(tempo),
          reaction: "854929181133766676",
          premio: premio,
          message: m.id,
          finalizado: false,
          canal: channel.id
        })
        client.emit("ready", client)
})
    }
    
}
}