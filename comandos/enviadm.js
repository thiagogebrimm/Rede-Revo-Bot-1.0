const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {

let user = message.mentions.users.first() || client.users.cache.get(args[0])
let msg = args.slice(1).join(" ")
const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

if(!user) return message.channel.send(`Você precisa marcar um usuario`)
if(user.id === message.author.id) return message.channel.send(`Você não pode enviar a você mesmo a mensagem`)
if(!msg) return message.channel.send(`Você precisa me dar uma mensagem`)
if(regex.exec(msg.content)) return message.channel.send(`Sua mensagem não pode conter links`)
if(msg.length > 1000) return message.channel.send(`Sua mensagem não pode passar de 1k de caracteres`)


const embed = new MessageEmbed()
  .setColor("PURPLE")
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  .setDescription(`Hey ${user} Sabia que ${message.author.tag} te ama? se liga na mensagem deixada\n> ${msg}`)
  .setFooter(`Menssagem enviada por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
user.send(embed).catch(a => {return message.channel.send(`Impossivel mandar mensagens na dm deste usuario!`)})

message.channel.send(`${message.author} Foi enviada sua mensagem para ${user.tag}`)
}

module.exports.help = {
    name: 'dm',
    category: 'Utilities',
    description: 'Retorna o link do formulário por meio de um texto clicável.'
}

module.exports.limits = {
    rateLimit: 3,
    cooldown: 1e2
}

module.exports.requirements = {
    ownerOnly: false,
}