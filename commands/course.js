var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "course",
  title: "GTF Course Maker",
  cooldown: 0,
  level: 0,
  channels: ["testing", "gtf-mode"],

  delete: false,
  requirecar: false,
  availitoeveryone: true,
  availinmaint: true,
  requireuserdata: true,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!course"],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "";
    var page = 0;
    var results = "";
    var info = "**❓ The red point would be the starting point.**";
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    /* Setup */

    var curviness = 0.3;
    var maxangle = 120;
    var minsegment = 2;
    var maxsegment = 20;
    var allsegment = 0;
    var type = "circuit";
    var name = "Generic Track";

    for (var i = 0; i < query.length; i++) {
      if (query[i].includes("name=")) {
        name = query[i].split("=")[1].toString();
      }
      if (query[i].includes("allsegments=")) {
        /// 0 - 20
        allsegment = parseFloat(query[i].split("=")[1]);
        if (!gtftools.betweenInt(allsegment, 2, 20)) {
          require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Segment lengths must be between 2 and 20.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
        minsegment = allsegment;
        maxsegment = allsegment;
        allsegment = "";
      }
      if (query[i].includes("maxsegment=")) {
        maxsegment = parseFloat(query[i].split("=")[1]);
        if (allsegment.toString().length != 0) {
          if (!gtftools.betweenInt(maxsegment, 2, 20)) {
            require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Maximum segment length must be between 2 and 20.", embed: "", seconds: 0 }, msg, userdata);
            return;
          }
        }
      }
      if (query[i].includes("minsegment=")) {
        /// 0 - 20
        minsegment = parseFloat(query[i].split("=")[1]);

        if (allsegment.toString().length != 0) {
          if (!gtftools.betweenInt(minsegment, 2, 20)) {
            require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Mininum segment length must be between 2 and 20.", embed: "", seconds: 0 }, msg, userdata);
            return;
          }
        }
      }
      if (query[i].includes("curviness=")) {
        /// 0.0 - 1.0
        curviness = parseFloat(query[i].split("=")[1]);
        if (!gtftools.betweenInt(curviness, 0, 1)) {
          require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Curviness value must be between 0 and 1.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }
      if (query[i].includes("maxangle=")) {
        /// 50-150
        maxangle = parseFloat(query[i].split("=")[1]);
        if (!gtftools.betweenInt(maxangle, 50, 150)) {
          require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Max Angle value must be between 50 and 150.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }
      if (query[i].includes("type=")) {
        type = query[i].split("=")[1];
      }
    }

    if (maxsegment < minsegment) {
      require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Maximum segment length is lower than the minimum segment length.", embed: "", seconds: 0 }, msg, userdata);
      return;
    }

    if (minsegment > minsegment) {
      require(gtf.EMBED).alert({ name: "❌ Invalid Arguments", description: "Minimum segment length is greater than the maximum segment length.", embed: "", seconds: 0 }, msg, userdata);
      return;
    }

    var t = require(gtf.COURSEMAKER).trackparams({
      min: 40,
      max: 80,
      minSegmentLength: minsegment,
      maxSegmentLength: maxsegment,
      curviness: curviness,
      maxAngle: maxangle,
      type: type,
    });
    var course = require(gtf.COURSEMAKER).drawtrack(t);
    course["name"] = name;

    embed.setTitle(emote.tracklogo + "__GTF Course Maker__");
    const attachment = new Discord.MessageAttachment(course["image"], "course.png");
    embed.attachFiles(attachment).setImage("attachment://course.png");
    var footer = "Type = " + type + " | " + "Segments = " + minsegment + ":" + maxsegment + " | " + "Curviness = " + curviness + " | " + "Max Angle = " + maxangle;
    embed.setDescription("**Name:** " + course["name"] + "\n" + "**Track Length:** " + course["length"] + "mi" + " | " + course["lengthkm"] + "km");
    embed.setFooter(footer);
    msg.channel.send(embed);
  },
};
