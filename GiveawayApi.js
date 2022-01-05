const { Message, Channel, Emoji } = require("discord.js");

exports.finish = async (msg, emoji) => {
    const reaction = await msg.reactions.cache.get(emoji)
    console.log(reaction.count)
    if (reaction.count < 1) return "Não existem usuarios suficientes para o sorteio ser realizado."
    let usuariosNF = await reaction.users.fetch()
    let usuariosF = await usuariosNF.filter(f2 => !f2.bot)
    return usuariosF.random()
}

