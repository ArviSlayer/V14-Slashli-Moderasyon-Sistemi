const {EmbedBuilder} = require("discord.js");const model = require("../models/guild")
module.exports = async (_,channel) => {
  // console.log(channel.type)
        const { modlogChannel } = await model.findOne({ GuildID: channel.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        const logs = channel.guild.channels.cache.get(modlogChannel);
        try{
          logs.send({
            embeds: [new EmbedBuilder()
              .setDescription(`**Yeni Kanal Oluşturuldu**`)
              .addFields([
                { name: "Kanal Adı", value: `${channel.name}`, inline: true },
                { name: "Kanal Tipi", value: `${String(channel.type)
                .replace(0,"Yazı Kanalı")
                .replace(2,"Ses Kanalı")
                .replace(4,"Kategori")
                .replace(5,"Duyuru Kanalı")
                .replace(11,"Herkese Açık Alt Başlık Kanalı")
                .replace(13,"Sahne Kanalı")
                .replace(14,"Rehber Kanalı")
                .replace(15,"Forum Kanalı")
              }`
                , inline: true },
                { name: "Kanal ID", value: `${channel.id}`, inline: true },
                { name: "Oluşturulma Tarihi", value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`, inline: true },
                { name:"NSFW",value:`${channel.nsfw ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
              ])
              .setColor("Green")
              .setFooter({text:`${channel.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(err){
        console.log(err)
        }
 
}









//ArviS#0011