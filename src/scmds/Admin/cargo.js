const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
  name: 'cargo',
  aliases: [''],
  category: 'Admin',
  description: 'Comando dos cargo \'-\'',
  usage: '',

    run: async(client, message) => {
        const prefix = db.fetch(`prefix_${message.guild.id}`) // You Can Do `const prefix = '+'` Too

        if(message.content.toLowerCase() === `${prefix}select-menu` || message.content.toLowerCase() === `${prefix}select-menu-roles`) {
            
            // First Option In Menu
            const Role1 = new MessageMenuOption()
            .setLabel('Cargo1') // Label
            .setDescription('Recebe bla') // Description, Limit Is 50
            .setEmoji('811297151069323274') // Emoji ID
            .setValue('carg1') // To Make Its Funtion When Use Click It

            const Role2 = new MessageMenuOption()
            .setLabel('Cargo2') 
            .setDescription('Recebe bla') 
            .setEmoji('806408246733832232') 
            .setValue('carg2')

            const Role3 = new MessageMenuOption()
            .setLabel('Cargo3') 
            .setDescription('Recebe bla') 
            .setEmoji('811297141669888040') 
            .setValue('carg3')

            const Role4 = new MessageMenuOption()
            .setLabel('Cargo4')
            .setDescription('Recebe bla')
            .setEmoji('811297109953347595') 
            .setValue('carg4') 

            const Menu = new MessageMenu()
            .setID('menu') // To Make Its Funtion When Use Click It
            .setPlaceholder('Escolha seus cargos')
            .addOption(Role1)
            .addOption(Role2)
            .addOption(Role3)
            .addOption(Role4)
            // .setMaxValues(4) // How Many Roles They Can Select // How Many Selection They Can Make // Maximum
            // .setMinValues(1) // How Many Roles They Can Select // How Many Selection They Can Make // Minimum

            const RoleMenu = new MessageActionRow()
            .addComponent(Menu)

            message.channel.send(`Select Roles By Choosing Options Below In Menu`, {
                component: RoleMenu
            })

        }
    }
}