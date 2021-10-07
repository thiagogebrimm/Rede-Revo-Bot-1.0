const { MessageEmbed } = require("discord.js")

module.exports = async (bot, oldState, newState) => {

    let newUserChannel = newState.channel
    let oldUserChannel = oldState.channel
  
    if(oldUserChannel === null && newUserChannel !== null) {
       // User Joins a voice channel
      console.log('entrou ');
  
    } else if(newUserChannel === null){
      // User leaves a voice channel
      console.log(`saiu <#${oldUserChannel}>`);
  
    }
  };