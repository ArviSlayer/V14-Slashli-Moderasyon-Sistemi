const { Client,CommandInteraction,PermissionsBitField  } = require("discord.js");
const model = require("../models/ban")
module.exports = {
    name:"ban-sistem",
    description: 'Ban Sistemini Ayarlar',
    type:1,
    options:[
        {
          name:"ayarla",description:"Ban Sistemini Ayarla",type:1,options:[
            {
                name:"rol",
                description:"Ban Yetilisi Rolü",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"sıfırla",
            description:"Ban Sistemini Sıfırlar",
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
        return interaction.reply({content:"Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok",ephemeral:true})

        let durum = interaction.options.getSubcommand();

        if(durum == "ayarla"){
            let rol = interaction.options.getRole("rol");
            const { roleID,BanSystem } = await model.findOne({ guildID: interaction.guild.id }) || { roleID: null };
             await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { roleID: rol.id, BanSystem:true } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Ban Sistemi Başarıyla Ayarlandı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Ban Sistemi Ayarlanırken Bir Hata Oluştu"})
             })
             return;
        }
        else if(durum == "sıfırla"){
            const { BanSystem } = await model.findOne({ guildID: interaction.guild.id }) || { BanSystem: false };
            if (!BanSystem) return interaction.reply({content:"Ban Sistemi Zaten Kapalı",ephemeral:true});

            await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { BanSystem:false, roleID: null } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Ban Sistemi Başarıyla Kapatıldı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Ban Sistemi Ayarlanırken Bir Hata Oluştu"})
             })

             return;
        }
       
        
}
};









//ArviS#0011