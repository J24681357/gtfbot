var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var parts = require("/app/functions/marketplace/f_parts");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("/app/index");


module.exports.userid = function(id) {
  return gtfuser.gtfuserdata[id]["id"];
};

module.exports.count = function(id) {
  return gtfuser.gtfuserdata[id]["count"];
};

module.exports.credits = function(id) {
  return gtfuser.gtfuserdata[id]["credits"];
};

module.exports.exp = function(id) {
  return gtfuser.gtfuserdata[id]["exp"]
};

module.exports.level = function(id) {
  return gtfuser.gtfuserdata[id]["level"]
};

module.exports.racedetails = function(id) {
  return gtfuser.allraces[id]["racedetails"]
};

module.exports.numcarpurchase = function(id) {
  return gtfuser.gtfuserdata[id]["numcarpurchase"]
};

module.exports.lastonline = function(id) {
  return gtfuser.gtfuserdata[id]["lastonline"]
};

//unit
module.exports.mileage = function(type, units, id) {
  var label = ["km", "mi"]
  if (units === undefined || units == false) {
    label = ["", ""]
  }
  if (type == "USER") {
    return gtfuser.gtfuserdata[id]["mileage"][stats.setting("MILEAGE", id)] + label[stats.setting("MILEAGE", id)]
  }
  if (type == "KM") {
    return gtfuser.gtfuserdata[id]["mileage"][0] + label[0]
  }
  if (type == "MI") {
    return gtfuser.gtfuserdata[id]["mileage"][1] + label[1]
  }

};

module.exports.dailyworkout = function(bool, id) {
  if (bool === undefined) {
    return gtfuser.gtfuserdata[id]["dailyworkout"]
  } else {
    gtfuser.gtfuserdata[id]["dailyworkout"] = bool
  }
}

module.exports.garage = function(id) {
  return gtfuser.gtfuserdata[id]["garage"]
};
module.exports.sortgarage = function(type, id) {
  if (type == "PURCHASE") {
    gtfuser.gtfuserdata[id]["garage"].sort((x,y) => parseInt(y["ID"]) - parseInt(x["ID"]))
  }
  if (type == "FPP") {
    gtfuser.gtfuserdata[id]["garage"].sort((x,y) => parseInt(y["FPP"]) - parseInt(x["FPP"]))
  }

}

module.exports.gifts = function(id) {
  return gtfuser.gtfuserdata[id]["gifts"]
};

module.exports.addgift = function(name, item, type, author, isgift, id) {
  gtfuser.gtfuserdata[id]["gifts"].push({
    id: gtfuser.gtfuserdata[id]["numgiftearned"],
    name: name,
    item: item,
    type: type,
    author:author,
    isgift:isgift
})
  gtfuser.gtfuserdata[id]["numgiftearned"]++
}

module.exports.addcount = function(id) {
  gtfuser.gtfuserdata[id]["count"]++
};

module.exports.removecount = function(id) {
  gtfuser.gtfuserdata[id]["count"]--
};

module.exports.careerraces = function(id) {
  return gtfuser.gtfuserdata[id]["careerraces"]
};

module.exports.garagecount = function(id) {
  return gtfuser.gtfuserdata[id]["garage"].length
};


module.exports.setting = function(setting, id) {
  return gtfuser.gtfuserdata[id]["settings"][setting]
};

module.exports.settings = function(id) {
  return gtfuser.gtfuserdata[id]["settings"]
};

module.exports.setsetting = function(setting, value, id) {
  gtfuser.gtfuserdata[id]["settings"][setting] = value
};

module.exports.addcredits = function(number, id) {
    gtfuser.gtfuserdata[id]["credits"] += number;
  /*var username = client.guilds.cache.get("239493425131552778").members.cache.get(id).user.username
  if (number > 0){
  console.warn("Credits: " + username + " +" + number)
  }*/
};

module.exports.addmileage = function(km, mi, id) {
  km = Math.round( km * 100 ) / 100
  mi = Math.round( mi * 100 ) / 100
    gtfuser.gtfuserdata[id]["mileage"][0] += km;
    gtfuser.gtfuserdata[id]["mileage"][1] += mi;
};

module.exports.setmileage = function(km, mi, id) {
    gtfuser.gtfuserdata[id]["mileage"][0] = km;
    gtfuser.gtfuserdata[id]["mileage"][1] = mi;
};

///CURRENTCAR
module.exports.currentcar = function(id) {
  if (gtfuser.gtfuserdata[id]["garage"].length == 0) {
    return null;
  }
    return gtfuser.gtfuserdata[id]["garage"][gtfuser.gtfuserdata[id]["currentcar"]-1]
}

