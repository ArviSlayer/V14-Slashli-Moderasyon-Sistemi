const { MessageEmbed,CommandInteraction,Client,PermissionsBitField } = require("discord.js");
module.exports = {
    name:"nuke",
    description: 'Kanalı Temizler Ve Yeniden Oluşturur',
    type:1,
    options:[],

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: `Bu Komutu Kullanabilmek İçin Yetkin Yok`, ephemeral: true});

       let kanal = interaction.channel;
       kanal.clone(kanal.name, {reason: "Yeniden Oluşturma"}).then(async knl => {
           knl.setPosition(kanal.position);
           kanal.delete();
           knl.send(`Kanal Yeniden Oluşturuldu`).then( msg => {
               setTimeout( function() {
                   msg.delete();
               },2000
               )
            })
        })
}
};









//ArviS#0011