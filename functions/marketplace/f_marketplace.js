var gtf = require("/home/runner/gtfbot/functions/f_gtf")
var stats = require("/home/runner/gtfbot/functions/profile/f_stats")
var emote = require("/home/runner/gtfbot/index")
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools")
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtffile = process.env
////////////////////////////////////////////////////

module.exports.purchase = function(user, item, type, embed, msg, userdata) {
  var applytocurrentcar = ""
  var oldpartmessage = ""
  var installedoncurrentcar = ""
  var fpp = ""
  var rating = ""
  var replacement = ""

  var part_tostock = false
  var part_in_inv = false

  if (type == "CAR") {
    var name = item["name"] + " " + item["year"]
    
    var fpp = gtfperf.perf(item, "DEALERSHIP")["fpp"]
    var dealershipcost = require(gtffile.MARKETPLACE).costcalc(item, fpp)
    var mcost = dealershipcost
    var link = item["image"]
    var make = item["make"]

    embed.setImage(link)
    if (require(gtffile.EMBED).checkgarageerror(embed, msg, userdata)) {
      return
    }
    fpp = "\n**Specs: " + fpp + "**" + emote.fpp + "**" + " | " + item["power"] + "hp" + " | " + item["weight"] + "ibs"  + "**"
  }
  if (type == "ROLE") {
    var name = item[0]
    var cost = item[1]
    var mcost = cost
  }
  if (type == "PART") {
    if (stats.currentcarmain(userdata) == "No car.") {
      require(gtffile.EMBED).error("❌ No Car", "You do not have a current car.", embed, msg, userdata)
      return
    }
    var car = stats.currentcar(userdata)

    var type1 = item["type"]
    var name = item["type"] + " " + item["name"]
    var cost = item["cost"]
    var mcost = cost

    replacement = "\n**" + type1.charAt(0).toUpperCase() + type1.slice(1) + " " + car[type1.toLowerCase()]["current"] + " -> " + name + "**\n"

    type1 = type1.toLowerCase()
    if (item["name"] == "Stock") {
      part_tostock = true
      if (car[type1]["current"] == "Stock") {
        require(gtffile.EMBED).error("❌ Part Already Stock", "This part is already stock in your **" + car["name"] + "**.", embed, msg, userdata)
        return
      }
    }

    if (car[type1]["current"] == "Stock") {
      var oldpart = { name: "Stock", type: type1, cost: 0 }
    } else {
      var oldpart = require(gtffile.PARTS).find({ name: car[type1]["current"], type: type1 })[0]
    }
    oldpartmessage = "\nReplaced **" + car[type1]["current"] + "**."
    if (car[type1]["list"].includes(item["name"])) {
      cost = 0
      mcost = 0
      part_in_inv = true
    }

    var perf1 = gtfperf.partpreview(oldpart, car, "GARAGE")
    var perf2 = gtfperf.partpreview(item, car, "GARAGE")

    var powerdesc = ""
    var weightdesc = ""
    if (perf1["power"] != perf2["power"]) {
      powerdesc = "\n" + "**Power: " + perf1["power"] + "hp -> " + perf2["power"] + "hp**"
    }
        if (perf1["weight"] != perf2["weight"]) {
      weightdesc = "\n" + "**Weight: " + perf1["weight"] + "ibs -> " + perf2["weight"] + "ibs**"
    }

    fpp = "\n**FPP: " + perf1["fpp"] + emote.fpp + " -> " + perf2["fpp"] + "**" + emote.fpp +  powerdesc + weightdesc
  }
  if (type == "PAINT") {
    if (stats.currentcarmain(userdata) == "No car.") {
      require(gtffile.EMBED).error("❌ No Car", "You do not have a current car.", embed, msg)
      return
    }
    var car = stats.currentcar(userdata)

    var type1 = item[1]
    var name = item[2]
    var cost = item[3]
    var mcost = cost
    var includefpp = item[4]
    var id = require(gtffile.PARTS).paintid(name, item[0])
    item[0] = id

    if (car[type1][0] == id) {
      require(gtffile.EMBED).error("❌ Same Paint", "You already have this paint on your **" + car["name"] + "**.", embed, msg, userdata)
      return
    }

    if (car[type1][0] != "S") {
      replacement = "\n**" + require(gtffile.PARTS).getpart(type1, car[type1][0])[0] + " -> " + name + "**\n"
    }
    applytocurrentcar = "\n\n" + "⚠️ This will be painted to your **" + car["name"] + "**."
  }

  if (stats.credits(userdata) - mcost < 0) {
    require(gtffile.EMBED).error("❌ Insufficient Credits", "You have insufficient credits to purchase the **" + name + "**.\n\n" + "**Credits: " + stats.credits(userdata) + emote.credits + "** -> **" + mcost.toString().replace(/\B(?=(\d{3}) +(?!\d))/g, ",") + "**" + emote.credits, embed, msg, userdata)
    return
  }

  if (part_tostock) {
    var results = "Revert **" + car[type1]["current"] + "** to **Stock**? " + applytocurrentcar + replacement + fpp
  } else if (part_in_inv) {
    var results = "Reinstall **" + name + "** for no cost? " + applytocurrentcar + replacement + fpp
  } else {
    var results = "Purchase **" + name + "**?** " + mcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + applytocurrentcar + replacement + fpp
  }

  embed.setDescription(results)
  embed.addField(stats.main(userdata), stats.currentcarmain(userdata))
  msg.channel.send(embed).then(msg => {
    function purchase() {
      var changecar = false
      if (type == "ROLE") {
        stats.addcredits(-cost, userdata)
        let role = msg.guild.roles.find(r => r.name === item[0])
        user.roles.add(role).catch(console.error)
        installedoncurrentcar = "\n" + "Purchased " + "**" + item[0] + "**." + " **-" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits
      }

      if (type == "CAR") {
        stats.addcredits(-mcost, userdata)
        stats.addcar(item, undefined, userdata)
        changecar = true
        installedoncurrentcar = "Purchased " + "**" + name + " " + rating + "**." + " **-" + mcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + "\n\n❓ **Click the 🚘 to change to this car.**"
        cost = mcost
      }
      if (type == "PART") {
        if (part_tostock) {
          gtfperf.partinstall(item, userdata)
        } else {
          stats.addcredits(-cost, userdata)
          gtfperf.partinstall(item, userdata)
          installedoncurrentcar = "Installed **" + name + "** on **" + car["name"] + "**." + " **-" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits
        }
      }
      if (type == "PAINT") {
        stats.addcredits(-cost, userdata)
        require(gtffile.PARTS).install(item, userdata)
        installedoncurrentcar = "Painted **" + name + "** on **" + car["name"] + "**."
      }

      if (part_tostock) {
        results = "Reinstalled " + name + " on **" + car["name"] + "**."
      } else {
        results = installedoncurrentcar
      }

      require(gtffile.EMBED).success("✅ Success", results, 0, false, embed, msg, userdata)

      if (changecar) {
        function change() {
          require("/home/runner/gtfbot/commands/garage").execute(msg, [stats.garagecount(userdata)], userdata)
        }
        var emojilist = [["🚘", "🚘", change]]

        gtftools.createreactions(emojilist, msg, userdata)
      } else {
        msg.delete({ timeout: 5000 })
      }
    }
    var emojilist = [[emote.yes, "Yes", purchase]]
    gtftools.createreactions(emojilist, msg, userdata)
  })
}

