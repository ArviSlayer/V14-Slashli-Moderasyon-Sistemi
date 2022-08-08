const { EmbedBuilder, PermissionsBitField, Client, CommandInteraction } = require("discord.js");
const model = require("../models/ban")
module.exports = {
    name:"Ban",
    description: 'Kullanıcıyı Sunucudan Uzaklaştırır',
    type:1,
    options: [
        {
            name:"user",
            description:"Yasaklanıcak Kullanıcıyı Seçin",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi Sebepten Dolayı Yasaklanacak?",
            type:3,
            required:true
        },
    ],

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

    run: async (client, interaction) => {
        const data = await model.findOne({ guildID: interaction.guild.id }) || null;

       const banRol = data ? data.roleID : null;

       if(
           interaction.member.roles.cache.has(banRol) ||
           interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
           
        )
        {
           
            const user = interaction.options.getMember('user')
            const sebep = interaction.options.getString('reason')

            if(user.id === interaction.member.id) return interaction.reply({content:"Kendini Yasaklayamazsın",ephemeral:true})
            if(user.id === client.user.id) return interaction.reply({content:"Kendimi Yasaklayamam",ephemeral:true})
            if(user.id === interaction.guild.ownerID) return interaction.reply({content:"Sunucu Sahibini Yasaklayamazsın",ephemeral:true})
            if(user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content:"Bu Kullanıcıyı Yasaklayamazsın",ephemeral:true})
            if(user.roles.cache.has(banRol)) return interaction.reply({content:"Bunu, Ban Yetkilisi Üzerinde Yapamazsın",ephemeral:true})

            try{
    
            
            await interaction.guild.bans.fetch(id)
            .then(() => { interaction.reply("Bu Kullanıcı Zaten Yasaklanmış"); })
            }
        
        catch{
                user.ban({reason: sebep});
                const embed = new EmbedBuilder()
                .setAuthor({name:interaction.member.user.tag,iconURL:interaction.member.user.avatarURL({dynamic:true})})
                .setDescription(`<@!${user.id}> Adlı Kullanıcı Yasaklandı`)
                .setColor("RED");
                interaction.reply({embeds:[embed]});
        
        }
    }
    else
       return interaction.reply({content:"Bu Komutu Kullanabilmek İçin Gerekli Yetkin Yok",ephemeral:true});
           
}
};









//ArviS#0011