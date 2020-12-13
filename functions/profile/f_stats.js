var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");
var gtfperf = require("../../functions/marketplace/f_perf");
var parts = require("../../functions/marketplace/f_parts");
var exp = require("../../profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("../../index");
var fs = require("fs")

module.exports.userid = function(userdata) {
  return userdata["id"];
};

module.exports.count = function(userdata) {
  var num = require(gtffile.MAIN).embedcounts[userdata["id"]]
  if (isNaN(num)) {
    require(gtffile.MAIN).embedcounts[userdata["id"]] = 0
    return 0
  } else {
    return num
  }
};

module.exports.credits = function(userdata) {
  return userdata["credits"];
};

module.exports.exp = function(userdata) {
  return userdata["exp"]
};

module.exports.level = function(userdata) {
  return userdata["level"]
};

module.exports.racedetails = function(userdata) {
  return gtfuser.allraces[id]["racedetails"]
};

module.exports.numcarpurchase = function(userdata) {
  return userdata["numcarpurchase"]
};

module.exports.lastonline = function(userdata) {
  return userdata["lastonline"]
};

//units
module.exports.mileage = function(type, units, userdata) {
  var label = ["km", "mi"]
  if (units === undefined || units == false) {
    label = ["", ""]
  }
  if (type == "USER") {
    return userdata["mileage"][stats.setting("MILEAGE", userdata)] + label[stats.setting("MILEAGE", userdata)]
  }
  if (type == "KM") {
    return userdata["mileage"][0] + label[0]
  }
  if (type == "MI") {
    return userdata["mileage"][1] + label[1]
  }

};

module.exports.totalmileage = function(type, units, userdata) {
  var label = ["km", "mi"]
  if (units === undefined || units == false) {
    label = ["", ""]
  }
  if (type == "USER") {
    return userdata["totalmileage"][stats.setting("MILEAGE", userdata)] + label[stats.setting("MILEAGE", userdata)]
  }
  if (type == "KM") {
    return userdata["totalmileage"][0] + label[0]
  }
  if (type == "MI") {
    return userdata["totalmileage"][1] + label[1]
  }

};

module.exports.dailyworkout = function(bool, userdata) {
  if (bool === undefined) {
    return userdata["dailyworkout"]
  } else {
    userdata["dailyworkout"] = bool
  }
}

module.exports.garage = function(userdata) {
  return userdata["garage"]
};
module.exports.sortgarage = function(type, userdata) {
  if (type == "PURCHASE") {
    userdata["garage"].sort((x,y) => parseInt(y["ID"]) - parseInt(x["ID"]))
  }
  if (type == "FPP") {
    userdata["garage"].sort((x,y) => parseInt(y["fpp"]) - parseInt(x["fpp"]))
  }

}

module.exports.gifts = function(userdata) {
  return userdata["gifts"]
};

module.exports.addgift = function(name, item, type, author, isgift, userdata) {
 var gift = [type, {"id": userdata["numgiftearned"],"name": name,
    "item": item,
    "author":author,
    "isgift":isgift}
]
console.log(gift)
  userdata["gifts"].push(gift)
  userdata["numgiftearned"]++
}

module.exports.addcount = function(userdata) {
  require(gtffile.MAIN).embedcounts[userdata["id"]]++
};

module.exports.removecount = function(userdata) {
  require(gtffile.MAIN).embedcounts[userdata["id"]]--
};

module.exports.careerraces = function(userdata) {
  return userdata["careerraces"]
};

module.exports.garagecount = function(userdata) {
  return userdata["garage"].length
};


module.exports.setting = function(setting, userdata) {
  return userdata["settings"][setting]
};

module.exports.settings = function(userdata) {
  return userdata["settings"]
};

module.exports.setsetting = function(setting, value, userdata) {
  userdata["settings"][setting] = value
};

module.exports.addcredits = function(number, userdata) {
    userdata["credits"] += number;
  /*var username = client.guilds.cache.get("239493425131552778").members.cache.get(userdata).user.username
  if (number > 0){
  console.warn("Credits: " + username + " +" + number)
  }*/
};

module.exports.addmileage = function(km, mi, userdata) {
  km = Math.round( km * 100 ) / 100
  mi = Math.round( mi * 100 ) / 100
    userdata["mileage"][0] += km;
    userdata["mileage"][1] += mi;
     userdata["mileage"][0] = Math.round( userdata["mileage"][0] * 100 ) / 100
      userdata["mileage"][1] = Math.round( userdata["mileage"][1] * 100 ) / 100
};

module.exports.addtotalmileage = function(km, mi, userdata) {
  km = Math.round( km * 100 ) / 100
  mi = Math.round( mi * 100 ) / 100
    userdata["totalmileage"][0] += km;
    userdata["totalmileage"][1] += mi;
    
     userdata["totalmileage"][0] = Math.round( userdata["totalmileage"][0] * 100 ) / 100
      userdata["totalmileage"][1] = Math.round( userdata["totalmileage"][1] * 100 ) / 100
};

module.exports.setmileage = function(km, mi, userdata) {
    userdata["mileage"][0] = km;
    userdata["mileage"][1] = mi;
};

module.exports.settotalmileage = function(km, mi, userdata) {
    userdata["totalmileage"][0] = km;
    userdata["totalmileage"][1] = mi;
};

///CURRENTCAR
module.exports.currentcar = function(userdata) {
  if (userdata["garage"].length == 0) {
    return null;
  }
    return userdata["garage"][userdata["currentcar"]-1]
}

module.exports.currentcarmain = function(userdata) {
  var currentcar = stats.currentcar(userdata)
    if (currentcar == null) {
      return "No car."
    } else {
  return "`🚘ID:" + userdata["currentcar"] + "` " + currentcar["name"] + " **" + currentcar["fpp"] + emote.fpp + "**";
}
}

module.exports.currentcarnum = function(userdata) {
    return userdata["currentcar"]
}

//////
//Starts at 1

module.exports.setcurrentcar = function(number, userdata) {
    if (number <= 0 || isNaN(number) || number === undefined || number > userdata["garage"].length) {
      return "Invalid";
    } else {
      userdata["currentcar"] = number
    }
}

module.exports.addexp = function(number, userdata) {
  if (number < 0) {
  } else {
    userdata["exp"] += number;
  }
};

module.exports.view = function(gtfcar,userdata) {
  var ocar  = require(gtffile.CARS).find({"make":[gtfcar["make"]], "fullname":[gtfcar["name"]],"year":[gtfcar["year"]]})[0]
  var garage = stats.garage(userdata)
  var perf = gtfperf.perf(gtfcar, "GARAGE")
  var cardetails = "**Car:** " + gtfcar["name"] + " `🚘ID:" + gtftools.index(garage, gtfcar) + "`\n" +
  "**Type:** " + ocar["type"] + "\n" +
  "**" + ocar["drivetrain"] + " | " + perf["fpp"] + emote.fpp + " | " + 
  perf["power"] + "hp" + " | " + perf["weight"] + "lbs**" + "\n\n" +
  "**Paint:** " + "N/A" + "\n" +
  "**Engine:** " + gtfcar["engine"]["current"] + "\n" +
  "**Transmission:** " + gtfcar["transmission"]["current"] + "\n" +
  "**Suspension:** " + gtfcar["suspension"]["current"] + "\n" +
  "**Tires:** " + gtfcar["tires"]["current"] + "\n" +
  "**Weight Reduction:** " + gtfcar["weight reduction"]["current"] + "\n" +
  "**Turbo Kits:** " + gtfcar["turbo"]["current"] + "\n" +
  "**Nitrous:** " + gtfcar["nitrous"]["current"] + "\n";
 
  return cardetails
}

module.exports.updatecurrentcarclean = function(number,userdata) {
  var car = stats.currentcar(userdata)
  var rnumber = gtftools.randomInt(1, 2)
  if (car["clean"] == 0) {
    return
  }
  if (rnumber == 2) {
    car["clean"] += number
  } else {
    return
  }
}


module.exports.addcar = function(car, arg, userdata) {
    var fullname = car["name"] + " " + car["year"]
    
  if (stats.garagecount(userdata) == 0) {
      stats.setcurrentcar(1, userdata)
  }
  userdata["currentcar"]++
  
  var tires = {current:car["tires"],
    list:[car["tires"]],
               tuning:[0]}
  var engine = {current:"Stock", 
    list:[],
               tuning:[0, 0, 0]}
  var trans = {current:"Stock", 
    list:[],
               tuning:[0]}
  var susp = {current:"Stock",
    list:[],
               tuning:[0, 0]}
  var weight = {current:"Stock",
    list:[],
               tuning:[0]}
  var turbo = {current:"Stock",
    list:[],
               tuning:[0]}

  var condition = 100
  
  //RH Tires + Eng Stage 2 A + FC Transmission + weight reduction 1 + FC Suspension
  
var fpp = gtfperf.perf(car, "DEALERSHIP")["fpp"]
var sell = require(gtffile.MARKETPLACE).sellcalc(car, "DEALERSHIP")
  userdata["numcarpurchase"]++
  var id1 = userdata["numcarpurchase"]
  var newcar = {
        "ID": id1,
        "name": fullname,
        "make": car["make"],
        "year": car["year"],
        "fpp": fpp,
        "color": {current:"Stock",
               sell: 0},
        "engine": engine,
        "transmission": trans,
        "suspension": susp,
        "tires": tires,
        "weight reduction": weight,
        "turbo": turbo,
        "nitrous": {current:"Stock", 
               tuning:0},
        "oil": 100,
        "damage": 100,
        "rims": 0,
        "condition": condition
}
 /*
  if (rating.includes("🔧")) {
    newcar["tires"] = {current:"6",
               owned:["6"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6-1][1]),
               tuning:0}
    newcar["sell"] =  newcar["sell"] + newcar["tires"]["sell"]
  } else if (rating.includes("<:gt4:")) {
    engine = {current:"3",
               owned:["3"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.engine()[3-1][1]),
               tuning:0}
    trans = {current:"5",
               owned:["5"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[5-1][1]),
               tuning:0}
    susp = {current:"3",
               owned:["3"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[3-1][1]),
               tuning:0}
    tires = {current:"7",
               owned:["7"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.tires()[7-1][1]),
               tuning:0}
    weight = {current:"1",
               owned:["1"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[1-1][1]),
               tuning:0}
    newcar["engine"] = engine
    newcar["transmission"] = trans
    newcar["suspension"] = susp
    newcar["tires"] = tires
    newcar["weightreduction"] = weight
    newcar["sell"] = newcar["sell"] + newcar["engine"]["sell"] + newcar["transmission"]["sell"] + newcar["suspension"]["sell"] + newcar["tires"]["sell"] + newcar["weightreduction"]["sell"]
  } else if (rating.includes("<:gt3:")) {
    
        engine = {current:"5",
               owned:["5"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.engine()[5-1][1]),
               tuning:0}
    trans = {current:"5",
               owned:["5"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[5-1][1]),
               tuning:0}
    susp = {current:"3",
               owned:["3"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[3-1][1]),
               tuning:0}
    tires = {current:"7",
               owned:["7"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.tires()[7-1][1]),
               tuning:0}
    weight = {current:"3",
               owned:["3"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[3-1][1]),
               tuning:0}
    
    newcar["engine"] = engine
    newcar["transmission"] = trans
    newcar["suspension"] = susp
    newcar["tires"] = tires
    newcar["weightreduction"] = weight
    
    newcar["sell"] = newcar["sell"] + newcar["engine"]["sell"] + newcar["transmission"]["sell"] + newcar["suspension"]["sell"] + newcar["tires"]["sell"] + newcar["weightreduction"]["sell"]
  } else if (rating.includes("<:gt1:")) {
    
           engine = {current:"6",
               owned:["6"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.engine()[6-1][1]),
               tuning:0}
    trans = {current:"5",
               owned:["5"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[5-1][1]),
               tuning:0}
    susp = {current:"3",
               owned:["3"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[3-1][1]),
               tuning:0}
    tires = {current:"7",
               owned:["7"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.tires()[7-1][1]),
               tuning:0}
    weight = {current:"5",
               owned:["5"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[5-1][1]),
               tuning:0}
    
    newcar["engine"] = engine
    newcar["transmission"] = trans
    newcar["suspension"] = susp
    newcar["tires"] = tires
    newcar["weightreduction"] = weight
    newcar["sell"] =     newcar["sell"] = newcar["sell"] + newcar["engine"]["sell"] + newcar["transmission"]["sell"] + newcar["suspension"]["sell"] + newcar["tires"]["sell"] + newcar["weightreduction"]["sell"]
  } else {
    newcar["tires"] = {current:"4",
               owned:["4"], 
               sell: require(gtffile.MARKETPLACE).sellcalc(parts.tires()[4-1][1]),
               tuning:0}
    newcar["sell"] = newcar["sell"] + newcar["tires"]["sell"] 
  }
  */
  newcar["fpp"] = gtfperf.perf(newcar, "GARAGE")["fpp"]
  
  if (arg == "ITEM") {
    return newcar
  } else {
    userdata["garage"].push(newcar)
    stats.save(userdata)
    return
  }
  
}

module.exports.updatecareerrace = function(raceid, place, userdata) {
  var raceidcomplete = raceid.split("-").slice(0,-1).join("-") + "-";
  for (var i = 0; i < userdata["careerraces"].length; i++) {
  if (userdata["careerraces"][i][0] == raceidcomplete) {
      if (userdata["careerraces"][i][1] == "✅") {
        return
      }
    }
  }
  for (var i = 0; i < userdata["careerraces"].length; i++) {
    if (place.includes(">")) {
        place = place.split(" ")[1]
    }
    if (userdata["careerraces"][i][0] == raceid) {
      var currentnumber = userdata["careerraces"][i][1]
      currentnumber = parseInt(currentnumber.split(/[A-Z]/gi)[0])
      var placenumber = parseInt(place.split(/[A-Z]/gi)[0])
      if (placenumber <= currentnumber) {
        userdata["careerraces"][i][1] = place
      }
      return
    }
  }
  if (place.includes(">")) {
    place = place.split(" ")[1]
  }
  userdata["careerraces"].push([raceid, place])
};

module.exports.checkcareerrace = function(raceid, userdata) {
  var raceidcomplete = raceid.split("-").slice(0,-1).join("-") + "-";
  for (var i = 0; i < userdata["careerraces"].length; i++) {
    if (userdata["careerraces"][i][0] == raceid) {
        return "`" + userdata["careerraces"][i][1] + "`"
    }
    if (userdata["careerraces"][i][0] == raceidcomplete) {
      if (userdata["careerraces"][i][1] == "✅") {
        return "`" + "1st" + "`"
      }
    }
  }
    return ""
}

module.exports.isracescomplete = function(eventid, total, pnumber, userdata) {
  var count = 0;
  var i = 0
  var regex = new RegExp("^" + eventid + "-")
  var events = userdata["careerraces"].filter(x => x[0].match(regex) != null)
  
  if (events.length == 0) {
    return false
  }
  if (events[0][1] == "✅") {
    return false
  }
  while (i < events.length || i < count) {
    if (events[i][1].split(/[A-Z]/gi)[0] <= pnumber) {
        count++
    }
    i++
  }
  if (count == total) {
    return true
  } else {
    return false
  }
}


module.exports.gift = function(title, gift, embed, msg, userdata) {
  var type = gift[0]
  console.log(type)
  if (type == "CREDITS") {
    stats.addcredits(parseInt(gift[1]["credits"]), userdata)
    userdata["gifts"] = userdata["gifts"].filter(x => x["id"] !== gift[1]["id"])
    
    require(gtffile.EMBED).success(title, "**Credits:** **+" + gtftools.numFormat(gift[1]["credits"]) + emote.credits + "**" , 0, true, embed, msg, userdata);
    stats.save(userdata)
  } else if (type = "RANDOMCAR") {
  delete gift[1]["id"]
  var prizes = require(gtffile.CARS).random(gift[1], 4)
  require(gtffile.MARKETPLACE).fourcargifts(title, "**" + title + "**", prizes, embed, msg, userdata)
  
    stats.save(userdata)
  }
}

module.exports.eventcomplete = function(eventid, userdata) {
  var regex = new RegExp("\\b" + eventid + "-", "gi")
  userdata["careerraces"] = userdata["careerraces"].filter(x => (x[0].match(regex) == null))
  userdata["careerraces"].push([eventid + "-", "✅"])
}

module.exports.eventstatus = function(eventid, userdata) {
  eventid = eventid + "-"
  var list = userdata["careerraces"].filter(x => (x[0] == eventid))
  if (list.length == 0) {
    return "⬛"
  } else {
  return list[0][1]
  }
}

module.exports.removecar = function(car, num, sell, userdata) {
  stats.addcredits(sell, userdata)
  
  var prevcarid = stats.currentcar(userdata)["ID"]
  var removedcarid = car['ID']
  var pi;
  var ri;
  
  for (var i = 0; i < userdata["garage"].length; i++) {
    if (stats.garage(userdata)[i]["ID"] == removedcarid) {
      ri = i
    }
  }
  
  var garage = userdata["garage"].filter(x => (x["ID"] != num))
  userdata["garage"] = garage
  
  for (var i = 0; i < userdata["garage"].length; i++) {
    if (stats.garage(userdata)[i]["ID"] == prevcarid) {
      pi = i
    }
  }
  
  if (ri <= pi) {
    userdata["currentcar"]--
  }

}

module.exports.removecars = function(start, end, userdata) {
  var count = (end - start) + 1
  var total = 0
  var car = ""

  var i = 0
  while (i < count) {
    car = stats.garage(userdata)[start - 1]
    total += gtfperf.perf(car, "GARAGE")["sell"]
    
    stats.removecar(car, car["ID"], gtfperf.perf(car, "GARAGE")["sell"], userdata)
    
    i++
  }
  return total
}

module.exports.updatecurrentcar = function(car, userdata) {
  userdata["garage"][userdata["currentcar"]] = car
}

module.exports.raceinprogressstat = function(userdata) {
   return userdata["raceinprogress"]
}

module.exports.raceinprogress = function(bool, mid, time, userdata) {
  if (bool === 'undefined') {
  } else {
    userdata["raceinprogress"][0] = bool
  }
  if (mid === 'undefined') {
  } else {
    userdata["raceinprogress"][1] = mid
  }
  if (time === 'undefined') {
  } else {
    userdata["raceinprogress"][2] = time
  }
  return [bool, mid, time]
}

module.exports.inlobbystat = function(userdata) {
  return userdata["inlobby"]
}

module.exports.inlobby = function(bool, mid, userdata) {
  if (bool === 'undefined') {
  } else {
    userdata["inlobby"][0] = bool
  }
  if (mid === undefined) {
  } else {
    userdata["inlobby"][1] = mid
  }
  return [bool, mid]
}
module.exports.levelup = function(number, userdata) {
  if (number == 0) {
    return
  } else {
    userdata["level"] += number
  }
}


module.exports.main = function(userdata) {
  userdata["count"]++
  userdata["mileage"] = [Math.round(100 * userdata["mileage"][0]) / 100, Math.round(100 * userdata["mileage"][1]) / 100]
  
  var levelup = exp.islevelup(userdata)
  var gifts = ""
  if (levelup[0]) {
    levelup = "`LEVEL UP`"
  } else {
    levelup = ""
  }
   
  if (stats.gifts(userdata).length > 0) {
    gifts = stats.gifts(userdata).length + "🎁 "
  }

  if (stats.setting("MILEAGE", userdata) == 0) {
    var dwdistance = "/42.1km"
  } else {
    var dwdistance = "/26.2mi"
  }
  var currdate = gtftools.getFormattedDate(new Date(), userdata);

  if (userdata["lastonline"] != currdate) {
    userdata["dailyworkout"] = false;
    stats.setmileage(0, 0, userdata);
  }
  userdata["lastonline"] = currdate;
  
    return gifts + gtftools.numFormat(userdata["credits"]) + emote.credits +
    "  " +
    userdata["exp"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    emote.exp + " " + "Lv." + userdata['level']
    //stats.mileage("USER", false, userdata).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + dwdistance + emote.mileage +
};


/////RACES//////

module.exports.addracedetails = function(racesettings, racedetails, finalgrid, args, userdata) {
  userdata["racedetails"] = [racesettings, racedetails, finalgrid, args]
};


module.exports.removeracedetails = function(userdata) {
  userdata["racedetails"] = []
};

module.exports.resumerace = function(userdata, client) {
  if (userdata["racedetails"].length == 0) {
    return 
  }
  if (!userdata["raceinprogress"][0] || userdata["raceinprogress"][1][0] === undefined || userdata["raceinprogress"][1][1] === undefined) {
      return
  }
  var server = client.guilds.cache.get("239493425131552778")
  var server2 = server.channels.cache.get(userdata["raceinprogress"][1][0])

      var racesettings = userdata["racedetails"][0]
      var racedetails = userdata["racedetails"][1]
      var finalgrid = userdata["racedetails"][2]
      var args = userdata["racedetails"][3]
      
      var user = server2.guild.members.cache.get(userdata["id"]).toString()
      var userm = server2.guild.members.cache.get(userdata["id"]).toString()
      var startingrace = true;
      var racefinished = false;

      console.log("Race is resuming for " + user)
  server2.messages.fetch({around: userdata["raceinprogress"][1][1], limit: 1}).then(messages => {
      var msg = messages.first()
      if (msg.content.includes("FINISH")) {
        console.log("Already Finished")
        userdata["raceinprogress"] = [
          false,
          ["", ""],
          undefined,
          id
        ];
        return
      }
      var embed = new Discord.MessageEmbed(msg.embeds[0])
      embed.setColor(0xFFFF00)
      var race = require("../../functions/races/f_races_2").readysetgo(user,
          racedetails, racesettings, finalgrid, startingrace, racefinished,
                      embed, msg, args, [true], userdata)

    });
    return true
}


module.exports.save = function(userdata, condition) {
  if (Object.keys(userdata).length <= 5) {
    return
  }
  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"
  MongoClient.connect(url, { useUnifiedTopology: true }, 
   function(err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
    if (condition == "DELETE") {
      dbo.collection("USERS").deleteOne({"id":userdata["id"]})
    } else {
 dbo.collection("USERS").replaceOne({"id":userdata["id"]}, userdata).then(() => {
   console.log("User data saved.") 
    db.close()})
    }
      //delete data[row["id"]]["_id"]
    
      })

}