const Discord = require("discord.js"); 

module.exports = {
    name: 'clear',
    aliases: ['limpar'], 
    category : 'Admin', 
    description: 'Comando para limpar o canal',
    usage: '',
    options: [
        {
            name: "quantia",
            type: "INTEGER",
            description: "Quantidade de mensagens á serem apagados",
            required: true
        }
    ],

    run: async(client, interaction) => {
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
            let logfeito = new Discord.MessageEmbed()
            .setDescription(`O staff ${interaction.member.toString()} teve êxito em apagar **** mensagens no canal ${interaction.channel.toString()}.`)
            .setColor(`GREEN`)
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:PepoLixo_Revo:893232516088070175> LIMPO!`)
            .setDescription(`<:Alerta_Revo:870516091330388058> Limpei um total de \`${valor.length}\` mensagens.`)
            .setFooter(`Autor: ${interaction.user.username}`)
    
            interaction.channel.send({
                embeds: [embed]
            })
            interaction.guild.channels.cache.find(x => x.id === '793599388420800543').send({
                embeds: [logfeito]
            })

    } catch(error) {
        console.log(error)
    }
}
}