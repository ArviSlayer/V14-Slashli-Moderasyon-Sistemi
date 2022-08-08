const mongoose = require("mongoose");

const banSchema = new mongoose.Schema({
  guildID: { type: String, default: null },
  roleID: { type: String, default: null },
  KickSystem: { type: Boolean, default: false },
  })

module.exports = mongoose.model("kick", banSchema);









//ArviS#0011