module.exports.currentcarmain = function(id) {
  var currentcar = stats.currentcar(id)
    if (currentcar == null) {
      return "No car."
    } else {
  return "`🚘ID:" + gtfuser.gtfuserdata[id]["currentcar"] + "` " + currentcar["name"] + " **" + currentcar["FPP"] + emote.fpp + "**";
}
}

module.exports.currentcarnum = function(id) {
    return gtfuser.gtfuserdata[id]["currentcar"]
}

//////
//Starts at 1

module.exports.setcurrentcar = function(number, id) {
    if (number <= 0 || isNaN(number) || number === undefined || number > gtfuser.gtfuserdata[id]["garage"].length) {
      return "Invalid";
    } else {
      gtfuser.gtfuserdata[id]["currentcar"] = number
    }
}

module.exports.addexp = function(number, id) {
  if (number < 0) {
  } else {
    gtfuser.gtfuserdata[id]["exp"] += number;
  }
};

module.exports.view = function(car,id) {
  var garage = stats.garage(id)
  var cardetails = "**Car:** " + car["name"] + " " + car["rating"] + " `🚘ID:" + gtftools.index(garage, car) + "`" + " `✨" + car["clean"] + "%`" + "\n" +
  "**Make:** " + car["make"] + "\n" +
  "**FPP: " + car["FPP"] + emote.fpp + "**" + "\n" +
  "**Selling Price: " + car["sell"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + emote.credits + "**" + "\n\n" +
  "**Paint:** " + parts.getpart("color", car["color"][0])[0] + "\n" +
  "**Engine:** " + parts.getpart("engine", car["engine"][0])[0] + "\n" +
  "**Transmission:** " +parts.getpart("transmission", car["transmission"][0])[0] + "\n" +
  "**Suspension:** " + parts.getpart("suspension", car["suspension"][0])[0] + "\n" +
  "**Tires:** " + parts.getpart("tires", car["tires"][0])[0] + "\n" +
  "**Weight Reduction:** " + parts.getpart("weightreduction", car["weightreduction"][0])[0] + "\n" +
  "**Turbo Kits:** " + parts.getpart("turbo", car["turbo"][0])[0] + "\n" +
  "**Nitrous:** " + parts.getpart("nitrous", car["nitrous"][0])[0] + "\n";
 
  return cardetails
}

module.exports.updatecurrentcarclean = function(number,id) {
  var car = stats.currentcar(id)
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


module.exports.addcar = function(car, arg, id) {
    var name = car[0]
    var make = car[3]
    var costofperf = car[1][1]
    var rating = car[5]
    
  if (stats.garagecount(id) == 0) {
      stats.setcurrentcar(1, id)
  }
  
  var condition = Math.round(Math.random() * 10 - 5)
  var sell = -Math.ceil((-costofperf * 0.3 + 1) / 100) * 100 + (condition * 30)
  var fpp = gtfperf.calc(sell)

  
  var tires = {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0}
  var engine = {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0}
  var trans = {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0}
  var susp = {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0}
  var weight = {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0}
  
  //RH Tires + Eng Stage 2 A + FC Transmission + weight reduction 1 + FC Susp

  gtfuser.gtfuserdata[id]["numcarpurchase"]++
  var id1 = gtfuser.gtfuserdata[id]["numcarpurchase"]
  var newcar = {
        "ID": id1,
        "make": make,
        "name": name,
        "originalsell": sell,
        "sell": sell,
        "rating": rating,
        "FPP": fpp,
        "color": {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0},
        "engine": engine,
        "transmission": trans,
        "suspension": susp,
        "tires": tires,
        "weightreduction": weight,
        "turbo": {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0},
        "nitrous": {current:"S",
               owned:["S"], 
               sell: 0,
               tuning:0},
        "oil": 100,
        "clean": 100, 
        "damage": 100,
        "rims": 0,
        "PL": 0,
        "condition": condition
}
 
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
  
  newcar["FPP"] = gtfperf.fpp(newcar)
  
  if (arg == "ITEM") {
    return newcar
  } else {
    gtfuser.gtfuserdata[id]["garage"].push(newcar)
    return
  }
  
}

module.exports.updatecareerrace = function(raceid, place, id) {
  var raceidcomplete = raceid.split("-").slice(0,-1).join("-") + "-";
  for (var i = 0; i < gtfuser.gtfuserdata[id]["careerraces"].length; i++) {
  if (gtfuser.gtfuserdata[id]["careerraces"][i][0] == raceidcomplete) {
      if (gtfuser.gtfuserdata[id]["careerraces"][i][1] == "✅") {
        return
      }
    }
  }
  for (var i = 0; i < gtfuser.gtfuserdata[id]["careerraces"].length; i++) {
    if (place.includes(">")) {
        place = place.split(" ")[1]
    }
    if (gtfuser.gtfuserdata[id]["careerraces"][i][0] == raceid) {
      var currentnumber = gtfuser.gtfuserdata[id]["careerraces"][i][1]
      currentnumber = parseInt(currentnumber.split(/[A-Z]/gi)[0])
      var placenumber = parseInt(place.split(/[A-Z]/gi)[0])
      if (placenumber <= currentnumber) {
        gtfuser.gtfuserdata[id]["careerraces"][i][1] = place
      }
      return
    }
  }
  if (place.includes(">")) {
    place = place.split(" ")[1]
  }
  gtfuser.gtfuserdata[id]["careerraces"].push([raceid, place])
};

module.exports.checkcareerrace = function(raceid, id) {
  var raceidcomplete = raceid.split("-").slice(0,-1).join("-") + "-";
  for (var i = 0; i < gtfuser.gtfuserdata[id]["careerraces"].length; i++) {
    if (gtfuser.gtfuserdata[id]["careerraces"][i][0] == raceid) {
        return "`" + gtfuser.gtfuserdata[id]["careerraces"][i][1] + "`"
    }
    if (gtfuser.gtfuserdata[id]["careerraces"][i][0] == raceidcomplete) {
      if (gtfuser.gtfuserdata[id]["careerraces"][i][1] == "✅") {
        return "`" + "1st" + "`"
      }
    }
  }
    return ""
}

module.exports.isracescomplete = function(eventid, total, pnumber, id) {
  var count = 0;
  var i = 0
  console.log(eventid)
  var regex = new RegExp("^" + eventid)
  var events = gtfuser.gtfuserdata[id]["careerraces"].filter(x => x[0].match(regex) != null)
  
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


module.exports.gift = function(title, gift, type, embed, msg, id) {
  if (type = "CREDITS") {
    stats.addcredits(parseInt(gift["item"]), id)
    gtfuser.gtfuserdata[id]["gifts"] = gtfuser.gtfuserdata[id]["gifts"].filter(x => x["id"] !== gift["id"])
    
    require(gtffile.EMBED).success('✅ Gift Processed', "**+" + gift["item"] + emote.credits + "**" , 5000, true, embed, msg, id);
  } else if (type = "RANDOMCAR") {
  var makes = gift.filter(x => !x.includes("M "))
  var models = gift.filter(x => x.includes("M "))

  var prizes = require(gtffile.CARS).randomcars(makes, models, 4)
  require(gtffile.MARKETPLACE).fourcargifts(title, "**" + title + "**", prizes, embed, msg, id)
  }
}

module.exports.eventcomplete = function(eventid, id) {
  var regex = new RegExp("\\b" + eventid + "-", "gi")
  gtfuser.gtfuserdata[id]["careerraces"] = gtfuser.gtfuserdata[id]["careerraces"].filter(x => (x[0].match(regex) == null))
  gtfuser.gtfuserdata[id]["careerraces"].push([eventid + "-", "✅"])
}

module.exports.eventstatus = function(eventid, id) {
  eventid = eventid + "-"
  var list = gtfuser.gtfuserdata[id]["careerraces"].filter(x => (x[0] == eventid))
  if (list.length == 0) {
    return "⬛"
  } else {
  return list[0][1]
  }
}

module.exports.removecar = function(car, num, sell, id) {
  stats.addcredits(sell, id)
  
  var prevcarid = stats.currentcar(id)["ID"]
  var removedcarid = car['ID']
  var pi;
  var ri;
  
  for (var i = 0; i < gtfuser.gtfuserdata[id]["garage"].length; i++) {
    if (stats.garage(id)[i]["ID"] == removedcarid) {
      ri = i
    }
  }
  
  var garage = gtfuser.gtfuserdata[id]["garage"].filter(x => (x["ID"] != num))
  gtfuser.gtfuserdata[id]["garage"] = garage
  
  for (var i = 0; i < gtfuser.gtfuserdata[id]["garage"].length; i++) {
    if (stats.garage(id)[i]["ID"] == prevcarid) {
      pi = i
    }
  }
  
  if (ri <= pi) {
    gtfuser.gtfuserdata[id]["currentcar"]--
  }

}

module.exports.removecars = function(start, end, id) {
  var count = (end - start) + 1
  var total = 0
  var car = ""

  var i = 0
  while (i < count) {
    car = stats.garage(id)[start - 1]
    total += car["sell"]
    
    stats.removecar(car, car["ID"], car["sell"], id)
    
    i++
  }
  return total
}

module.exports.updatecurrentcar = function(car, id) {
  gtfuser.gtfuserdata[id]["garage"][gtfuser.gtfuserdata[id]["currentcar"]] = car
}

module.exports.raceinprogressstat = function(id) {
   return gtfuser.gtfuserdata[id]["raceinprogress"]
}

module.exports.raceinprogress = function(bool, mid, time, id) {
  if (bool === 'undefined') {
  } else {
    gtfuser.gtfuserdata[id]["raceinprogress"][0] = bool
  }
  if (mid === 'undefined') {
  } else {
    gtfuser.gtfuserdata[id]["raceinprogress"][1] = mid
  }
  if (time === 'undefined') {
  } else {
    gtfuser.gtfuserdata[id]["raceinprogress"][2] = time
  }
  return [bool, mid, time]
}

module.exports.inlobbystat = function(id) {
  return gtfuser.gtfuserdata[id]["inlobby"]
}

module.exports.inlobby = function(bool, mid, id) {
  if (bool === 'undefined') {
  } else {
    gtfuser.gtfuserdata[id]["inlobby"][0] = bool
  }
  if (mid === undefined) {
  } else {
    gtfuser.gtfuserdata[id]["inlobby"][1] = mid
  }
  return [bool, mid]
}
module.exports.levelup = function(number, id) {
  if (number == 0) {
    return
  } else {
    gtfuser.gtfuserdata[id]["level"] += number
  }
}


module.exports.main = function(id) {
  gtfuser.gtfuserdata[id]["count"]++
  gtfuser.gtfuserdata[id]["mileage"] = [Math.round(100 * gtfuser.gtfuserdata[id]["mileage"][0]) / 100, Math.round(100 * gtfuser.gtfuserdata[id]["mileage"][1]) / 100]
  
  var levelup = exp.islevelup(id)
  var gifts = ""
  if (levelup[0]) {
    levelup = "`LEVEL UP`"
  } else {
    levelup = ""
  }
   
  if (stats.gifts(id).length > 0) {
    gifts = stats.gifts(id).length + "🎁 "
  }

  if (stats.setting("MILEAGE", id) == 0) {
    var dwdistance = "/42.1km"
  } else {
    var dwdistance = "/26.2mi"
  }
  var currdate = gtftools.getFormattedDate(new Date(), id);

  if (gtfuser.gtfuserdata[id]["lastonline"] != currdate) {
    gtfuser.gtfuserdata[id]["dailyworkout"] = false;
    stats.setmileage(0, 0, id);
  }
  gtfuser.gtfuserdata[id]["lastonline"] = currdate;
  
    return gifts + gtfuser.gtfuserdata[id]["credits"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + emote.credits +
    "  " +
    stats.mileage("USER", false, id).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + dwdistance + emote.mileage +
    "  " +
    gtfuser.gtfuserdata[id]["exp"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    emote.exp + " " + "Lv." + gtfuser.gtfuserdata[id]['level']
};


/////RACES//////

module.exports.addracedetails = function(racesettings, racedetails, finalgrid, args, id) {
  gtfuser.gtfuserdata[id]["racedetails"] = [racesettings, racedetails, finalgrid, args]
};


module.exports.removeracedetails = function(id) {
  gtfuser.gtfuserdata[id]["racedetails"] = []
};

module.exports.resumerace = function(id, client) {
  if (gtfuser.gtfuserdata[id]["racedetails"].length == 0) {
    return 
  }
  if (!gtfuser.gtfuserdata[id]["raceinprogress"][0] || gtfuser.gtfuserdata[id]["raceinprogress"][1][0] === undefined || gtfuser.gtfuserdata[id]["raceinprogress"][1][1] === undefined) {
      return
  }
  var server = client.guilds.cache.get("239493425131552778")
  var server2 = server.channels.cache.get(gtfuser.gtfuserdata[id]["raceinprogress"][1][0])

      var racesettings = gtfuser.gtfuserdata[id]["racedetails"][0]
      var racedetails = gtfuser.gtfuserdata[id]["racedetails"][1]
      var finalgrid = gtfuser.gtfuserdata[id]["racedetails"][2]
      var args = gtfuser.gtfuserdata[id]["racedetails"][3]
      
      var user = server2.guild.members.cache.get(id).toString()
      var userm = server2.guild.members.cache.get(id).toString()
      var startingrace = true;
      var racefinished = false;

      console.log("Race is resuming for " + user)
  server2.messages.fetch({around: gtfuser.gtfuserdata[id]["raceinprogress"][1][1], limit: 1}).then(messages => {
      var msg = messages.first()
      if (msg.content.includes("FINISH")) {
        console.log("Already Finished")
        gtfuser.gtfuserdata[id]["raceinprogress"] = [
          false,
          ["", ""],
          undefined,
          id
        ];
        return
      }
      var embed = new Discord.MessageEmbed(msg.embeds[0])
      embed.setColor(0xFFFF00)
      var race = require("/app/functions/races/f_races_2").readysetgo(user,
          racedetails, racesettings, finalgrid, startingrace, racefinished,
                      embed, msg, args, [true], id)

    });
    return true
}