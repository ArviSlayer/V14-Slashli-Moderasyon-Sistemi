const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    GuildID: String,
    kfrEngel: Boolean,
    lnkEngl: Boolean,
    modlogChannel: String,
    kelimeEngl: Boolean,
   });
   
   module.exports = mongoose.model("guild", guildSh);









   //ArviS#0011