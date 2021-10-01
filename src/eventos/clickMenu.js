module.exports = async (bot, m) => {
    if(m.values[0] === 'carg1') { // If User Click WikiPedia Then This Will Happen
        m.reply.defer()
        m.clicker.member.roles.add('811328887120199720') // Add WikiPedia Role
        m.channel.send(`<@${m.clicker.id}> Added WikiPedia Role`).then(msg => { // Send A Message In That Channel
            msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
        })
        // m.clicker.member.send(`Added WikiPedia Role`) // Send A DM Also
    } else if(m.values[0] === 'carg2') { // If User Click YouTube Then This Will Happen
        m.reply.defer()
        m.clicker.member.roles.add('811328860414541884') // Add YouTube Role
        m.channel.send(`<@${m.clicker.id}> Added YouTube Role`).then(msg => { // Send A Message In That Channel
            msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
        })
        // m.clicker.member.send(`Added YouTube Role`) // Send A DM Also
    } else if(m.values[0] === 'carg3') { // If User Click VS Code Then This Will Happen
        m.reply.defer()
        m.clicker.member.roles.add('811328908468420628') // Add VS Code Role
        m.channel.send(`<@${m.clicker.id}> Added VS Code Role`).then(msg => { // Send A Message In That Channel
            msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
        })
        // m.clicker.member.send(`Added VS Code Role`) // Send A DM Also
    } else if(m.values[0] === 'carg4') { // If User Click GitHub Then This Will Happen
        m.reply.defer()
        m.clicker.member.roles.add('811328963049553931') // Add GitHub Role
        m.channel.send(`<@${m.clicker.id}> Added GitHub Role`).then(msg => { // Send A Message In That Channel
            msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
        })
        // m.clicker.member.send(`Added GitHub Role`) // Send A DM Also
    }
}
