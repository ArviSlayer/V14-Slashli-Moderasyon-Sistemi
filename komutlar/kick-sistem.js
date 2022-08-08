const { Client,CommandInteraction,PermissionsBitField } = require("discord.js");
const model = require("../models/kick")
module.exports = {
    name:"kick-sistem",
    description: 'Kick Sistemini Ayarlar',
    type:1,
    options:[
        {
          name:"ayarla",description:"Kick Sistemini Ayarlar",type:1,options:[
            {
                name:"rol",
                description:"Kick Yetilisi Rolü",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"sıfırla",
            description:"Kick Sistemini Sıfırlar",
            type:1
        }
        
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {  

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({content:"Bu Komutu Kullananabilmek İçin Yetkin Yok",ephemeral:true})

        let durum = interaction.options.getSubcommand();

        if(durum == "ayarla"){
            let rol = interaction.options.getRole("rol");
          
             await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { roleID: rol.id, KickSystem:true } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Kick Sistemi Başarıyla Ayarlandı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Kick Sistemi Ayarlanırken Bir Hata Oluştu"})
             })
             return;
        }
        else if(durum == "sıfırla"){
            const { KickSystem } = await model.findOne({ guildID: interaction.guild.id }) || { KickSystem: false };
            if (!KickSystem) return interaction.reply({content:"Kick Sistemi Zaten Kapalı",ephemeral:true});

            await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { KickSystem:false, roleID: null } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Kick Sistemi Başarıyla Kapatıldı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Kick Sistemi Ayarlanırken Bir Hata Oluştu"})
             })

             return;
        }
       
        
}
};









//ArviS#0011