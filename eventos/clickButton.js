const { MessageEmbed } = require("discord.js")
let em = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`Tarefa concluída!`);
let em2 = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`Construção concluída!`);
        
module.exports = async (bot,b)=>{
    b.reply.defer();
    if(b.id === "delete") {
        let msg2 = await b.message.channel.send(em);
        b.message.delete();
        setTimeout(function() {
            msg2.delete();
        }, 30000);
    }
    if(b.id === "delete2") {
        let msg2 = await b.message.channel.send(em2);
        b.message.delete();
        setTimeout(function() {
            msg2.delete();
        }, 30000);
    }
}