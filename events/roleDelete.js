const model = require("../models/guild")
const {EmbedBuilder} = require("discord.js");
module.exports = async (_,role) => {

        const { modlogChannel } = await model.findOne({ GuildID: role.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        const channel = role.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new EmbedBuilder()
              .setDescription(`**Rol Silindi**`)
              .addFields({name:"Rol Adı",value:role.name,inline:true},
              {name:"Rol Rengi",value:`${role.hexColor}`,inline:true},
              {name:"Rol İkonu",value:role.iconURL() ? `[Görüntüle](${role.iconURL()})`:"İcon Yok",inline:true}
              )
             
              .setColor("Red")
              .setFooter({text:`${role.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(err){
        // console.log(err)
        }
 
}









//ArviS#0011