const model = require("../models/guild")
const {EmbedBuilder,Message,Client} = require("discord.js");

/**
 * 
 * @param {Client} _ 
 * @param {Message} message 
 * @returns 
 */

module.exports = async (_,message) =>{
  if(message.author.bot) return;
        const { modlogChannel } = await model.findOne({ GuildID: message.guildId }) || { modlogChannel: null };
        if (!modlogChannel) return;
        if(message.channelId == modlogChannel) return;
      
        const channel = message.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new EmbedBuilder()
              .setAuthor({name:message.member.user.tag,iconURL: message.member.user.avatarURL()})
              .setDescription(`**${message.member} Tarafından ${message.channel} Kanalına Gönderilen Mesaj Silindi**`)
              .addFields({name:"Mesaj İçeriği",value:`\`\`\`${message.content}\`\`\``,inline:false})
              .setColor("#2ACAEA")
              .setFooter({text:`${message.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(err){
          console.log(err)
        }
 

}









//ArviS#0011