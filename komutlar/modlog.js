const {Client, CommandInteraction, EmbedBuilder, PermissionsBitField} = require("discord.js");
const model = require("../models/guild");
module.exports = {
    name:"mod-log",
    description:"Mod Log Ayarları",
    type:1,
    options:[
        {
            name:"ayarla",
            description:"Mod-Log Kanalını Ayarlar",
            type:1,
            options:[{name:"log_kanalı",description:"Mod-Log Kanalını Ayarlar",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"sıfırla",
            description:"Mod-Log Kanalını Sıfırlar",
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
        {
         // interaction.deferReply();
          interaction.reply({content:"Bu Komutu Kullanabilmek İçin Yetkin Yok",ephemeral:true});
          return;
        }
        let SubCmd = interaction.options.getSubcommand();
       // interaction.deferReply();
        switch(SubCmd){
            case "ayarla":{
                let log_kanalı = interaction.options.getChannel("log_kanalı");
                await model.updateOne({GuildID: interaction.guild.id},{modlogChannel: log_kanalı.id},{upsert:true});
                interaction.reply({embeds:[new EmbedBuilder().setTitle("Mod-Log Kanalı Ayarlandı").setColor("#00ff09").setDescription(`Mod-Log Sistemi Ayarlandı - Mod-Log Kanalınız: <#${log_kanalı.id}>`)]});
                break;
            }
            case "sıfırla":{
                await model.updateOne({GuildID: interaction.guild.id},{modlogChannel: null},{upsert:true});
                interaction.reply({embeds:[new EmbedBuilder().setTitle("Mod-Log Kanalı Sıfırlandı").setColor("#ff0000").setDescription(`Mod-Log Sistemi Sıfırlandı - Artık Sunucunuzda Mod-Log Kanalı Yok`)]});
                break;
            }
        }


    }
}









//ArviS#0011