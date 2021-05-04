var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////
var dw = require("../index");
var sizeOf = require("probe-image-size");

module.exports = {
  name: "dwex",
  title: "GT Fitness Daily Workout",
  cooldown: 5,
  level: 0,
  channels: ["gtf-mode", "testing", "gtf-test-mode"],
  aliases: ["rc", "rcar"],

  delete: false,
  requirecar: false,
  availitoeveryone: true,
  availinmaint: true,
  requireuserdata: true,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!dwex - Chooses a random car from the GT Fitness car list."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    embed.setAuthor(msg.author.username, msg.author.displayAvatarURL());
    var args = "";
    var page = 0;
    var results = "";
    var info = "";
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    /* Setup */
    if (query[0] == "info") {
      var makelist = require(gtf.CARS).list("makes");
      embed.setTitle(emote.gtflogo + " __GTF Daily Workout: Info__");
      var total = 0;
      for (var makei = 0; makei < makelist.length; makei++) {
        var m = makelist[makei].replace(/,/g, "-");
        total = total + require(gtf.CARS).find({ make: [m] }).length;
      }

      results =
        "**Total Manufacturers:** " +
        makelist.length +
        "\n" +
        "**Total Cars:** " +
        total +
        "\n" +
        "**Production Cars :** " +
        require(gtf.CARS).find({ types: ["Production"] }).length +
        "\n" +
        "**Aftermarket Cars:** " +
        require(gtf.CARS).find({ types: ["Aftermarket"] }).length +
        "\n" +
        "**Race Cars:** " +
        require(gtf.CARS).find({ types: ["Race Car"] }).length +
        "\n";
      embed.setDescription(results);
      msg.channel.send(embed);
      return;
    }

    embed.setTitle(emote.gtflogo + " __GTF Daily Workout__");
    var car = require(gtf.CARS).random({}, 1)[0];
    var imagestyle = 1
    embed.setDescription("**" + car["name"] + " " + car["year"] + "**" + " `" + car["type"] + "`\n" + car["power"] + "hp | " + car["weight"] + "lbs");
    embed.setImage(car["image"][imagestyle-1]);
    msg.channel.send(embed);
  },
};
