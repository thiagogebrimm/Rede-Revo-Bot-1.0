const { MessageEmbed } = require('discord.js');

module.exports = (bot, messageDelete) => {

  const DeleteEmbed = new MessageEmbed()
    .setTitle("MENSAGEM DELETADA <:PepoLixo_Revo:893232516088070175>")
    .setColor("#fc3c3c")
    .setDescription(`**Mensagem:** ${messageDelete.content || "Nada"}`)
    .addField("Autor:", `${messageDelete.author.tag}`, true)
    .addField("Canal:", `${messageDelete.channel}`, true)
    .setTimestamp(messageDelete.createdAt)
    .setFooter(`Mensagem ID: ${messageDelete.id}`, messageDelete.author.avatarURL({ dynamic: true }));

  const DeleteChannel = messageDelete.guild.channels.cache.find(x => x.id === "793599388420800543");
  if (messageDelete.author.bot) return;
  if (DeleteChannel) return DeleteChannel.send({
    embeds: [DeleteEmbed]
  });
}