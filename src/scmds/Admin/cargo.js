const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'cargo',
    aliases: [''],
    categories : '',
    description: 'Comando dos cargo \'-\'',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return;

        const anuncioEmoji = `📢`;
        const atualizacaoEmoji = `📔`;
        const eventoEmoji = `🎉`;
        const enqueteEmoji = `📊`;
        const spoilerEmoji = `🤐`;
        const videoEmoji = `🎬`;
  
        let embed = new MessageEmbed()
        .setColor('#376e60')
        .setTitle('Seleção de cargos para Notificações')
        .setDescription('**Selecione o(s) emoji(s) que corresponde ao(s) cargo(s) em que você deseja receber notificações em nosso discord!** \n\n\n'
        + `${anuncioEmoji} Notificar Anúncios - Seja notificado sempre que anunciarmos algo importante\n\n`
        + `${atualizacaoEmoji} Notificar Atualizações - Seja notificado sempre que alguma mudança e novidades forem introduzidas ao servidor\n\n`
        + `${eventoEmoji} Notificar Eventos - Seja notificado em anúncios de eventos que acontecem dentro do servidor\n\n`
        + `${enqueteEmoji} Notificar Enquetes - Seja notificado sempre que iniciarmos uma enquete\n\n`
        + `${spoilerEmoji} Notificar Spoilers - Seja notificado com spoilers do servidor\n\n`
        + `${videoEmoji} Notificar Vídeos - Seja notificado de vídeos/transmissões realizadas no servidor`);
  
        let messageEmbed = await interaction.channel.send({
          embeds: [embed]
        });
        messageEmbed.react(anuncioEmoji);
        messageEmbed.react(atualizacaoEmoji);
        messageEmbed.react(eventoEmoji);
        messageEmbed.react(enqueteEmoji);
        messageEmbed.react(spoilerEmoji);
        messageEmbed.react(videoEmoji);
      }
    }