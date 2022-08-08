const { PermissionsBitField,Client,CommandInteraction,EmbedBuilder } = require("discord.js");
const model = require("../models/guild");
module.exports = {
  name: "küfür-engel",
  description: "Küfür Engel Sistemini Ayarlar",
  type:1,
  options: [
    {
      type: 3,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      required: true,
      choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
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
    const durum = interaction.options.get("durum").value;
    const guild = interaction.guild;
    if(durum === "aktif"){
      await model.updateOne({GuildID:guild.id},{kfrEngel:true},{upsert:true});
      interaction.reply({ embeds:[new EmbedBuilder().setTitle("Küfür Engelleme Sistemi Aktif").setColor("#00ff14").setDescription(`Küfür Engelleme Sistemi Yönetici Tarafından Aktif Edildi, Artık Küfürler Engellenecek`)] });
    }else if(durum === "pasif"){
      await model.updateOne({GuildID:guild.id},{kfrEngel:false},{upsert:true});
      interaction.reply({ embeds:[new EmbedBuilder().setTitle("Küfür Engelleme Sistemi Pasif").setColor("#ff0000").setDescription(`Küfür Engelleme Sistemi Yönetici Tarafından Devre Dışı Bırakıldı, Artık Küfürler Engelenmeyecek`)] });

    }
  }
};









//ArviS#0011