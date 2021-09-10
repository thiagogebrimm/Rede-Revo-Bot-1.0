const Discord = require("discord.js")
const message = require("../eventos/message")

module.exports = (bot, messageDelete) => {

  bot.on("messageDelete", async)
  // Add latency as audit logs aren't instantly updated, adding a higher latency will result in slower logs, but higher accuracy.
  await Discord.Util.delayFor(900);

  // Fetch a couple audit logs than just one as new entries could've been added right after this event was emitted.
  const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
    limit: 6,
    type: 'MESSAGE_DELETE'
  }).catch(() => ({
    entries: []
  }));

  const auditEntry = fetchedLogs.entries.find(a =>
    // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
    a.target.id === messageDelete.author.id &&
    a.extra.channel.id === messageDelete.channel.id &&
    // Ignore entries that are older than 20 seconds to reduce false positives.
    Date.now() - a.createdTimestamp < 20000
  );

  // If entry exists, grab the user that deleted the message and display username + tag, if none, display 'Unknown'. 
  const executor = auditEntry ? auditEntry.executor.tag : 'Unknown';

  // Finally, prepare the embed and send the log. (using similar code posted by thread author but improved)

  // <Discord>.MessageEmbed for v12, <Discord>.RichEmbed for older.
  const DeleteEmbed = new Discord.MessageEmbed()
    .setTitle("DELETED MESSAGE")
    .setColor("#fc3c3c")
    .addField("Author", messageDelete.author.tag, true)
    // New field for user which deleted the message.
    .addField("Deleted By", executor, true)
    .addField("Channel", messageDelete.channel, true)
    // Messages can be empty too, but I won't be going over how to include embeds/attachments, just displaying 'None' instead to avoid undefined/null.
    .addField("Message", messageDelete.content || "None")
    .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`);

  const DeleteChannel = messageDelete.guild.channels.find(x => x.name === "793599388420800543");
  DeleteChannel.send(DeleteEmbed);
}