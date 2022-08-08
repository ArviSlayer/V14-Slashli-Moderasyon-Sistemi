const { PermissionsBitField,Client,CommandInteraction } = require("discord.js");

module.exports = {
  name: "sil",
  description: "Beliritlen Miktarda Mesaj Siler",
  type:1,
  options: [
    {
      type: 4,
      name: "miktar",
      description: "Miktar",
      required: true,
    },
  ],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
      return interaction.reply({content: `Bu Komutu Kullanabilmek İçin Yetkin Yok`, ephemeral: true});
    const clear = interaction.options.getInteger("miktar");
    const channel = interaction.channel;

    let math = Math.floor(clear / 100);
    for (let i = 0; i < math; i++) {
      try {
        await channel.bulkDelete(100);
      } catch (err) {}
    }

    try {
      await channel.bulkDelete(clear - 100 * math);
    } catch (err) {}

    try {
        interaction.reply({ content: `${clear} Adet Mesaj Silindi` });
        setTimeout(() => {
      interaction.deleteReply();
        }, 5000);
    } catch {}
  },
};









//ArviS#0011