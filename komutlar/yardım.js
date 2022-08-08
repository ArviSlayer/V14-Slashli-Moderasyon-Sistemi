const { CommandInteraction,Client } = require("discord.js");
module.exports = {
    name:"yardım",
    description: 'Yardım Menüsü',
    type:1,
    options:[],

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

    run: async (client, interaction) => {
        interaction.reply({embeds:[
            {
                title: "Yardım Menüsü",
                color: 0xFF6600,
                fields:[
                    {name: "/ayarlar", value: "Sunucu Ayarları", inline: true},
                    {name: "/ban", value: "Kullanıcıyı Banlar", inline: true},
                    {name: "/ban-sistem", value: "Ban Sistemi", inline: true},
                    {name: "/unban", value: "Kullanıcının Banını Açar", inline: true},
                    {name: "/kick", value: "Kullanıcıyı Sunucudan Atar", inline: true},
                    {name: "/kick-sistem", value: "Kick Sistemi", inline: true},
                    {name: "/küfür-engel", value: "Küfür Engelleme Sistemi", inline: true},
                    {name: "/kelime-engel", value: "Kelime Engelleme Sistemi", inline: true},
                    {name: "/link-engel", value: "Link Engelleme Sistemi", inline: true},
                    {name: "/nuke", value: "Kanalı Temizler Ve Yeniden Oluşturur", inline: true},
                    {name: "/sil", value: "Belirtilen Miktarda Mesajı Siler", inline: true},
                    {name: "/mod-log", value: "Log Mesajlarının Gideceği Kanalı Ayarlar", inline: true},

                ],
                thumbnail: {url: client.user.avatarURL({dynamic:true})},
            }
        ]});
}
};









//ArviS#0011
