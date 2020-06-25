var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var race = require("/home/runner/gtfbot/functions/races/f_races");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
module.exports.time = function(results, number, query, embed, msg, id) {
  
    var list = []
    var page = 0
    var date = new Date()

    var minutes = date.getMinutes()
    if (minutes <= 9) {
      minutes = "0" + minutes
    }

    for (var index = 0; index < 24; index++) {
      var localTime = date.getTime();
      var localOffset = date.getTimezoneOffset() * 60000;
      var utc = localTime + localOffset;
      var offset = index
      var usertime = utc + (3600000*offset);
      usertime = new Date(usertime);
      
  
      list.push([usertime.getHours() + ":" + minutes, index])
    }
  
    var success = true;
  
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
      success = false;
    if (!isNaN(number)) {
      require(gtffile.EMBED).warning("⚠ Invalid Number", "Invalid time zone.", embed, msg, id);
    }
  }
  if (number === undefined) {
    success = false;
  }
  if (success) {
    stats.setsetting("TIME OFFSET", list[number-1][1], id)
    stats.setmileage(0, 0, id);
    
    require(gtffile.EMBED).success("✅ Success", "Local time has been set to **" + list[number-1][0] + "**." + "\n⚠ Daily mileage has been reset.", 5000, true, embed, msg, id)
    
    return "SUCCESS"
  } else {

    var page = 0
        list = list.map(function(x) {
      return [x[0], " "]
    })
    results = gtftools.list(list, page, "", "", true, "", 10, id)
    embed.setDescription(results + "\n" + "❓ **What time is it? Select with the number corresponding to your current time zone (Military Time).**");
    gtftools.createpages(results, list, page, "", "", true, "", 10, [query, "settings"], embed, msg, id)
    return "PAGES"
  }
}
module.exports.units = function(results, number, query, embed, msg, id) {
  embed.setTitle("__GTF Settings - Units__")
  var list = [["Kilometers (KM)", " "], ["Mileage (MI)", " "]]
  var success = true;
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
    success = false;
    if (!isNaN(number)) {
      require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, id);
    }
  }
  if (number === undefined) {
    success = false
  }
  if (success) {
    stats.setsetting("MILEAGE", number-1, id)
    require(gtffile.EMBED).success("✅ Success", "Your units has been set to **" + list[number-1][0] + "**.", 5000, true, embed, msg, id)
    return "SUCCESS"

  } else {
    
    var page = 0
        list = list.map(function(x) {
      return [x[0], " "]
    })
    results = gtftools.list(list, page, "", "", true, "", 10, id)
    embed.setDescription(results + "\n" + "❓ **Select units corresponding from the list above.**" );
    gtftools.createpages(results, list, page, "", "", true, "", 10, [query, "settings"], embed, msg, id)
    return "PAGES"
  }
}

module.exports.progressbar = function(results, number, query, embed, msg, id) {
  var list = [["White", ["⬜", "⬛"]], ["Red", ["🟥", "⬛"] ], ["Orange", ["🟧", "⬛"]], ["Yellow", ["🟨",  "⬛"]], ["Green", ["🟩",  "⬛"]], ["Blue", ["🟦", "⬛"]], ["Purple", ["🟪", "⬛"]], ["Brown", ["🟫",  "⬛"]], ["GT6 " + emote.exp + "`Lv.10`", [emote.gt6progressbar, emote.gt6progressbarblack] ]]
    var success = true;
  
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
      success = false;
    if (!isNaN(number)) {
      require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments", embed, msg, id);
    }
  }
  console.log(number)
  if (number === undefined || isNaN(number)) {
    success = false;
  } else {
    if (list[number-1][0].includes(emote.exp)) {
    if (!exp.checklevel(parseInt(list[number-1][0].split(emote.exp + "`Lv.")[1].split("`")[0]), embed, msg, id)) {
      success = false 
      return "INVALID"
      }
    }
  }
  
  if (success) {

    stats.setsetting("PROGRESSBAR", list[number-1][1], id)

    require(gtffile.EMBED).success("✅ Success", "Progress Bar Color has been set to **" + list[number-1][1].join(" ") + "**.", 5000, true, embed, msg, id)
    return "SUCCESS"
  } else {

    var page = 0
    list = list.map(function(x) {
      
      return [x[0], " "]
    })

    results = gtftools.list(list, page, "", "", true, "", 10, id)
    embed.setDescription(results + "\n" + "❓ **Select a color corresponding from the list above.**");
    gtftools.createpages(results, list, page, "", "", true, "", 10, [query, "settings"], embed, msg, id)
    return "PAGES"
  }
}

/*module.exports.compact = function(results, number, embed, msg, id) {
  var list = [["On", " "], ["Off", " "]]
    var success = true;
  
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
      success = false;
    if (!isNaN(number)) {
      require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments", embed, msg, id);
    }
  }
  if (number === undefined) {
    success = false;
  }
  if (success) {
    embed.setTitle("__GTF Settings - Compact Mode__")
    stats.setsetting("COMPACTMODE", list[number-1][0], id)
    embed.setColor(0x216C2A)

    results = "☑️ Compact Mode has been set to **" + list[number-1][0] + "**."
    return results
  } else {

    var page = 0
    list = list.map(function(x) {
      
      return [x[0], " "]
    })

    results = gtftools.list(list, page, "", "", true, "", 10,id)
    embed.setDescription(results + "\n" + "❓ **Select a color corresponding from the list above.**");
    gtftools.createpages(results, list, page, "", "", true, "", 10,  embed, msg, id)
    return "PAGES"
  }
}*/