module.exports.sell = function(user, item, type, embed, msg, userdata) {
  embed.setColor(0xffff00)

  var results = ""
  if (type == "CAR") {
    var id = item["ID"]
    var name = item["name"]
    var sell = gtfperf.perf(item, "GARAGE")["sell"]
    if (stats.currentcar(userdata) != null) {
      if (stats.currentcar(userdata)[0] == id) {
        require(gtffile.EMBED).error("❌ Current Car", "You cannot sell a car you are currently in.", embed, msg, userdata)
        return
      }
    }
    results = "Sell " + name + " for **" + sell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + "?"
  }

  if (type == "CARS") {
    var first = item[0]
    var last = item[1]
    var name = "**" + (last - first + 1) + "** cars"
    results = "Sell " + name + " from your garage (IDs: " + first + "-" + last + ") ?"
  }
  embed.fields = []
  embed.setDescription(results)
  embed.addField(stats.main(userdata), stats.currentcarmain(userdata))

  msg.channel.send(embed).then(msg => {
    function sell1() {
      if (type == "CAR") {
        stats.removecar(item, id, sell, userdata)
        results = "Sold **" + name + "**." + " **+" + sell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits
      }
      if (type == "CARS") {
        var money = stats.removecars(first, last, userdata)
        results = "Sold **" + name + "**. " + "**+" + money + "**" + emote.credits
      }
      require(gtffile.EMBED).success("✅ Success", results, 5000, false, embed, msg, userdata)

      return
    }

    var emojilist = [[emote.yes, "Yes", sell1]]

    gtftools.createreactions(emojilist, msg, userdata)
  })
}

module.exports.sellcalc = function(cost) {
  return -Math.ceil((-cost * 0.3 + 1) / 100) * 100
}

module.exports.costcalc = function(gtfcar, fpp) {
  var cost = gtfcar["carcostm"] * 10000
    if (fpp == undefined) {
  } else {
    var offset = fpp - 250
    if (offset < 0) {
      cost = (-offset)**1.8 + cost
    } else {
    cost = offset**1.8 + cost
    }
  }

  return Math.round(cost / 100) * 100
}

module.exports.fourcargifts = function(title, results, prizes, embed, msg, userdata) {
  var select = [[emote.rightarrow + " ", emote.transparent + " ", emote.transparent + " ", emote.transparent + " "], [emote.transparent + " ", emote.rightarrow + " ", emote.transparent + " ", emote.transparent + " "], [emote.transparent + " ", emote.transparent + " ", emote.rightarrow + " ", emote.transparent + " "], [emote.transparent + " ", emote.transparent + " ", emote.transparent + " ", emote.rightarrow + " "]]
  embed.fields = []
  embed.setTitle("__" + title + "__")
  embed.setDescription(results)
  embed.setColor(0x8b0000)
  msg.channel.send(embed).then(msg => {
    var index = 0
    var results1 = function(index) {
      return select[index][0] + "||" + prizes[0]["name"] + " " + prizes[0]["year"] + "||" + "\n" + select[index][1] + "||" + prizes[1]["name"] + " " + prizes[1]["year"] + "||" + "\n" + select[index][2] + "||" + prizes[2]["name"] + " " + prizes[2]["year"] + "||" + "\n" + select[index][3] + "||" + prizes[3]["name"] + " " + prizes[3]["year"] + "||"
    }

    gtftools.interval(
      function() {
        index = Math.floor(Math.random() * select.length)
        var final = results1(index)
        embed.setDescription(final)
        msg.edit(embed)
      },
      2000,
      4
    )

    gtftools.interval(
      function() {
        var item = prizes[index]

        stats.addcar(item, undefined, userdata)

        embed.setColor(0x216c2a)
        results = results1(index) + "\n\n" + "🎊 __**New Car Acquired**__ 🎊" + "\n" + item["name"] + " " + item["year"]
        embed.setDescription(results)
        embed.setImage(item["image"])
        msg.edit(embed)
      },
      9000,
      1
    )
  })
}
