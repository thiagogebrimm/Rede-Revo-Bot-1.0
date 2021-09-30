const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'destrancar',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de destrancar o canal atual.',
    usage: '',
    options: [
        {
            name: "canal",
            type: "CHANNEL",
            description: "Selecione o canal para destrancar!",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const canal = interaction.options.get("canal").channel
        if(canal.isText()) {
            if (!interaction.member.permissions.has("MANAGE_ROLES")) {
                let a0 = new Discord.MessageEmbed()
                    .setTitle(`<:chave:839615773227876414> LOCK!`)
                    .setDescription(`<:aviso:854929386394615848> Você não tem permissão para isso.`)
                    .setColor(`ORANGE`)
                    .setFooter(`RedeTower • Todos direitos reservados.`, client.user.avatarURL())
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL())
                return interaction.editReply({
                    embeds: [
                        a0
                    ]
                })
        
            }
            var da = interaction.guild.roles.cache.find(role => role.name === "Membro");
            canal.permissionOverwrites.edit(da, {
                SEND_MESSAGES: true
        
            })
        
            let a1 = new Discord.MessageEmbed()
                .setTitle(`<:offline:810635638235856947> CHAT BLOQUEADO!`)
                .setDescription(`O canal ${canal} foi bloqueado por ${interaction.user.username}.`)
                .setColor(`RED`)
                .setFooter(`Autor: ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png"}))
                interaction.editReply({
                    embeds: [
                        a1
                    ]
                })
                return canal.send({
                    embeds: [
                        a1
                    ]
                })
        } else {
            interaction.editReply("Você não pode trancar um canal que não é um canal de texto!")
        }
    }
}