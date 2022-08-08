const { PermissionsBitField,Client,CommandInteraction,EmbedBuilder } = require("discord.js");
const model = require("../models/guild");
const klm = require("../models/yasaklıKelime");
module.exports = {
  name: "kelime-engel",
  description: "Kelime Engel Sistemi",
  type:1,
  options: [
    {
      type: 1,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      options:[{
        name:"sistem-durumu", required:true,
        description: "Sistem Durumunu Ayarlarsınız",type:3,
        choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
      }]
    },
    {
      type: 1,
      name: "ekle",
      description: "Sisteme Yeni Kelime Ekler",
      options:[{name:"kelime",description:"Eklenecek Kelimeyi Gir",required:true,type:3}]
    },
    {
      type: 1,
      name: "sil",
      description: "Sistemden Bir Kelimeyi Siler",
      options:[{name:"kelime",description:"Kaldırılacak Kelimeyi Gir",required:true,type:3}]
    },
    {
      type: 1,
      name: "liste",
      description: "Sistemdeki Tüm Yasaklanmış Kelimleri Gösterir",
      options:[]
    },
    {
      type: 1,
      name: "temizle",
      description: "Sistemdeki Tüm Yasaklanmış Kelimleri Siler",
      options:[]
    },
  ],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */

  run: async (client, interaction) => {
    
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return interaction.reply({content: `Bu Komutu Kullanamazsın`, ephemeral: true});

    const SubCmd = interaction.options.getSubcommand();
    const guild = interaction.guild;
    switch(SubCmd){
      case "durum":{
        const durum = interaction.options.get("sistem-durumu").value;
        if(durum === "aktif"){

          await model.updateOne({GuildID:guild.id},{kelimeEngl:true},{upsert:true});
          interaction.reply({ embeds:[new EmbedBuilder().setTitle("Kelime Engelleme Sistemi Aktif").setColor("#00ff09").setDescription(`Kelime Engelleme Sistemi Yönetici Tarafından Aktif Edildi, Artık İstemediğiniz Kelimeler Engellenecek`)] });
        }else if(durum === "pasif"){
          await model.updateOne({GuildID:guild.id},{kelimeEngl:false},{upsert:true});
          interaction.reply({ embeds:[new EmbedBuilder().setTitle("Kelime Engelleme Sistemi Pasif").setColor("#ff0000").setDescription(`Kelime Engelleme Sistemi Yönetici Tarafından Devre Dışı Bırakıldı, Artık İstemediğiniz Kelimler Engelenmeyecek`)] });
        }
        break;
      }

      case "ekle":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil`, ephemeral: true});
        const kelime = interaction.options.getString("kelime");
        const d = await klm.findOne({bKlm:kelime});
        if(d) return interaction.reply({content: `Bu Kelime Zaten Ekli`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$push:{bKlm:kelime}},{upsert:true});
        interaction.reply({embeds: [{
          description:`\`${kelime}\` Kelimesi, Yasaklanan Kelimelere Eklendi`
        }]});
        break;
      }

      case "sil":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil`, ephemeral: true});
        const kelime = interaction.options.getString("kelime");
        const d = await klm.findOne({bKlm:kelime});
        if(!d) return interaction.reply({content: `Bu Kelime Zaten Eklenmemiş`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$pull:{bKlm:kelime}},{upsert:true});
        interaction.reply({embeds:[
          {
            description:`\`${kelime}\` Kelimesi, Yasaklanan Kelimelerden Silindi`
          }
        ]});
        break;
      }
      case "liste":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil`, ephemeral: true});
        const d = await klm.findOne({GuildID:guild.id});
        if(!d) return interaction.reply({content: `Sistemde Hiç Yasaklanmış Kelime Yok`, ephemeral: true});
        if(d.bKlm.length <= 0) return interaction.reply({content: `Sistemde Hiç Yasaklanmış Kelime Yok`, ephemeral: true});
        const kelimeler = d.bKlm.join(", ");
        interaction.reply({embeds:[
          {
            title:`Yasaklı Kelime Listesi`,
            description:`\`${kelimeler}\``
          }
        ]});
        break;
      }
      case "temizle":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$set:{bKlm:[]}},{upsert:true});
        interaction.reply({embeds:[
          {
            title:`Kelime Listesi Temizlendi`,
            description:`Artık Sistemde Hiç Kelime Yok`
          }
        ]});
      }
    }
    
  }
};









//ArviS#0011