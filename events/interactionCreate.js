const {Client, CommandInteraction} = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

module.exports = async (client, interaction) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./komutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../komutlar/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
};









//ArviS#0011