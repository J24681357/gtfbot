var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "paint",
  title: "GTF Auto - Paints",
  cooldown: 3,
   level:0,
  delete: true,
  description: ["!paint - Displays the list of types of paints in GTF Auto.", "!paint [\"type\"] - Displays a list of [\"type\"] in GTF Auto.", "!paint [\"type\"] [(number)] - Purchases a paint from the [(number)] associated from the list of [\"type\"] paints.\nThis applies to your current car."],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !paint [type] [(number)]`" + "\n"

    /* Setup */
    var results = " ";
    var select;
    var selectedtype = false;
    var page = 0;
    var type = "color"
    embed.setTitle("__GTF Auto - Paints__");

    if (query[0] == "gloss" || query[0] == "g" || query[0] == "Gloss" || parseInt(query[0]) == 1) {
      var selectedtype = true
      var select = require(gtffile.PARTS).glosspaints
      var name = "Gloss Paints"
    }
    if (query[0] == "metallic" || query[0] == "m" || query[0] == "Metallic" || parseInt(query[0]) == 2) {
      var selectedtype = true
      var select = require(gtffile.PARTS).metallicpaints
      var name = "Metallic Paints"
    }
    if (query[0] == "pearl" || query[0] == "p" || query[0] == "Pearl"  || parseInt(query[0]) == 3) {
      var selectedtype = true
      var select = require(gtffile.PARTS).pearlpaints
      var name = "Pearl Paints"
    }
    if (query[0] == "matte" || query[0] == "ma" || query[0] == "mt" || query[0] == "Matte" || parseInt(query[0]) == 4) {
      var selectedtype = true
      var select = require(gtffile.PARTS).mattepaints
      var name = "Matte Paints"
    }
    if (query[0] == "special" || query[0] == "s" || query[0] == "Special" || parseInt(query[0]) == 5) {
      var selectedtype = true
      var select = require(gtffile.PARTS).specialpaints
      var name = "Special Paints"
    }
    if (selectedtype) {
      var number = query[1]
      var itempurchase = true;
      embed.setTitle("__GTF Auto - " + name + ": " + select.length + " Paints__");
      if (number <= 0 || isNaN(number) || number === undefined || number > select.length) {
        if (number !== undefined) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "Please use the numbers associated with the list above.", embed, msg, msgauthorid);
        }
        itempurchase = false;
      }
      
      if (itempurchase) {
        var item = [number, type, select[number - 1][0], select[number - 1][1]]

        require(gtffile.MARKETPLACE).purchase(msg.member, item, "PAINT", embed, msg, msgauthorid)

        return
      } else {
      var car = stats.currentcar(msgauthorid)
      if (car == "No car.") {
         require(gtffile.EMBED).error("❌ Error", "You do not have a current car.", embed, msg);
        return
      }
      var currentpartname = require(gtffile.PARTS).getpart(type, car[type][0])[0]
      var select2 = select.map(function(x) {
        if (x[0] === currentpartname) {
          x.push(emote.credits + " ✅")
        } else {
          x.push(emote.credits)
        }
        return [x[0], x[1], x[3]]
      })
      results = gtftools.list(select2, page, "", "", true, "",10, msgauthorid)
      embed.setDescription(results);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));

      gtftools.createpages(results, select2, page, "", "", true, "", 10, [query, "paint"], embed, msg, msgauthorid)
      return
      }
    } else {
      if (query.length !== 0) {
        require(gtffile.EMBED).warning("⚠ Invalid Arguments", "This does not exist.", embed, msg, msgauthorid);
      }
    }

    results = "__**Gloss Paints**__ - !paint [gloss|g]" + "\n" +
      "__**Metallic Paints**__ - !paint [metallic|m]" + "\n" +
      "__**Pearl Paints**__ - !paint [pearl|p]" + "\n" +
      "__**Matte Paints**__ - !paint [matte|ma]" + "\n" +
      "__**Special Paints**__ - !paint [special|s]" + "\n\n" +
      "❓ **Choose a type of paint from the list above.**"


    embed.setDescription(results);
    embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
    msg.channel.send(embed);
  }
};
