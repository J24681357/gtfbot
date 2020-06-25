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

module.exports.purchase = function(user, item, type, embed, msg, msgauthorid) {
  var applytocurrentcar = ""
  var partsold = ""
  var installedoncurrentcar = "";
  var fpp = "";
  var rating = "";
  var replacement = ""
  var part_tostock = false

  if (type == "CAR") {
    var name = item[0]
    var dealershipcost = item[1][0]
    var costofperf = item[1][1]
    var mcost = item[1][2]
    var link = item[2]
    var make = item[3]
    var rating = " " + item[5]
    
    var fpp = gtfperf.dealershipcalc(item, -5)[1] + " - " + gtfperf.dealershipcalc(item, 5)[1]
    embed.setImage(link)
    if (require(gtffile.EMBED).checkgarageerror(embed,msg, msgauthorid)) {
        return
    }
    fpp = "\n**FPP: " + fpp + emote.fpp + "**";

  } if (type == "ROLE") {
    var name = item[0]
    var cost = item[1]
    var mcost = cost

  } if (type == "PART") {

    if (stats.currentcarmain(msgauthorid) == "No car.") {
      require(gtffile.EMBED).error("❌ No Car", "You do not have a current car.", embed, msg,msgauthorid)
      return
    }
    var car = stats.currentcar(msgauthorid)

    var id = item[0]
    var type1 = item[1]
    var name = item[2]
    var cost = item[3]
    var includefpp = item[4]
    var mcost = cost

    
    if (id == "S") {
    if ((car[type1][0] == "S")|| (parseInt(car[type1][0]) == car[type1][3])) {
      require(gtffile.EMBED).error("❌ Part Already Installed", "**" + name + "** is already installed in your **" + car["name"] + "**.", embed, msg,msgauthorid)
      return
    }
    }

    if (car[type1][0] == id) {
      require(gtffile.EMBED).error("❌ Part Already Installed", "**" + name + "** is already installed in your **" + car["name"] + "**.", embed, msg,msgauthorid)
      return
    }
    
    
    if (car[type1][0] != "S") {
      replacement = "\n**" + require(gtffile.PARTS).getpart(type1, car[type1][0])[0] + " -> " + name + "**\n"
      partsold = "\nSold **" + require(gtffile.PARTS).getpart(type1, car[type1][0])[0] + "**. **+" + car[type1][2].toString().replace(/\B(?=(\d{3}) +(?!\d))/g, ",") + "**" + emote.credits
    }
    if (name == "Stock") {
      id = car[type1][3]
      var stockpart = require(gtffile.PARTS).getpart(type1, id)
  
      name = stockpart[0]
      cost = stockpart[1]
      part_tostock = true
      item = [id, type1, name, cost, includefpp]
    }
    fpp = "\n**FPP: " + car["FPP"] + emote.fpp + " -> " + gtfperf.partpreviewfpp(item, msgauthorid) + "**" + emote.fpp

  } if (type == "PAINT") {

    if (stats.currentcarmain(msgauthorid) == "No car.") {
      require(gtffile.EMBED).error("❌ No Car", "You do not have a current car.", embed, msg)
      return
    }
    var car = stats.currentcar(msgauthorid)

    var type1 = item[1]
    var name = item[2]
    var cost = item[3]
    var mcost = cost
    var includefpp = item[4]
    var id = require(gtffile.PARTS).paintid(name, item[0])
    item[0] = id
    
    if (car[type1][0] == id) {
      require(gtffile.EMBED).error("❌ Same Paint", "You already have this paint on your **" + car["name"] + "**.", embed, msg, msgauthorid)
      return
    }
 
    if (car[type1][0] != "S") {
      replacement = "\n**" + require(gtffile.PARTS).getpart(type1, car[type1][0])[0] + " -> " + name + "**\n"
    }
    applytocurrentcar = "\n\n" + "⚠️ This will be painted to your **" + car["name"] + "**."
  }
  
  if (stats.credits(msgauthorid) - mcost < 0) {
    require(gtffile.EMBED).error("❌ Insufficient Credits", "You have insufficient credits to purchase the **" + name + "**.\n\n" +
                 "**Credits: " + stats.credits(msgauthorid) + emote.credits + "** -> **" + mcost.toString().replace(/\B(?=(\d{3}) +(?!\d))/g, ",") + "**" + emote.credits, embed, msg, msgauthorid)
    return
  }
  
  if (part_tostock) {
    var results = "Revert to the car's original part, **" + name + "**? " + applytocurrentcar + fpp
    partsold = "\nSold **" + require(gtffile.PARTS).getpart(type1, car[type1][0])[0] + "**. **+" + car[type1][2].toString().replace(/\B(?=(\d{3}) +(?!\d))/g, ",") + "**" + emote.credits
  } else {
  var results = "Purchase **" + name + rating + "**?** " + mcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits +  applytocurrentcar + replacement + fpp
  }

  embed.setDescription(results)
  embed.addField(stats.main(msgauthorid), stats.currentcarmain(msgauthorid));
  msg.channel.send(embed).then(msg => {

    function purchase() {
    var changecar = false;
    if (type == "ROLE") {
      stats.addcredits(-cost, msgauthorid)
      let role = msg.guild.roles.find(r => r.name === item[0]);
        user.roles.add(role).catch(console.error);
      installedoncurrentcar = "\n" + "Purchased " + "**" +  item[0] + "**." + " **-" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits
    }

      
    if (type == "CAR") {
      stats.addcredits(-mcost, msgauthorid)
      stats.addcar(item, undefined, msgauthorid)
      changecar = true;
      installedoncurrentcar = "Purchased " + "**" + name + " " + rating  + "**." + " **-" + mcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + "\n\n❓ **Click the 🚘 to change to this car.**"
      cost = mcost
    }
    if (type == "PART") {
      if (part_tostock) {
      require(gtffile.PARTS).install(item, msgauthorid)
      } else {
      stats.addcredits(-cost, msgauthorid)
      require(gtffile.PARTS).install(item, msgauthorid)
      installedoncurrentcar = "Installed " + name + " on **" + car["name"] + "**." + " **-" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + partsold
      }
    }
    if (type == "PAINT") {
      stats.addcredits(-cost, msgauthorid)
      require(gtffile.PARTS).install(item, msgauthorid)
      installedoncurrentcar = "Painted **" + name + "** on **" + car["name"] + "**."
    }
    
    if (part_tostock) {
    results = "Reinstalled " + name + " on **" + car["name"] + "**." + partsold
    } else {
    results = installedoncurrentcar
    }
      
    require(gtffile.EMBED).success("✅ Success", results, 0, false, embed, msg, msgauthorid)
    
    if (changecar) {
      function change() {
        require("/home/runner/gtfbot/commands/garage").execute(msg, ["select", (stats.garagecount(msgauthorid)).toString()], msgauthorid)
      }
      var emojilist = [['🚘','🚘', change]]

      gtftools.createreactions(emojilist, msg, msgauthorid)
      } else {
        msg.delete({timeout:5000})
      }
    }
    var emojilist = [[emote.yes, "Yes", purchase]]
    gtftools.createreactions(emojilist,msg, msgauthorid)
      }) 
    
}

