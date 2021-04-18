var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////
module.exports.time = function(results, number, pageargs, embed, msg, userdata) {
    var list = []
    var page = 0
    var date = new Date()
    pageargs["footer"] = "❓ **What time is it? Select with the number corresponding to your current time zone (Military Time).**"

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
      require(gtf.EMBED).warning("⚠ Invalid Number", "Invalid time zone.", embed, msg, userdata);
    }
  }
  if (number === undefined) {
    success = false;
  }
  if (success) {
    stats.setsetting("TIME OFFSET", list[number-1][1], userdata)
    stats.setmileage(0, 0, userdata);
    
    require(gtf.EMBED).success("✅ Success", "Local time has been set to **" + list[number-1][0] + "**." + "\n⚠ Daily mileage has been reset.", 5000, true, embed, msg, userdata)
    
    return "SUCCESS"
  } else {

    var page = 0
        list = list.map(function(x) {
      return [x[0], " "]
    })
        
    pageargs['list'] = list;
		pageargs['text'] = gtftools.formpage(pageargs, embed, msg, userdata);
		gtftools.formpages(pageargs, embed, msg, userdata); 
    return "PAGES"
  }
}
module.exports.units = function(results, number, pageargs, embed, msg, userdata) {
  embed.setTitle("__GTF Settings - Mileage Units__")
  pageargs["footer"] = "❓ **Select units corresponding from the list above.**"
  var list = [["Kilometers (KM)", " "], ["Mileage (MI)", " "]]
  var success = true;
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
    success = false;
    if (!isNaN(number)) {
      require(gtf.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, userdata);
    }
  }
  if (number === undefined) {
    success = false
  }
  if (success) {
    stats.setsetting("MILEAGE", number-1, userdata)
    require(gtf.EMBED).success("✅ Success", "Your units has been set to **" + list[number-1][0] + "**.", 5000, true, embed, msg, userdata)
    return "SUCCESS"

  } else {
    
    var page = 0
        list = list.map(function(x) {
      return [x[0], " "]
    })
    pageargs['list'] = list;
		pageargs['text'] = gtftools.formpage(pageargs, embed, msg, userdata);
		gtftools.formpages(pageargs, embed, msg, userdata)
    ;return "PAGES"
  }
}

module.exports.progressbar = function(results, number, pageargs, embed, msg, userdata) {
  embed.setTitle("__GTF Settings - Progress Bar__")
  pageargs["footer"] = "❓ **Select a color corresponding from the list above.**"
  var list = [["White", ["⬜", "⬛"]], ["Red", ["🟥", "⬛"] ], ["Orange", ["🟧", "⬛"]], ["Yellow", ["🟨",  "⬛"]], ["Green", ["🟩",  "⬛"]], ["Blue", ["🟦", "⬛"]], ["Purple", ["🟪", "⬛"]], ["Brown", ["🟫",  "⬛"]], ["GT6 " + emote.exp + "`Lv.10`", [emote.gt6progressbar, emote.gt6progressbarblack] ]]
    var success = true;
  
  if (number <= 0 || number >= (list.length + 1) || (number.length != 0 && isNaN(number))) {
      success = false;
    if (!isNaN(number)) {
      require(gtf.EMBED).warning("⚠ Warning", "Invalid arguments", embed, msg, userdata);
    }
  }
  console.log(number)
  if (number === undefined || isNaN(number)) {
    success = false;
  } else {
    if (list[number-1][0].includes(emote.exp)) {
    if (!require(gtf.EXP).checklevel(parseInt(list[number-1][0].split(emote.exp + "`Lv.")[1].split("`")[0]), embed, msg, userdata)) {
      success = false 
      return "INVALID"
      }
    }
  }
  
  if (success) {

    stats.setsetting("PROGRESSBAR", list[number-1][1], userdata)

    require(gtf.EMBED).success("✅ Success", "Progress Bar Color has been set to **" + list[number-1][1].join(" ") + "**.", 5000, true, embed, msg, userdata)
    return "SUCCESS"
  } else {

    var page = 0
    list = list.map(function(x) {
      
      return [x[0], " "]
    })

       pageargs['list'] = list;
		pageargs['text'] = gtftools.formpage(pageargs, embed, msg, userdata);
		gtftools.formpages(pageargs, embed, msg, userdata);
    return "PAGES"
  }
}