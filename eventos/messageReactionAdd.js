
module.exports = async (bot, reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    // Anúncios
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '📢') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('795509121503068222')
        }
    }
    // Atualizações
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '📔') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('795509113307004938')
        }
    }
    // Eventos
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '🎉') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('795509107503267880')
        }
    }
    // Enquetes
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '📊') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('795509120459079740')
        }
    }
    // Spoilers
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '🤐') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('847514407789658123')
        }
    }
    // Vídeos
    if(reaction.message.id === '864226954919018496'){
        if(reaction.emoji.name === '🎬') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('795509471014420532')
        }
    }
}