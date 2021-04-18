var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = process.env
////////////////////////////////////////////////////

//SSRX//

module.exports.ssrxracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
   var fpp = require(gtf.PERF).perf(racesettings["misc"]["car"], "GARAGE")["fpp"]
  var numx = gtftools.catcalc(racesettings["category"], "0%", fpp);
  var carspeed = require(gtf.PERF).speedcalc(numx, racesettings["misc"]["car"])
  var showcar =
    "\n**🚘 " +
    racesettings["misc"]["car"]["name"] +
    " " +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp + " | " + racesettings["misc"]["car"]["tires"]["current"].split(" ").map(x => x[0]).join("") + emote.tire +
    "**";
  var racelength = (racesettings["km"] / numx) * 3600 * 1000;
  return [carspeed[0], carspeed[1], showcar, racelength];
};

module.exports.ssrxmiandresults = function(
  [speedmph, speedkmh],
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], userdata);
  stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
  // stats.updatecurrentcarclean(-1)
  var results2 =
    "**Top Speed:** " +
    speedmph +
    " MPH / " +
    speedkmh +
    " KMH" +
    "\n" +
    "**Car:** " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp +
    "**";
  return results2;
};
////CAREER///
module.exports.careerracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
    var showcar =
    "\n**🚘 " +
    racesettings["misc"]["car"]["name"] +
    " " +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp + " | " + racesettings["misc"]["car"]["tires"]["current"].split(" ").map(x => x[0]).join("") + emote.tire +
    "**";
  var speed = gtftools.catcalc(["CUSTOM"], racesettings["weather"], racesettings["upperfpp"]);

  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};
////ARCADE/////

module.exports.arcaderacelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
   var showcar =
    "\n**🚘 " +
    racesettings["misc"]["car"]["name"] +
    " " +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp + " | " + racesettings["misc"]["car"]["tires"]["current"].split(" ").map(x => x[0]).join("") + emote.tire +
    "**";
          var fpp = require(gtf.PERF).perf(racesettings["misc"]["car"], "GARAGE")["fpp"]
    var speed = gtftools.catcalc(["CUSTOM"], racesettings["weather"], fpp);
  } else {
    var speed = gtftools.catcalc(racesettings["category"], racesettings["weather"], "");
  }
  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};

//////DRIFT

module.exports.driftracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
   var showcar =
    "\n**🚘 " +
    racesettings["misc"]["car"]["name"] +
    " " +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp + " | " + racesettings["misc"]["car"]["tires"]["current"].split(" ").map(x => x[0]).join("") + emote.tire +
    "**";
      
    var fpp = require(gtf.PERF).perf(racesettings["misc"]["car"], "GARAGE")["fpp"]
    var speed = gtftools.catcalc(["CUSTOM"], racesettings["weather"], fpp);
  } else {
  var speed = gtftools.catcalc(["N300"], racesettings["weather"], "");
  }
  var racelength = Math.round( ((racesettings["km"] / speed) * 3600 * 1000 ) / 2)
  return [showcar, racelength];
};

module.exports.driftsection = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata,
   last) {
  var difficulty = 60 // low numbers - more difficult
  var score = gtftools.randomInt(0, 100)
  var maxpoints = Math.ceil( ((racesettings["km"]) * 2000) / 1000) * 1000
  var gold = Math.ceil( ((racesettings["km"]) * 2000) / 100) * 100
  var silver = Math.ceil( ((racesettings["km"]* 0.90) * 2000) / 100) * 100
  var bronze = Math.ceil( ((racesettings["km"]* 0.80) * 2000) / 100) * 100

var tire = require(gtf.PARTS).find({"name":racesettings["misc"]["car"]["tires"]["current"],"type":"tires"})[0]["name"]
  var points = gtftools.randomInt(Math.round(maxpoints/8), Math.round(maxpoints/4))
  if (tire.includes("Racing")) {
    console.log("ok")
    points = Math.round(points * 0.20)
  }
  if (last && racesettings["sectors"] >= 1) {
    racesettings["sectors"]--
    return [points, gold, silver, bronze]
  }
  
  if (racesettings["sectors"] <= 0) {
    points = 0
  }
  
  if (score >= difficulty) {
    points = 0
  } else {
    racesettings["sectors"]--
  }
  return [points, gold, silver, bronze];
};

