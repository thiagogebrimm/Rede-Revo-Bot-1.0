const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'ship',
    aliases: [''],
    categories : '',
    description: 'Shipar pessoas',
    usage: '',
    options: [
        {
            name: 'user1',
            required: true,
            type: 'USER',
            description: 'Quem é o primeiro usuario?'
        },
        {
            name: 'user2',
            required: true,
            type: 'USER',
            description: 'Quem é o segundo usuario?'
        }
    ],
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        var FirstUser = interaction.options.getMember('user1')
        var SecondUser = interaction.options.getMember('user2')

        if (FirstUser || SecondUser) {
            const FirstUserSliced = FirstUser.user.username.slice(0, FirstUser.user.username.length / 2)
            const SecondUserSliced = SecondUser.map(user => { return user.user.username.slice(user.user.username.length / 2) })
            const SecondUserName = SecondUser.map(user => { return user.user.username })

            interaction.editReply(`${FirstUser.user.username} + ${SecondUserName} = **${FirstUserSliced}${SecondUserSliced}**`)
        }
      }
    }