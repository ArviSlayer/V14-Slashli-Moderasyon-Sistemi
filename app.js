//MODÜLLER
const {Client, Routes, REST} = require('discord.js');
const client = new Client({intents:519});
const fs = require('fs');
const db = require('mongoose');
// const {REST} = require('@discordjs/rest');
const { joinVoiceChannel } = require('@discordjs/voice');
const {token, mongoDB} = require("./ayarlar.json")
//MODÜLLER SON

//DATABASE LOAD
db.connect(mongoDB)
.then(() => console.log("MongoDB'ye Başarıyla Bağlanıldı"))
.catch(err => console.log("MongoDB Bağlantısı Başarısız Oldu: "+err));
//DATABASE LOAD SON

global.client = client;
client.commands = (global.commands = []);

//KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);
    
        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             type: props.type,
        })
        console.log(`Slash Komutu Yüklendi: ${props.name}`);
    });
});
//KOMUTLAR LOAD SON

//EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        console.log(`Event Yüklendi: ${eventName}`);
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});
//EVENTS LOAD SON

//CLIENT READY
client.on("ready",async () => {
client.user.setActivity("ArviS#0011", {type:"WATCHING"});

 client.channels.fetch("990362728734556214") 
  .then((channel) => { 

      const VoiceConnection = joinVoiceChannel({
          channelId: "990362728734556214", 
          guildId: "990362728197681162",
          selfDeaf: false,
          adapterCreator: channel.guild.voiceAdapterCreator
    });
  });

  client.channels.fetch("1005897567147675668") 
  .then((channel) => { 
    
      const VoiceConnection = joinVoiceChannel({
          channelId: "1005897567147675668", 
          guildId: "1005897566333980853",
          selfDeaf: false,
          adapterCreator: channel.guild.voiceAdapterCreator
    });
  });

    console.log(`${client.user.tag}: Aktif`);
    
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });
    
    } catch (error) {
      console.error(error);
    }
});
//CLIENT READY SON

client.login(token);









//ArviS#0011