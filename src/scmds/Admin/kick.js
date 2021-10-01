const Discord = require("discord.js"); 

module.exports = {
    name: 'expulsar',
    aliases: ['kick'], 
    categories : 'Admin', 
    description: 'Comando para expulsar um membro.',
    usage: '',
    options: [
        {
            name: "usuario",
            type: "USER",
            description: "Selecione o usuario para expulso!",
            required: true
        },
        {
            name: "motivo",
            type: "STRING",
            description: "Selecione o porque o usuario deve ser expulso!",
            required: true
        },
    ],
    run: async(client, interaction) => {
        const member = interaction.options.get("usuario").member
  
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.editReply("Permissões insuficientes!") // caso o membro não possua a permissão 'EXPULSAR_MEMBROS', vamos botar o erro
    
       
        if (!member) return interaction.editReply("digite **t.kick (usuário) (motivo)**, caso queira expulsar alguém.") // caso o autor esqueça de mencionar um membro, vamos dar o erro
        if (!member.kickable) return interaction.editReply("não é possível punir esse usuário.") // caso o membro tenha um cargo acima do seu bot, ele não vai expulsar
        let reason = interaction.options.get("motivo")
        if (!reason) reason = "Nenhuma razão fornecida." // caso nao haja, daremos com tal mensagem
    
    
    
       
    
        await member.kick({
            reason
        }) // finalizando com o kick vai ser assim smm xau
    console.log(member.username + " foi expulso")
          let pEmbed = new Discord.MessageEmbed()
              .setTitle("<:grade:839619780654006274> EXPULSÃO!")
              .setDescription(`<:alerta_h:854929287525957642> ➠ **Usuário expulso:** ${member.user.tag} \n <:3857_pepe_police:854927430850445313> ➠ **Expulso por:** ${interaction.user.tag} \n <:NetherStart:859788804789108797> ➠ **Motivo:** ${reason}`)
              .setFooter(`Autor: ${interaction.user.tag}`, interaction.user.displayAvatarURL)
              .setColor("ORANGE")
          
        interaction.guild.channels.cache.get(`844251449391448085`).send(pEmbed);
    
        interaction.channel.send("Usuário expulso com sucesso!")
    
    }
}