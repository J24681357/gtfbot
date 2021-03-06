var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "cancel",
  title: "Cancel Session",
  cooldown: 5,
  level: 0,
  roles: [],
  channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requireuserdata: true,
  requirecar: false,
  usedduringrace: true,
  usedinlobby: false,
  aliases: ["exit", "quit"],
  description: ["!cancel - Cancels any active session."],
  execute(msg, query, userdata) {
    try {
      /* Setup */
      const embed = new Discord.MessageEmbed();
      embed.setColor(0x0151b0);
      var user = msg.guild.members.cache.get(userdata["id"]).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
      var args = "";
      var page = 0;
      var results = "";
      var info = "";

      /* Setup */

      if (!stats.raceinprogressstat(userdata)[0]) {
        require(gtf.EMBED).alert({ name: "❌ Error", description: "You are not in a session.", embed: "", seconds: 0 }, msg, userdata);
        return;
      } else {
        if (query[0] == "✨✨✨") {
          exitnow(msg);
          return;
        }
        embed.setColor(0xffff00);
        var results = "⚠ Quit your current session?";

        embed.setDescription(results);

        msg.channel.send(embed).then(msg => {
          var emojilist = [[emote.exit, "gtfexit", exitnow]];

          gtftools.createreactions(emojilist, msg, userdata);
          return;
        });
      }

      function exitnow() {
        embed.setColor(0x0151b0);

        require(gtf.EMBED).success("✅ Success", "You have left the session.", 0, false, embed, msg, userdata);
        msg.channel.messages
          .fetch({
            around: stats.raceinprogressstat(userdata)[1][1],
            limit: 1,
          })
          .then(messages => {
            messages.first().delete({ timeout: 0 });
          });
        stats.removeracedetails(userdata);

        stats.raceinprogress(false, ["", ""], "EXIT", userdata);
        return;
      }
    } catch {
      throw error;
    }
  }, // execute
};
