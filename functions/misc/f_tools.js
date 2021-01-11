var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtffile = process.env
////////////////////////////////////////////////////


module.exports.randomInt = function(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min))
}

module.exports.betweenInt = function(number, min, max) {
  if (isNaN(number)) {
    return false
  }
  return (parseInt(number) >= min && parseInt(number) <= max)
}

module.exports.removeDups = function(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

module.exports.interval = function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try {
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    } (wait, times);

    setTimeout(interv, wait);
};


module.exports.lapcalc = function(km, limit) {
  var laps = 1;
  var totalkm = km;

  while (totalkm < limit) {
    totalkm = totalkm + km;
    laps++;
  }
  if (laps > 1) {
    var chancel = Math.round(Math.random());
    if (chancel == 1) {
      laps--
      totalkm = totalkm - km;
    }
  }
  totalkm = (Math.round(1000 * totalkm) / 1000)
  var totalmi = (Math.round((100 *((totalkm)/ 1.609)))) / 100;
  return [laps, totalkm, totalmi]
}

module.exports.catcalc = function(category, weather, fpp) {
  category = category[0]

  if (weather.includes("%")){
    weather = parseInt(weather.split(" ").pop())
    weather = weather/100
  }
  var weather = 0;
  var multiplier = 0
  //70 - 195

  if (category == "CUSTOM") {
    console.log(fpp)
    var percentage = fpp / 1200
    percentage = ((195-70) * percentage) + 70
    return percentage + (weather * 15)
  }
 
    
  
   var cat = [["N100", 80], ["N200", 100], ["N300", 115], ["N400", 125], ["N500", 135], 
            ["N600", 145], ["N700", 155], ["N800" , 165], ["N900", 170], ["N1000", 175]]

  for (var i = 0; i < cat.length; i++) {
    if (cat[i][0] == category) {
      return (cat[i][1]) + (weather * 15)
    }
  }
  
  if (category == "Gr.4" || category == "Gr.B") {
    multiplier = 145 //original 120
  }
  if (category == "Gr.3") {
    multiplier = 175
  }
  if (category == "Gr.2" || category == "Gr.X") {
    multiplier = 185
  }
  if (category == "Gr.1") {
    multiplier = 195
  }
  return (multiplier) + (weather * 15)
}


