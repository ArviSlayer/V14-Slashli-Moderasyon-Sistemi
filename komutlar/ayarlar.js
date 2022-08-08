const { EmbedBuilder,CommandInteraction,Client,Permissions } = require("discord.js");
const guildData = require("../models/guild");
const banData = require("../models/ban");
const kickData = require("../models/kick");
module.exports = {
    name:"ayarlar",
    description: 'Sunucu Ayar Menüsü',
    type:1,
    options:[],
    
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    
    run: async (client, interaction) => {

        let modlg;
        let banD;
        let kick;
        const {kfrEngel,lnkEngl,modlogChannel,kelimeEngl} = await guildData.findOne({ GuildID: interaction.guild.id }) || {kfrEngel:false,lnkEngl:false,modlogChannel:null,kelimeEngl:false};
        if(!modlogChannel) modlg = false;
        else modlg = true;

        

        const {BanSystem} = await banData.findOne({ GuildID: interaction.guild.id }) || {BanSystem:false};
        if(!BanSystem) banD = false; else banD = true;
        const {KickSystem} = await kickData.findOne({ GuildID: interaction.guild.id }) || {KickSystem:false};
        if(!KickSystem) kick = false; else kick = true;

        const embed = new EmbedBuilder()
        .setTitle(`${interaction.guild.name} | Sunucu Ayarları`)
        .addFields([
            {name:"Ban Sistemi",value:`${banD ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
            {name:"Kick Sistemi",value:`${kick ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
            {name:"Küfür Engel Sistemi",value:`${kfrEngel ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
            {name:"Kelime Engel Sistemi",value:`${kelimeEngl ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
            {name:"Link Engel Sistemi",value:`${lnkEngl ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
            {name:"Mod-Log Kanalı",value:`${modlg ? "✅・Ayarlanmış" : "❌・Ayarlanmamış"}`,inline:true},
        ])

        interaction.reply({embeds:[embed]});
    }
};









//ArviS#0011