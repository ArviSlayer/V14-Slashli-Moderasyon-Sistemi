const model = require("../models/guild")
const {EmbedBuilder, Role, Client} = require("discord.js");
const yetkiler = require("../perm.json");

/**
 * 
 * @param {Client} _ 
 * @param {Role} oldRole 
 * @param {Role} newRole 
 * @returns 
 */

module.exports = 
    async (_,oldRole,newRole) => {
        
        const { modlogChannel } = await model.findOne({ GuildID: oldRole.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        if(oldRole.permissions.toArray() === newRole.permissions.toArray()) return;

        // console.log(oldRole.permissions.toArray())
        // console.log(newRole.permissions.toArray())
        // let eklendi;
        // newRole.permissions.toArray().map(x => {
                
        //   if(oldRole.permissions.toArray().includes(x)) return;
        //   x = x.replace(",",", ");
        //   return eklendi += yetkiler[x];
        // })

        const channel = oldRole.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new EmbedBuilder()
              .setDescription(`**Rol Güncellendi**`)
              .addFields(
                {name:"Eski Rol Adı",value:oldRole.name,inline:true},
              {name:"Eski Rol Rengi",value:`${oldRole.hexColor}`,inline:true},
              {name:"Eski Rol İkonu",value:oldRole.iconURL() ? `[Görüntüle](${oldRole.iconURL()})`:"İcon Yok",inline:true},
              

              {name:"Yeni Rol Adı",value:newRole.name,inline:true},
              {name:"Yeni Rol Rengi",value:`${newRole.hexColor}`,inline:true},
              {name:"Yeni Rol İkonu",value:newRole.iconURL() ? `[Görüntüle](${newRole.iconURL()})`:"İcon Yok",inline:true},
              {name:"Güncellenme Tarihi",value:`<t:${parseInt(new Date() / 1000)}:R>`,inline:true},
              {name:"Güncellenen Yetkiler",value:`**Eklenen Yetkiler**
              ${newRole.permissions.toArray().map(x => {
                if(oldRole.permissions.toArray().includes(x)) return;
                return yetkiler[x];
              }).join(", ")}
              **Kaldırılan Yetkiler**
              ${
                oldRole.permissions.toArray().map(x => {
                  if(newRole.permissions.toArray().includes(x)) return;
                  return yetkiler[x];
                }).join(", ")
              }
              `,inline:false}

              )
              .setColor("Orange")
              .setFooter({text:`${newRole.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(e){
          console.log(e)
        }
}









//ArviS#0011