const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");

var rwet = function() {
  return gtftools.randomInt(5, 100)
};

var timelist = function() {
  return [
    ["0:00", "Night"],
    ["1:00", "Night"],
    ["2:00", "Night"],
    ["3:00", "Night"], 
    ["4:00", "Night"],
    ["5:00" ,"Night"], 
    ["6:00", "Sunrise"],
    ["7:00", "Sunrise"], 
    ["8:00", "Day"],
    ["9:00", "Day"],
    ["10:00", "Day"],
    ["11:00", "Day"],
    ["12:00", "Day"],
    ["13:00", "Day"],
    ["14:00", "Day"],
    ["15:00", "Day"],
    ["16:00", "Day"],
    ["17:00", "Day"],
    ["18:00", "Day"],
    ["19:00", "Day"],
    ["20:00", "Sunset"],
    ["21:00", "Night"],
    ["22:00", "Night"],
    ["23:00", "Night"]].sort()
}

var weatherlist = function() {
  return [
    ["Clear","🔆", 0],
    ["Partly Cloudy", "⛅", 0], 
    ["Overcast", "☁", 0],
    ["Rain", "🌧", rwet()], 
    ["Storm", "⛈", 100], 
    ["Snow", "🌨", rwet()]
    ].sort()
}




/*module.exports.Env = function(args) {
  if (name == undefined) {
  this.time = null
  this.timeemote = null
  this.weather = null
  this.surface = null
  this.surfaceemote = null
    return this
  }
  
  if (name == "Random" || name == "R" || name == "random") {
    return require(process.env.GTSCARS).RandomGTSCar();
  }
}*/

module.exports.RandomEnv = function(args) {
  var time = args.time
  var weather = args.weather
  
  if (time == undefined || time == "random" || time == "Random" || time == "R") {
      time = ""
  }
  if (weather == undefined || weather == "random" || time == "Random"|| weather == "R") {
      weather = ""
  }
  
  var tlist = timelist()
  var wlist = weatherlist()
  if (time == "Day" || time == "Night" || time == "Sunset" || time == "Sunrise") {
    tlist = tlist.filter(x => (x[1] == time))
  }
  
  if (weather == "Clear" || weather == "Partly Cloudy" || weather == "Overcast" || weather == "Rain" || weather == "Storm" || weather == "Snow") {
    wlist = wlist.filter(x => (x[0] == weather))
    var weatherselect = wlist[0]
  } else {
  var chance = [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 4]
  var index = chance[Math.floor(Math.random() * chance.length)]
  var weatherselect = wlist[index]
  }
  
  var timeselect = tlist[Math.floor(Math.random() * tlist.length)]
  timeselect[1] = timeselect[1].replace("Day", "☀").replace("Night", "🌙").replace("Sunset", "🌇").replace("Sunrise", "🌅")
  
 
  
  this.time = timeselect[0]
  this.timeemote = timeselect[1]
  this.weather = weatherselect[0];
  this.surface = weatherselect[2];
  this.surfaceemote = weatherselect[1];
  return this
}
