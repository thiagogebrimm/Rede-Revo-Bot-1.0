
const { exec } = require("child_process");
const { Message, MessageEmbed } = require("discord.js");
const Sorteios = require("../src/db/Models/Sorteio");

/**
 * 
 * @param {Message} message
 */
module.exports = async (message) => {
    const findS = await Sorteios.findOne({
        where: {
            messageId: message.id,
            ended: false
        }
    })

    if (!findS) return;
    if (findS.time - currentTime().getTime() < 0) {
        exec()
    } else {
        setTimeout(() => {
            exec()
        }, findS.time - currentTime().getTime())
    }

    async function exec() {
        const r = message.reactions.cache.get("🎉")
        await r.users.fetch()
        findS.update({
            ended: true
        })
        if (r.users.cache.filter(x => !x.bot).size < findS.maxWinners) return;
        let winners = []

        let users = r.users.cache.filter(x => !x.bot)

        for (let i = 0; i < findS.maxWinners; i++) {


            var u = users.random()

            if (winners.includes(u.id)) users.random();

            winners.push(u.id)
        }

        const tempo = new Date()

        tempo.setHours(new Date().getUTCHours() - 3)


        const embed = new MessageEmbed()

            .setTitle("Sorteio Encerrado <a:Cicle_RedeRevo:848288463488548864>")
            .setDescription(`
O sorteio acabou!
        
Houve um total de ${findS.maxWinners} membro(s) que ganharam: ${findS.premio}
${users.size} usuários participaram do sorteio.
        
Ganhadores:
${winners.map(f => `<@${f}>`).join('\n')}`)
            .setColor("AQUA")
            .setTimestamp(new Date().setMilliseconds(findS.timeMs))
            .setFooter({ text: `Rede Revo | Encerrou <t:${currentTime().getTime() / 1000}:R>`, iconURL: interaction.guild.iconURL({ dynamic: true }) })


        message.edit({
            embeds: [embed]
        })
        findS.update({
            winnersId: JSON.stringify(JSON.stringify(winners)),
            ended: true
        })
    }
}

function currentTime() {
    const now = new Date((new Date()).toUTCString())
    now.setHours(now.getUTCHours() - 3)
    return now
}