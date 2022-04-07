
const { Message } = require("discord.js");
const M = require("../src/db/Models/Message");
const pms = require("parse-ms")
/**
 * 
 * @param {Message} message 
 */
module.exports = async (message) => {
    const findM = await M.findOne({
        where: {
            messageId: message.id,
            deleted: false
        }
    })

    if(!findM) return;
    const milisegundos = findM.timeMs
    if(findM.time - currentTime().getTime() < 0) {
        exec()
    } else {
        setTimeout(() => {
            exec()
        }, findM.time - currentTime().getTime())
    }

    async function exec() {
        await findM.update({
            deleted: true
        })

        message.delete()
    }
}

function currentTime() {
    const now = new Date((new Date()).toUTCString())
    now.setHours(now.getUTCHours()-3)
    return now
}