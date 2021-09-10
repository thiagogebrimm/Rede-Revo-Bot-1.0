const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
 
 message.delete().catch(() => null);
 
 if (!message.member.permissions.has(['MANAGE_CHANNELS'])) return;

 if (!args[0]) return message.channel.send(`Você não específicou o tempo!`);
 
 if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) return message.channel.send(
 `Você não usou a forma correta para a hora, Use apenas letras minusculas. Exemplo: 1s, 1m, 1h, 1d`
 );
 
 if (isNaN(args[0][0])) return message.channel.send(`Isso não é um número!`);
 
 let channel = message.mentions.channels.first();
 
 if (!channel) return message.channel.send(
 `Eu não consegui encontrar o canal no servidor!`
 );
 
 let prize = args.slice(2).join(" ");
 
 if (!prize) return message.channel.send(`Nenhum prêmio especificado!`);
 
 message.channel.send(`*Sorteio criado em ${channel}*`);
 
 let Embed = new MessageEmbed()
 .setTitle(`Novo sorteio!`)
 .setDescription(
 `Sorteando: **${prize}**
 Clique em 💠 para participar`
 )
 .setFooter(`Termina:`, message.guild.iconURL)
 .setTimestamp(Date.now() + ms(args[0]))
 .setColor("#00FFFF");
 
 let m = await channel.send(`<@&793614247283261451>`,Embed);
 
 m.react("💠");
 
 setTimeout(() => {
 if (m.reactions.cache.get("💠").count <= 1) {
 message.channel.send(`Reações: ${m.reactions.cache.get("💠").count}`);
 return message.channel.send(`Poucas Pessoas Participaram Do Sorteio, Então Eu Posso Ficar Com O Premio?`);
 }

 let ganhador = m.reactions.cache.get("💠").users.cache.filter((u) => !u.bot).random();
 channel.send(`Parabéns ${ganhador}! Por ganhar o sorteio de **${prize}** <:GG_Revo:845859523519578123>\n\nVocê tem 48 horas para abrir um <#851013402696220712> e reivindicar sua recompensa ou refaremos o sorteio.`);
 
 }, ms(args[0]));
 };

    module.exports.help = {
        name: 'sorteio',
        description: 'Realize um sorteio em nosso discord.',
        category: 'Moderation'
    }
    
    module.exports.limits = {
        ratelimit: 3,
        cooldown: 6e2
    }
    
    module.exports.requirements = {
        ownerOnly: false
    }