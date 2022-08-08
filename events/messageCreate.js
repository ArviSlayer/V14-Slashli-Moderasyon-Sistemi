const model = require("../models/guild");
const klm = require("../models/yasaklıKelime");
const kelimeler = require("../kfr.json");
const linkler = require("../lnks.json");
const {Client,Message,PermissionsBitField} = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
    const {kfrEngel,lnkEngl,kelimeEngl} = await model.findOne({ GuildID: message.guild.id }) || { kelimeEngl:false,kfrEngel: false, lnkEngl: false };
    
    if(kfrEngel)
    {
            let blacklist = kelimeler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`${message.author}, Bu Sunucuda Küfür Edemezsin`
                }]
            });
            return;
        }
    }
    if(lnkEngl)
    {
        let blacklist = linkler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`${message.author}, Bu Sunucuda Reklam Yapamazsın`
                }]
            });
            return;
        }
    }
    if(kelimeEngl)
    {       const {bKlm} = await klm.findOne({ GuildID: message.guild.id }) || {bKlm:null};
            if(!bKlm) return;
            let blacklist = bKlm;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`${message.author}, Bu Kelime Bu Sunucuda Yasaklanmış`
                }]
            });
            return;
        }
    }
}









//ArviS#0011