module.exports.sell = function(user, item, type, embed, msg, msgauthorid) {
  embed.setColor(0xFFFF00)
  
  var results = ""
  if (type == "CAR") {
    var id = item["ID"]
    var name = item["name"]
    var sell = item["sell"]
    if (stats.currentcar(msgauthorid) != null) {
      if (stats.currentcar(msgauthorid)[0] == id) {
        require(gtffile.EMBED).error("❌ Current Car", "You cannot sell a car you are currently in.", embed, msg, msgauthorid)
        return
      }
    }
     results = "Sell " + name + " for **" + (sell).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + "?"
  }
  
  if (type == "CARS") {
    var first = item[0]
    var last = item[1]
    var name = "**" + (last - first + 1) + "** cars"
  results =
          "Sell " +
          name + " from your garage (IDs: " +
          first +
          "-" +
         last +
          ") ?";
  }
  embed.fields = []
  embed.setDescription(results)
  embed.addField(stats.main(msgauthorid), stats.currentcarmain(msgauthorid));

  msg.channel.send(embed).then(msg => {
    function sell1() {
      if (type == "CAR") {
        stats.removecar(item, id, sell, msgauthorid)
        results = "Sold **" + name + "**." + " **+" + (sell).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits
      }
      if (type == "CARS") {
        var money = stats.removecars(first, last, msgauthorid)
        results = "Sold **" + name + "**. " + "**+" + money + "**" + emote.credits
      }
        require(gtffile.EMBED).success("✅ Success", results, 5000, false, embed, msg, msgauthorid) 

      return
      }

    var emojilist = [[emote.yes, "Yes", sell1]]
    
    gtftools.createreactions(emojilist, msg, msgauthorid)
    
  })
}

module.exports.sellcalc = function(x) {
  return (-Math.ceil((-x * 0.3 + 1) / 100) * 100)
}

module.exports.fourcargifts = function(title, results, prizes, embed, msg, id) {
  
  var select = [[emote.rightarrow + " ",emote.transparent + " ",emote.transparent + " ", emote.transparent + " "], [emote.transparent + " ", emote.rightarrow + " ",emote.transparent + " ",emote.transparent + " "], [emote.transparent + " ",emote.transparent + " ", emote.rightarrow + " ",emote.transparent + " "], [emote.transparent + " ",emote.transparent + " ",emote.transparent + " ", emote.rightarrow + " "]]
  embed.fields = []
  embed.setTitle("__" + title + "__")
  embed.setDescription(results)
  embed.setColor(0x8b0000);
  msg.channel.send(embed).then(msg => {
    var index = 0
    var results1 = function(index) {
      return select[index][0] + "||" + prizes[0][0] + "||" + "\n" +
      select[index][1] + "||" + prizes[1][0] + "||" + "\n" +
      select[index][2] + "||" + prizes[2][0] + "||" + "\n" +
      select[index][3] + "||" + prizes[3][0] + "||"
    }

    gtftools.interval(function() {
    index = Math.floor(Math.random() * select.length)
    var final = results1(index)
    embed.setDescription(final)
    msg.edit(embed)
    }, 2000, 4)

    gtftools.interval(function() {
    var item = prizes[index]

    stats.addcar(item, undefined, id)

    embed.setColor(0x216C2A)
    results = results1(index) + "\n\n" +
    "🎊 __**New Car Acquired**__ 🎊" + "\n" + item[0]
    embed.setDescription(results)
    embed.setImage(item[2])
    msg.edit(embed)}, 9000, 1)
  })
}