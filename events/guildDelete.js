const guildData = require("../models/guild");
const banData = require("../models/ban");
const kickData = require("../models/kick");
const banKlm = require("../models/yasaklıKelime");
module.exports = async (_,guild) => {
    const durum = await guildData.findOne({ GuildID: guild.id }) || null;
    if(!durum) return;

    try{
        await guildData.deleteOne({ GuildID: guild.id });
        await banData.deleteOne({ GuildID: guild.id });
        await kickData.deleteOne({ GuildID: guild.id });
        await banKlm.deleteOne({ GuildID: guild.id });
    }catch(err){console.log(err)}
    

    


}









//ArviS#0011