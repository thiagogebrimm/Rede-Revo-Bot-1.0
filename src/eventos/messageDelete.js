const { MessageEmbed } = require('discord.js');

module.exports = (bot, messageDelete) => {

  let DeleteEmbed = new MessageEmbed()
    .setTitle("MENSAGEM DELETADA <:PepoLixo_Revo:893232516088070175>")
    .setColor("#fc3c3c")
    .addField("Autor:", `${messageDelete.author.tag}`, true)
    .addField("Canal:", `${messageDelete.channel}`, true)
    .setTimestamp(messageDelete.createdAt)
    .setFooter({ text: `Mensagem ID: ${messageDelete.id}`, iconURL: messageDelete.author.avatarURL({ dynamic: true }) })
  if (messageDelete.content.length >= 1) DeleteEmbed.setDescription(`${messageDelete.content}`)
  if (messageDelete.attachments.size > 0) {
    let attachments = messageDelete.attachments.map((a) => `[${a.name}](${a.url})`).join("\n")
    DeleteEmbed.addField("Arquivos:", attachments)
    DeleteEmbed.setImage(messageDelete.attachments.first().url)
  }

  const DeleteChannel = messageDelete.guild.channels.cache.find(x => x.id === "793599388420800543");
  if (messageDelete.author.bot) return;
  if (DeleteChannel) return DeleteChannel.send({
    embeds: [DeleteEmbed]
  });
}