const {EmbedBuilder} = require("discord.js");const model = require("../models/guild")
module.exports = async (_,member) =>{

    const { modlogChannel } = await model.findOne({ GuildID: member.guild.id }) || { modlogChannel: null };
    if (!modlogChannel) return;
  
    const channel = member.guild.channels.cache.get(modlogChannel);
    try{
      channel.send({
        embeds: [new EmbedBuilder()
          .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
          .setDescription(`**${member}** Adlı Kullanıcı Sunucuya Katıldı
          Hesap Oluşturulma Tarihi: <t:${parseInt(member.user.createdTimestamp) / 1000}:R>`)
          .setThumbnail(member.user.avatarURL({dynamic:true}))
          .setColor("#2ACAEA")
          .setFooter({text:`${member.guild.name}`})
          .setTimestamp()
        ]
      })
    }
    catch{
  
    }
    }









    //ArviS#0011