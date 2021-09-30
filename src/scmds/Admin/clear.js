const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'limpares',
    aliases: ['cleares2'], 
    categories : 'adm', 
    description: 'Comando de limpar o canal.',
    usage: '',
    options: [
        {
            name: "quantia",
            type: "INTEGER",
            description: "Quantidade de mensagens á serem apagados",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.editReply(`Você não tem permissão para isso.`) // caso o autor nao possua, vamos dar o erro
 
        let clean = interaction.options.get("quantia").value
     // caso o membro bote um numero menor que 2, ou maior que 100, pediremos um numero acima
        if (clean < 2 || clean > 100) return interaction.editReply(`Escreva um número de: \`2 à 100\` >:v.`)
        // caso o membro não escreva um numero
        try { // utilizando a function 'try', traduzindo: tentar
            const valor = await interaction.channel.messages.fetch({
                limit: clean
            }).then(valor => valor.toJSON())

            
            
            interaction.channel.bulkDelete(clean) // tentaremos deletar a quantia que o membro pediu
            // enviando uma embed
            let embed = new Discord.MessageEmbed()
    
            .setTitle(`<:lixo:860124969223716865> LIMPEZA!`)
            .setDescription(`<:aviso:854929386394615848> Limpei um total de \`${valor.length}\` mensagens.`)
            .setFooter(`Autor: ${interaction.user.username}`)
    
            interaction.channel.send({
                embeds: [embed]
            })

    } catch(error) {
        console.log(error)
    }
}
}