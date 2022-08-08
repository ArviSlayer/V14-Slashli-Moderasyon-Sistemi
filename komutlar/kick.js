const {
  EmbedBuilder,
  PermissionsBitField,
  Client,
  CommandInteraction,
} = require("discord.js");
const model = require("../models/kick");
module.exports = {
  name: "kick",
  description: "Kullanıcıyı Sunucudan Atar",
  type: 1,
  options: [
    {
      name: "user",
      description: "Atılacak Kullanıcıyı Seçin",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "Hangi Sebepten Dolayı Atılacak?",
      type: 3,
      required: true,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const data =
      (await model.findOne({ guildID: interaction.guild.id })) || null;

    const banRol = data ? data.roleID : null;

    if (
      interaction.member.roles.cache.has(banRol) ||
      interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      const user = interaction.options.getMember("user");
      const reason = interaction.options.getMember("reason");

      if (user.id === interaction.member.id)
        return interaction.reply({
          content: "Kendini Atamazsın",
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: "Kendimi Atamam",
          ephemeral: true,
        });
      if (user.id === interaction.guild.ownerID)
        return interaction.reply({
          content: "Sunucu Sahibini Atamazsın",
          ephemeral: true,
        });
      if (user.permissions.has(PermissionsBitField.Flags.BanMembers))
        return interaction.reply({
          content: "Bu Kullanıcıyı Atamazsın",
          ephemeral: true,
        });
      if (user.roles.cache.has(banRol))
        return interaction.reply({
          content: "Bunu, Kick Yetkilisi Üzerinde Yapamazsın",
          ephemeral: true,
        });

      try {
        interaction.guild.members.fetch(id).then(() => {
          interaction.reply({
            embeds: [{ description: "Bu Kullanıcı Sunucuda Bulunmuyor" }],
          });
        });
      } catch {
        await user.kick(reason);
        const embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.member.user.tag,
            iconURL: interaction.member.user.avatarURL({ dynamic: true }),
          })
          .setDescription(`<@!${user.id}> Adlı Kullanıcı Atıldı`)
          .setColor("RED");
        interaction.reply({ embeds: [embed] });
      }
    } else
      return interaction.reply({
        content: "Bu Komutu Kullanabilmek İçin Yetkin Yok",
        ephemeral: true,
      });
  },
};









//ArviS#0011