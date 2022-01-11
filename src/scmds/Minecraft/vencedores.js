const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'vencedores',
    aliases: [''],
    category : 'Minecraft',
    description: 'Acesse a lista de vencedores das Guerras de Clans e eventos de Construção do Servidor',
    usage: '',

      run: async(client, interaction) => {

        let TarefaEmbed = new MessageEmbed()
        .setAuthor(`🏆 Lista de vencedores 🏆`)
        .setDescription(`
**Acompanhe os vencedores dos principais eventos da Rede Revo**

Atualmente na lista: \`Guerras de Clans\` e \`Evento Mensal de Construção\``)
        .setThumbnail('https://i.imgur.com/OryJbDT.png')
        .setColor(`#FF0000`);

        let button = new Discord.MessageButton()
        .setStyle('LINK')
        .setURL('https://1drv.ms/x/s!AoQJvjmmU2SrgqduSty2nMXN1hctWA?e=sICVV0') 
        .setLabel('Lista de Vencedores');
        
        interaction.editReply({
            components: [new Discord.MessageActionRow().addComponents(button)],
            embeds: [TarefaEmbed]
            })
      }
    }       