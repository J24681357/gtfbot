var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "myhome",
  title: "My GTF Home",
  cooldown: 5,
  level: 0,
  aliases: ["home"],
  channels: ["testing", "gtf-demo"],

  availinmaint: false,
  delete: false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!home - Displays the main menu of GTF.", "!home 2 - Selects the Miscellaneous setting from the main menu."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "";
    var page = 0;
    var results = "";
    var info = "";
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    var main = stats.main(userdata);
    var main2 = args + stats.currentcarmain(userdata);
    var showcasenumber = 0;
    var count = stats.count(userdata);

    embed.setTitle("__My Home__");
    embed.setThumbnail(msg.guild.members.cache.get(gtf.USERID).user.displayAvatarURL());
    embed.setFooter("Welcome to GT Fitness! Use the commands above to select an option.");

    if (parseInt(query[0]) == 2) {
      results = "__**❔ GT Fitness Facts**__ - /gtf" + "\n" + "__** Daily Workout**__ - /dw4" + "\n" + embed.setDescription(results);
      embed.addField(main, main2);

      msg.channel.send(embed).then(msg => {
        function daily() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          require("../commands/daily").execute(msg, "", userdata);
        }
        function gtf() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          require("../commands/gtf").execute(msg, "", userdata);
        }
        var emojilist = [
          ["🚘", "🚘", daily],
          ["❔", "❔", gtf],
        ];

        gtftools.createreactions(emojilist, msg, userdata);
      });
    } else {
      var aspec = "__**🏁Career Mode**__\n/career" + "\n" + "__**🎉Seasonal Events**__\n/seasonal" + "\n" + "__**🅰Arcade Mode**__\n/arcade" + "\n" + "__**🇩Drift Trial**__\n/drift" + "\n" + "__**🇸Top Speed Run**__\n/ssrx" + "\n" + "__**👥GTF Online Lobby (BETA)**__\n/lobby";
      var places = "__**🛒GTF Car Dealerships**__\n/car" + "\n" + "__**📦GTF Auto - Tuning Shop**__\n/tune" + "\n" + "__**🎨GTF Auto - Paint Shop**__\n/paint" + "\n" + "__**🛠Car Tuning**__\n/tuning";
      var myhome = "__**🚘Garage**__\n/garage" + "\n" + "__**👤Profile**__\n/profile" + "\n" + "__**🎞Replay Theater**__\n/replay" + "\n" + "__**⚙Settings**__\n/settings";
      var other = "__**🇱GTF Experience Levels**__\n/levels" + "\n" + "__**🌀Miscellaneous**__\n/home 2";
      embed.addField("A-Spec", aspec, true);
      embed.addField("Places", places, true);

      embed.addField("My Home", myhome, true);

      embed.addField("Others", other, true);

      embed.setDescription(results);
      embed.addField(main, main2);

      msg.channel.send(embed).then(msg => {
        function career() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/career").execute(msg, "", userdata);
        }
        function seasonal() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/seasonal").execute(msg, "", userdata);
        }
        function arcade() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/arcade").execute(msg, "", userdata);
        }
        function drift() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/drift").execute(msg, "", userdata);
        }
        function ssrx() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/ssrx").execute(msg, "", userdata);
        }
        function gtfdealership() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/car").execute(msg, "", userdata);
        }
        function gtftuning() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/tune").execute(msg, "", userdata);
        }
        function gtfpaints() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/paint").execute(msg, "", userdata);
        }
        function garage() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/garage").execute(msg, "", userdata);
        }
        function profile() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          clearInterval(s);
          require("../commands/profile").execute(msg, "", userdata);
        }
        function replay() {
          msg.delete({ timeout: 0 });
          showcasenumber = -1;
          clearInterval(s);
          require("../commands/replay").execute(msg, "", userdata);
        }
        function levels() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          clearInterval(s);
          require("../commands/levels").execute(msg, "", userdata);
        }
        function settings() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          clearInterval(s);
          require("../commands/settings").execute(msg, "", userdata);
        }
        function misc() {
          msg.delete({ timeout: 0 });
          var showcasenumber = -1;
          clearInterval(s);
          require("../commands/myhome").execute(msg, ["2"], userdata);
        }
        var emojilist = [
          ["🏁", "🏁", career, "Once"],
          ["🎉", "🎉", seasonal],
          ["🅰", "🅰", arcade],
          ["🇩", "🇩", drift],
          ["🇸", "🇸", ssrx],
          ["🛒", "🛒", gtfdealership],
          ["🛠", "🛠", gtftuning],
          ["🎨", "🎨", gtfpaints],
          ["🚘", "🚘", garage],
          ["👤", "👤", profile],
          ["🎞", "🎞", replay],
          ["⚙", "⚙", settings],
          ["🇱", "🇱", levels],
          ["🌀", "🌀", misc],
        ];

        //gtftools.createreactions(emojilist, msg, userdata)

        var s = setInterval(function () {
          showcasenumber++;
          if (showcasenumber == -1 || stats.count(userdata) != count) {
            clearInterval(s);
            msg.delete({ timeout: 0 });
            return;
          }
          if (showcasenumber % 3 == 0 && showcasenumber != 0) {
            embed.setTitle("__My Home__");
            embed.addField("A-Spec", aspec, true);
            embed.addField("Places", places, true);

            embed.addField("My Home", myhome, true);

            embed.addField("Others", other, true);
            embed.addField(main, main2);
            embed.image = [];
            embed.description = "";
            msg.edit(embed);

            return;
          }

          var car = require(gtf.CARS).random({}, 1)[0];
          embed.setTitle(car["name"] + " " + car["year"]);

          embed.setDescription("Find this car using **!car " + car["make"] + " " + "**.");
          embed.setImage(car["image"]);
          embed.fields = [];
          msg.edit(embed);
          return;
        }, 30 * 1000);
      });
      return;
    }
  },
};
