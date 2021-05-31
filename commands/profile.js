var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "profile",
  title: "My Profile",
  cooldown: 3,
  level: 0,
  channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!profile - Displays your information, stats, and career progression."],
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

    //////////EXP//////////
    var progress = stats.setting("PROGRESSBAR", userdata)[0];
    var progressb = stats.setting("PROGRESSBAR", userdata)[1];
    var expbar = [progressb, progressb, progressb, progressb, progressb, progressb, progressb, progressb, progressb, progressb];
    var exp1 = stats.exp(userdata);
    var nextlevel = stats.level(userdata) + 1;
    if (nextlevel >= 51) {
      nextlevel = 50;
    }
    var curr = stats.level(userdata) + 1;
    if (curr >= 51) {
      curr = 50;
    }
    var exppoints = require(gtf.LISTS).gtfexp[curr.toString()]["exp"];
    var currentexppoints = curr - 1;

    for (var i = 0; i < expbar.length; i++) {
      if (exp1 >= currentexppoints) {
        currentexppoints += exppoints / 10;
        expbar[i] = progress;
      }
    }

    //////////////////////

    embed.setTitle("__My Profile__");

    results =
      "__Credits__" +
      "\n" +
      "**" +
      stats
        .credits(userdata)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      emote.credits +
      "**\n" +
      "__Experience__ " +
      "\n" +
      "**" +
      stats
        .exp(userdata)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      emote.exp +
      "**\n" +
      "Lv." +
      stats.level(userdata) +
      " " +
      expbar.join("") +
      " " +
      "Lv." +
      nextlevel +
      "\n" +
      "__Total Distance Driven__ " +
      "\n" +
      stats
        .totalmileage("KM", undefined, userdata)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "km | " +
      stats
        .totalmileage("MI", undefined, userdata)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "mi" +
      emote.mileage +
      "\n\n" +
      "**Total Car Purchases:** " +
      stats
        .numcarpurchase(userdata)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      " Cars" +
      "\n" +
      "**Garage:** " +
      stats.garagecount(userdata) +
      " Cars";

    embed.setDescription(results);
    embed.setThumbnail(msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));

    /*let button = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('My First Button!')
  .setID("")*/

    msg.channel.send(embed, {button:button}).then(msg => {
      function careerprofile() {
        embed.setTitle("__Career Progress__");
        var list1 = [
          ["__Beginner__", require("../data/career/races").beginner()],
          ["__Amateur__", require("../data/career/races").amateur()],
          ["__IC League__", require("../data/career/races").icleague()],
          ["__IB League__", require("../data/career/races").ibleague()],
          ["__IA League__", require("../data/career/races").ialeague()],
          ["__S League__", require("../data/career/races").sleague()],
        ];
        results2 = "";
        for (var level = 0; level < list1.length; level++) {
          var results2 = results2 + list1[level][0] + "\n";
          var certainraces = list1[level][1];
          var array = Object.keys(certainraces);
          for (var i = 0; i < array.length; i++) {
            results2 = results2 + certainraces[array[i]]["eventid"] + " " + stats.eventstatus(certainraces[array[i]]["eventid"], userdata) + " ";
          }
          results2 = results2 + "\n";
        }

        embed.setDescription(results2);
        msg.edit(embed);
      }
      function profile() {
        embed.setTitle("__My Profile__");
        embed.setDescription(results);
        msg.edit(embed);
      }

      var emojilist = [
        [emote.leftarrow, "leftarrow", profile],
        ["🏆", "🏆", careerprofile],
      ];

      gtftools.createreactions(emojilist, msg, userdata);
    });
    return;
  },
};