module.exports.driftresults = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], userdata);
  stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
  var medal = "COMPLETE"
  let final = require("../../functions/races/f_races_2ex").driftsection(user,racedetails,racesettings,finalgrid,startingrace,racefinished,embed,msg,args,checkpoint, userdata, true);
  racesettings["points"] += final[0]
  if (racesettings["points"] >= final[3]) {
    medal = emote.bronzetrophy + " BRONZE"
  }
  if (racesettings["points"] >= final[2]) {
    medal = emote.silvertrophy + " SILVER"
  }
  if (racesettings["points"] >= final[1]) {
    medal = emote.goldtrophy + " GOLD"
  }
  var garage =  "**Car:** " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp +
    "**";
  var results2 =
    "**" + medal + "**" + "\n" + 
    "**Points:** " + racesettings["points"] + "pts"
   
  return results2;
  
}

///ONLINE 

module.exports.onlineracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  var showcar = "";
  var fppavg = 0
  racesettings["players"].forEach(function(x) {
    fppavg = fppavg + x["car"]["fpp"]
  })
  fppavg = fppavg / racesettings["players"].length

  var speed = gtftools.catcalc(["CUSTOM"], racesettings["weather"], fppavg);

  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};

////MISC
module.exports.createfinalreactions = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  results2,
  embed,
  msg,
  args,
  checkpoint,
  userdata
) {
  if (!checkpoint[0]) {
    function func() {
      require(gtf.REPLAY).savem( racesettings["title"],results2,racedetails,"__Starting Grid - " +
          racesettings["category"] +
          " | " +
          racesettings["grid"] +
          " cars" +
          "__" +
          "\n" +
          finalgrid +
          "\n",
        userdata
      );
      embed.setDescription(results2 + "\n" + racedetails + "\n\n☑️ Replay saved.");
      embed.setColor(0x8b0000);
      msg.edit(embed);
      gtftools.removereactions(["🎥"], msg);
    }
    var emojilist = []
    function restart() {
      embed.setColor(0x0151b0);
      require('../../functions/races/f_races_2').readysetgo(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, [false, null], userdata);
      setTimeout(function() {gtftools.removereactions(["🔁","🎥"], msg)}, 5000)
    }

    if (racesettings["mode"] == "ONLINE") {
    } else {
      emojilist.push(["🔁","🔁", restart, "Once"])
    }

    emojilist.push(["🎥", "🎥", func])
    function goback() {
      userdata["raceinprogress"] = [false, ["", ""], "", userdata["id"]];
      var e = racesettings["raceid"].split("-");
      msg.channel.messages.fetch().then(messages => {
        var m = messages
          .filter(
            msge =>
              msge.content.includes("**FINISH**") &&
              msge.author.id == gtf.USERID
          )
          .first();
        m.delete({timeout:1000});
      });
      msg.delete({timeout:1000});
      if (racesettings["title"].includes("Seasonal Event")) {
        var btevent = require("../../commands/seasonal");
        btevent.execute(msg, [e[1]], userdata)
      }else {
      var btevent = require("../../commands/career");
      btevent.execute(msg, [e[0], e[1]], userdata)
      }
    }

      if (racesettings["mode"] == "CAREER") {
        //stats.updatecurrentcarclean(-1)
        if (!checkpoint[0]) {
          emojilist.push([emote.exit, "gtfexit", goback]);
        }
      }

    gtftools.createreactions(emojilist, msg, userdata);
  }
};