module.exports.list = function(dlist, page, statfront, statback, numbers, special, count, userdata) {
  var list = ""
  var listnumber = ""
  var extra = ""
  if (special.length != 0) {
        statfront = special + statfront
  }
  var pagetotal = Math.ceil(dlist.length / count);
  var x = 0;
  page = page * count
  
  while (x < count && dlist[x+page] !== undefined) {
        if (numbers) {
        listnumber = (x + 1 + page)
        }
        if (!special) {
          listnumber = listnumber + "." 
        } else {
          listnumber = listnumber + special
        }
        if (!numbers) {
          listnumber = ""
        }
        if (dlist[x+page].length > 2) {
          extra = dlist[x+page].slice(2).join(" ")
        }
    
        list = list + statfront + listnumber  + " " + dlist[x + page][0] + " **" + dlist[x + page][1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + statback +  " " + extra + "\n";
            x++;
  }
   if (list == "") {
     if (page < 0) {
       page++
       return;
     }
     if (page > pagetotal) {
       page--;
       return
     }
   }
  return list
}

module.exports.emojilist = function(list) {
  var nlist = "";
  for (var index = 0; index < list.length; index++){
    var emoji = list[index].split(" ")[0]
    nlist = nlist + "**" + emoji + " " + list[index].split(" ").slice(1).join(" ") + "**" + "\n"
  }
  return nlist
}

module.exports.createpages = function(results, list, page, statfront, statback, numbers, special, count, [query, name, reactionson, info], embed, msg, userdata, dm) {
  if (dm !== undefined) {
    msg_channel = msg.author
  } else {
    msg_channel = msg.channel
  }
    var select = 0
    var reset = true
    var index = 0
     stats.addcount(userdata)
    results = JSON.stringify(results).split("\\n").map(function(x) {
        if (reset) {
          x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(results + "\n" + info)
    var msg2 = msg
  
    msg_channel.send(embed).then(msg => {
      
    function selectoption() {
      if (name == "car" && numbers == false) {
        var pick = list[select + (page*count)][0].split(" ")[0]
      } else {
        var pick = select + 1 + (page*count)
      } 
      if (name == "garage_regulate") {
        var pick = parseInt(list[select + (page*count)][0].split(":")[1].split("`")[0])
        name = "garage"
        query = []
      }
      query.push(pick)
        
      require("../../commands/" + name).execute(msg2,query,userdata)
      return stats.save(userdata)
      }
    

    function back() {
      reset = true
    if (page != 0) {
      page--
    }
    select = 0
    results = gtftools.list(list, page, statfront, statback, numbers, special, count, userdata)
    results = JSON.stringify(results).split("\\n").map(function(x) {
        if (reset) {
          x =  stats.setting("PROGRESSBAR", userdata)[0]  + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
        }).join("\n").replace(/\"/gi, "")
    embed.setDescription(results + "\n" + info)
    msg.edit(embed)
    }
  
    function next() {
      reset = true
      if (page != Math.ceil(list.length / count) - 1) {
       page++
    }
    select = 0
      
    results = gtftools.list(list, page, statfront, statback, numbers, special, count, userdata)
    results = JSON.stringify(results).split("\\n").map(function(x) {
        if (reset) {
          x =  stats.setting("PROGRESSBAR", userdata)[0] + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
      
    embed.setDescription(results + "\n" + info)
    msg.edit(embed)
    }
      
    function up() {
    var index = 0

    results = gtftools.list(list, page, statfront, statback, numbers, special, count, userdata)
      
    select--
    if (select <= -1) {
      select = JSON.stringify(results).split("\\n").length-2
    }
    results = JSON.stringify(results).split("\\n").map(function(x) {
      if (select == index) {
          x =  stats.setting("PROGRESSBAR", userdata)[0] + " " + x
        }
      index++
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(results + "\n" + info)
    msg.edit(embed)
    }
      
    function down() {
    var index = 0

    results = gtftools.list(list, page, statfront, statback, numbers, special, count, userdata)
      
    select++
      
    if (select >= JSON.stringify(results).split("\\n").length-1) {
      select = 0
    }
      
    results = JSON.stringify(results).split("\\n").map(function(x) {
        if (select == index) {
          x =  stats.setting("PROGRESSBAR", userdata)[0]  + " " + x
        }
      index++
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(results + "\n" + info)
    msg.edit(embed)
    }
    
    var emojilist = [[emote.yes, "Yes", selectoption, "Once"], [emote.leftarrow, "leftarrow", back], [emote.rightarrow, "rightarrow", next], [emote.uparrow, "uparrow", up], [emote.downarrow, "downarrow", down]]
 
    if (reactionson) {
      gtftools.createreactions(emojilist, msg, userdata)
    }
    })
  }

module.exports.checkrole = function(role, name, msg, embed) {
  var roles = []
  var success = true;
  roles.unshift(role)
  if (!(roles === undefined)) {

  for (var i = 0; i < roles.length; i++) {
    if (msg.member.roles.find(r => r.name === roles[i])) {
      roles.shift()
    }
    if (roles.length == 0) {
        break;
    }
  }
  if (roles.length > 0) {
    success = false
    roles[0] = "❌ " + roles[0]
    roles = roles.join("\n❌ ")
    embed = new Discord.MessageEmbed();
    var user = msg.author.username;
    embed.setAuthor(user, msg.author.displayAvatarURL());
    embed.setColor(0xff0000)
    embed.setDescription(" **❌ You are unable to use `!" + name + "` because of insufficient roles.** \n\n" + roles)
    msg.channel.send(embed)
  }
  return success
}
}

module.exports.index = function(list, item) {
  item = JSON.stringify(item)
  var index = 0
  for (; index < list.length; index++) {
    if (item == JSON.stringify(list[index])) {
      return index + 1
    }
  }
  return -1
}
// OFFSET PST 16
module.exports.getFormattedDate = function(date,userdata) {
    var localTime = date.getTime();
    var localOffset = date.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset
    var offset = stats.setting("TIME OFFSET", userdata)
    var usertime = utc + (3600000*offset);
    usertime = new Date(usertime);
    var year = usertime.getFullYear();

  var month = (1 + usertime.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = usertime.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}

module.exports.removereactions = function(list, msg) {
  var i  = 0
 filter(i)
  function filter(i) {
    var emoji = msg.reactions.cache.find(r => r.emoji.name === list[i])
    if (emoji == null) {
      increase()
    } else {
      emoji.remove(gtffile.USERID);
      increase()
    }
  }

  function increase() {
    i++
    if (i == list.length) {
      return
    } else {
     setTimeout(function() {filter(i)}, 1000)
    }
  }

 /* gtftools.interval(function(){
    for (var index = 0; index < list.length; index++) {
    var emoji = msg.reactions.cache.find(r => r.emoji.name === list[index])
    if (emoji == null) {
      continue;
    } else {
      emoji.remove(gtffile.USERID);
    }
  }
  }, 1000 * list.length, 1)*/
}

module.exports.milltominandsecs = function(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports.numFormat = function(number) {
 return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

module.exports.createreactions = function(emojilist, msg, userdata) {
  var i = 0;
  var id = userdata["id"]
  var reactid = stats.count(userdata);
  var l = require('discord.js-rate-limiter').RateLimiter;
  var rateLimiteradd = new l(1, 1500);
  filter(i)
  
  
      function increase() {
    i++
    if (i == emojilist.length) {
      return
    } else {
     setTimeout(function() {filter(i)}, 1000)
    }
  }

  function filter(i) {
  
    var emote = emojilist[i][0];
    if (emote.includes("<:")) {
      emote = emote.split(":")[2]
      emote = emote.slice(0, emote.length-1)
    }
    var name = emojilist[i][1];
    var func = emojilist[i][2];
    if (reactid != stats.count(userdata)) {
            return
    }
    msg.react(emote).then(function(){
    var Filter1 = (reaction, user) => reaction.emoji.name === name && id === user.id;

    const filter11 = msg.createReactionCollector(Filter1, { timer: 60 * 1000 , dispose:true});

      filter11.on("collect", r => {
      next(r)

      });
      
      filter11.on("remove", r => {
      next(r)
    })
 function next(r) {
 var limited = rateLimiteradd.take(msg.author.id);
 if (limited) {
   console.log("Rate Limit")
   return
 }
 go(r)
}
      function go(r) {
    const notbot = r.users.cache
          .filter(clientuser => clientuser.id == id)
          .first();
        if (reactid != stats.count(userdata)) {
            return
        }
        if (typeof emojilist[i][3] !== 'undefined') {
          if (emojilist[i][3] == "Once") {
            if (reactid != stats.count(userdata)) {
              return
            }
            stats.addcount(userdata)
          }
          
        }
        if (typeof emojilist[i][3] !== 'undefined') {
          if (!isNaN(emojilist[i][3])) {
              return func(emojilist[i][3])
          } else {
              return func()
          }
        }
        return func()
  }

    })

  increase()
  }
}