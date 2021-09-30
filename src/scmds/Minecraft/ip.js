
module.exports = {
    name: 'ip',
    aliases: [''],
    categories : '',
    description: 'Veja o nosso IP!',
    usage: '',

      run: async(client, interaction) => {
        let embed = new MessageEmbed() 
        .setColor(`#0099ff`) 
        .setTitle(`Atualmente nosso ip é`) 
        .setDescription('<a:DirtyPulando_Revo:852710345012543490> **IP:** rederevo.com\n\n**<a:DirtyPulando_Revo:852710345012543490> Bedrock:** jogar.rederevo.com:19132')
        .setFooter('Rede Revo', 'https://i.imgur.com/dMswI7f.png');
     await interaction.editReply({
       embeds: [embed]
     }); 
      }
    }