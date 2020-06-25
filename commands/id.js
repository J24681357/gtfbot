var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "id",
  title: "GT Fitness: ID Database",
  cooldown: 3,
    level: 0,
  delete: true,
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!id [car] [(number)] - Shows information about a car from the [(number)] associated with GT Sport car list from alphabetical order.\nNo number returns a random car.", "!id [track] [(number)] - Shows information about a track from the [(number)] associated with all used GTF tracks from alphabetical order.\nNo number returns a random track."],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !id [car|track] [(number)|\"query\"]`" + "\n"

    /* Setup */

    var results = " ";
    var selected = false;

    if (query[0] == "track") {
      var selected = true;
      var total = require(gtffile.TRACKS).trackslength

      if (!isNaN(query[1]) || query[1] === undefined || typeof query[1] === 'number') {
        var number = parseInt(query[1]) - 1;
        if (query[1] === undefined) {
          var track = require(gtffile.TRACKS).RandomTrack()
        } else {
          if (number + 1 > require(gtffile.TRACKS).trackslength || number < 0) {
            require(gtffile.EMBED).warning("⚠ Invalid ID", "A random track has been selected.", embed, msg, msgauthorid);
            var track = require(gtffile.TRACKS).RandomTrack()
          } else {
            var track = require(gtffile.TRACKS).Track(number)
          }
        }
        var index = track.index
        embed.setTitle("__GT Fitness Track List: " + track.id + "/" + total + " Tracks__");
        results = "**Track:** " + track.name + " `ID:" + track.id + "`" + "\n" + 
          "**Length:** " + track.length + " km" + "\n" + 
          "**Type:** " + track.type + " Circuit";
          } else {
            if (query[1].length <= 2) {
            require(gtffile.EMBED).error("❌ Invalid Characters", "The query is not at least 3 characters.", embed, msg, msgauthorid);
            return;
          } else {
            var list = require(gtffile.TRACKS).Tracks({name:query[1]})
            if (list.length == 0) {
               require(gtffile.EMBED).error("❌ No Tracks", "No tracks has been found from your query.", embed, msg, msgauthorid);
              return;
            }
            list = list.map(gttrack => "`ID:" + gttrack.id + "` " + gttrack.name).slice(0, 10);
            embed.setTitle("__Search Results: " + list.length + " Tracks__");
            results = list.join("\n");
        }
      }
    }
    if (query[0] == "car") {
      var selected = true;
      var total = require(gtffile.GTSCARS).gtscarslength

      if (!isNaN(query[1]) || query[1] === undefined || typeof query[1] === 'number') {
        var number = parseInt(query[1]) - 1;
        if (query[1] === undefined) {
          var car = require(gtffile.GTSCARS).RandomGTSCar()
        } else {
          if (number + 1 > total || number < 0) {
            require(gtffile.EMBED).warning("⚠ Invalid ID", "A random track has been selected.", embed, msg, msgauthorid);
            var car = require(gtffile.GTSCARS).RandomGTSCar()
          } else {
            var car = require(gtffile.GTSCARS).GTSCar(number)
          }
        }
        var index = car.index
        embed.setTitle("__GT Sport Car List: " + car.id + "/" + total + " Cars__");
        results = "**Car:** " + car.name + " `ID:" + car.id + "`" + "\n" + 
          "**Category: ** " + car.category + "\n" + 
          "**Country** " + car.country;
          } else {
            if (query[1].length <= 2) {
            require(gtffile.EMBED).error("❌ Invalid Characters", "The query is not at least 3 characters.", embed, msg, msgauthorid);
            return;
          } else {
            list = require(gtffile.GTSCARS).GTSCars({name:query[1]})
            if (list.length == 0) {
               require(gtffile.EMBED).error("❌ No Tracks", "No cars has been found from your query.", embed, msg, msgauthorid);
              return;
            }
            list = list.map(gtscar => "`ID:" + gtscar.id + "` " + gtscar.name).slice(0, 10);
            embed.setTitle("__Search Results: " + list.length + " Cars__");
            results = list.join("\n");
        }
      }
    }
    if (selected) {
      embed.setDescription(results);
      msg.channel.send(embed);
      return 
    } else {
      require(gtffile.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, msgauthorid)
      return
    }
  }
};
