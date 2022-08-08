const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    GuildID: String,
    bKlm: [String],
   });
   
   module.exports = mongoose.model("yasaklıKelime", guildSh);









   //ArviS#0011