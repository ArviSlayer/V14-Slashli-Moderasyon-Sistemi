const mongoose = require("mongoose");

const banSchema = new mongoose.Schema({
  guildID: { type: String, default: null },
  roleID: { type: String, default: null },
  BanSystem: { type: Boolean, default: false },
  
  })

module.exports = mongoose.model("ban", banSchema);









//ArviS#0011