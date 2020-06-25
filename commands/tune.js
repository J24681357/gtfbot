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
  name: "tune",
  title: "🛠 GTF Auto - Tuning Shop",
  cooldown: 3,
   level:0,
  delete: true,
  description: ["!tune - Displays the list of types of performance parts in GTF Auto.", "!tune [\"type\"] - Displays a list of [\"type\"] in GTF Auto.", "!tune [\"type\"] [(number)] - Purchases a performance part from the [(number)] associated from the list of [\"type\"] parts.\nThis applies to your current car.\nThe current [\"type\"] part on your current car will be sold and replaced, but you must purchase the part with its full price first.", "!tune [\"type\"] [stock] - Revert the [\"type\"] installed to your car to Stock."],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !tune [\"type\"] [(number)]`" + "\n"
    var title = "🛠 GTF Auto - Tuning Shop"

    /* Setup */
    var results = "";
    var results2 = "";
    var select = "";
    var page = 0;
    var car = stats.currentcar(msgauthorid)
    embed.setTitle("__" + title + "__");
    
    var selectedtype = false;

    if (query[0] == "engine" || query[0] == "eng" || query[0] == "e" || parseInt(query[0]) == 1) {
      var selectedtype = true
      var select = require(gtffile.PARTS).engine()
      var type = "engine"
      var name = "Engine"
    }

    if (query[0] == "transmission" || query[0] == "trans" || query[0] == "tr"|| parseInt(query[0]) == 2) {
    selectedtype = true
      var select = require(gtffile.PARTS).transmission()
      var type = "transmission"
      var name = "Transmission"
    }

    if (query[0] == "suspension" || query[0] == "susp" || query[0] == "su"|| parseInt(query[0]) == 3) {
      selectedtype = true
      var select = require(gtffile.PARTS).suspension()
      var type = "suspension"
      var name = "Suspension"
    }
    
    if (query[0] == "tires" || query[0] == "tire" || query[0] == "ti"|| parseInt(query[0]) == 4) {
      selectedtype = true
      var select = require(gtffile.PARTS).tires()
      var type = "tires"
      var name = "Tires"
    }
    
    if (query[0] == "weight-reduction" || query[0] == "weight" || query[0] == "we"|| parseInt(query[0]) == 5) {
      selectedtype = true
      var select = require(gtffile.PARTS).weightreduction()
      var type = "weightreduction"
      var name = "Weight Reduction"
    }
    
    if (query[0] == "turbo" || query[0] == "supercharger" || query[0] == "tu"|| parseInt(query[0]) == 6) {
      selectedtype = true
      var select = require(gtffile.PARTS).turbo()
      var type = "turbo"
      var name = "Turbo"
    }
    
    if (query[0] == "nitrous" || query[0] == "nos" || query[0] == "nitro"|| parseInt(query[0]) == 7) {
      selectedtype = true
      var select = require(gtffile.PARTS).nitrous()
      var type = "nitrous"
      var name = "Nitrous"
    }

    if (selectedtype) {
      var number = query[1]
      var itempurchase = true;
      embed.setTitle("__GTF Auto - " + name + "__");
      if (number == "s" || number == "Stock" || number == "stock") {
        number = "S"
      }
      if (number != "S") {
      if (number <= 0 || isNaN(number) || number === undefined || number > select.length) {
        if (number !== undefined) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "This ID does not exist.", embed, msg, msgauthorid);
      }
        itempurchase = false;
    }
      }

      
      if (itempurchase) {
             var select2 = select.map(function(x) {
        x = require(gtffile.PARTS).checkpartsavail(x, car["originalsell"], require(gtffile.PARTS).getpart(type, car[type][0])[0], car["rating"])
        return x
      })
        if (number == "S" || number == "s") {
          var item = [number, type, "Stock", 0]
        } else {
          if (typeof select2[number-1][3] !== 'undefined') {
        if (select2[number-1][3].includes("❌")){
        require(gtffile.EMBED).error("❌ Part Unavailable", "**" +  select2[number-1][0] + "** is unavailable for your **" + car["name"] + "**.", embed, msg, msgauthorid)
          return
        }
          }
        var item = [number, type, select2[number - 1][0], select2[number - 1][1]]
        }
                
    /*if (stats.userid() == "237450759233339393") {
        stats.addgift(select2[number-1][0], item, "PART")
    }*/

        require(gtffile.MARKETPLACE).purchase(msg.member, item, "PART", embed, msg, msgauthorid)

        return
      } else {
        var select3 = select.map(function(x) {
        x = require(gtffile.PARTS).checkpartsavail(x, car["originalsell"], require(gtffile.PARTS).getpart(type, car[type][0])[0], car["rating"])
        if (x[2] == "FPP") {
          x[2] = ""
        }
        return x
      })
        
      results = gtftools.list(select3, page, "", emote.credits, true, "", 10, msgauthorid)

        
      embed.setDescription(results);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));

      gtftools.createpages(results, select3, page, "", emote.credits, true, "", 10, [query, "tune"], embed, msg, msgauthorid)
      return
      }
    } else {

    }

    results = "__**Engine**__ - !tune [engine|eng|e] ['stock'|(number)]" + "\n" +
      "__**Transmission**__ - !tune [transmission|trans|tr] ['stock'|(number)]" + "\n" +
      "__**Suspension**__ - !tune [suspension|susp|su] ['stock'|(number)]" + "\n" +
      "__**Tires**__ - !tune [tires|tire|tr] ['stock'|(number)]" + "\n" +
      "__**Weight Reduction**__ - !tune [weight-reduction|weight|we] ['stock'|(number)]" + "\n" +
      "__**Turbo Kits**__ - !tune [turbo|tu] ['stock'|(number)]" + "\n" +
      "__**Nitrous**__ - !tune [nitrous|nitro|nos] ['stock'|(number)]" + "\n\n" +
      
      "❓ **Choose a part to install from the list above.**"
   var list = results.split("\n").slice(0,-1).map(function(x){
      return [x, " "]
    })
    var page = 0
    results2 = gtftools.list(list, page, "", "",false, "", 7, [query, "tune"], embed, msg, msgauthorid)
      
      embed.setDescription(results)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results2, list, page, "", "", false, "", 7, [query, "tune"], embed, msg, msgauthorid)
  }
};
