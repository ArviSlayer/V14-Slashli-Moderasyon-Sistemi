const {EmbedBuilder} = require("discord.js");const model = require("../models/guild")
module.exports  = async (_,oldChannel,newChannel) => {
        const { modlogChannel } = await model.findOne({ GuildID: oldChannel.guild.id }) || { modlogChannel: null };
    if (!modlogChannel) return;
  
    const channel = oldChannel.guild.channels.cache.get(modlogChannel);
    try{
      channel.send({
        embeds: [new EmbedBuilder()
          .setDescription(`**Kanal Güncellendi**`)

          .addFields([
            { name: "Eski Kanal Adı", value: `${oldChannel.name}`, inline: true },
            { name: "Eski Kanal Tipi", value: `${String(oldChannel.type)
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
            { name: "Kanal ID", value: `${newChannel.id}`, inline: true },
            { name: "Oluşturulma Tarihi", value: `<t:${parseInt(newChannel.createdTimestamp / 1000)}:R>`, inline: true },
            { name:"NSFW",value:`${newChannel.nsfw ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
          ])

          .addFields([
            { name: "Yeni Kanal Adı", value: `${newChannel.name}`, inline: false },
            { name: "Yeni Kanal Tipi", value: `${String(newChannel.type)
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
            { name: "Güncellenme Tarihi", value: `<t:${parseInt(new Date() / 1000)}:R>`, inline: true },
            { name:"NSFW",value:`${newChannel.nsfw ? "✅・Açık" : "❌・Kapalı"}`,inline:true},
          ])

          .setColor("Orange")
          .setFooter({text:`${oldChannel.guild.name}`})
          .setTimestamp()
        ]
      })
    }
    catch(e){
      console.log(e);
    }
 
}










//ArviS#0011