var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = process.env
////////////////////////////////////////////////////
var gtflobby = require("../index");

module.exports = {
  name: "lobby",
  cooldown: 3,
  level:0,
    channels: [],

  delete: false,
  availinmaint:false,
  availitoeveryone:true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  description: ["!gtf - Sends a random fact about GT Fitness and the discord server."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);
    var user = " "

    var user = msg.author.username
    embed.setAuthor(user,msg.author.displayAvatarURL());
    var args = "\n" + "`Args: !lobby [create|list|settings|exit]`" + "\n"
    var page = 0
    var results = ''
    var info = ''

    /* Setup */
      var reactionson = true
    var lobbies
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

      MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("LOBBIES").find({}).forEach(row => {
            lobbies = row
      }).then(() => 
      {lobby()}
      )
})
function lobby() {

  var server = msg.guild;
  var mode = "ONLINE"
     
   embed.setTitle("__GTF Lobbies (BETA)__");
    var currentlobby = null
      var list = Object.keys(lobbies["lobbies"])
      for (var i = 0; i < list.length; i++ ) {
        if (lobbies["lobbies"][list[i]]["numberid"] == number) {
          success = true
          currentlobby = lobbies["lobbies"][list[i]]
          break;
        }
      }
      if (!msg.member.roles.cache.find(r => r.name.includes('lobby-'))) {
        userdata["inlobby"] = stats.inlobby(false, "", userdata)
      }

    if (query.length == 0) {
      query[0] = "info"
    }

    if (query[0] == "create") {
      if (server.channels.cache.find(channel => channel.name === "lobby-" + userdata["id"]) !== undefined) {
         require(gtf.EMBED).error("❌ Error", "You cannot host more than 1 lobby.", embed, msg, userdata);
        return
      }

      server.roles.create({
        data: {
          name: 'lobby-' + userdata["id"],
        color: 'BLUE',
        permissions: [],
      }
      })
      .then(role => function() {

      }).then(function() {

        var everyonerole = server.roles.cache.find(r => r.name === '@everyone');
        var hostrole = server.roles.cache.find(r => r.name === 'lobby-' + userdata["id"]);

        var numberid = Object.keys(lobbies["lobbies"]).length + 1
        
        lobbies["lobbies"][userdata["id"]] = {
           "id": "lobby-" + userdata["id"],
            "channelname": "lobby-" + userdata["id"],
            "numberid": numberid,
            "mode": "RACE",
            "host": msg.author.id,
            "maxplayers": 8,
            "players": [{"id": userdata["id"], "car": userdata["garage"][stats.currentcarnum(userdata) - 1], "ready": false}],
            "isready": false,
            "racesettings": require(gtf.RACE).setrace("ONLINE")
          }
        var currentlobby = lobbies["lobbies"][userdata["id"]]
          server.channels.create(currentlobby["channelname"], {
          type: 'text',
            permissionOverwrites: [
            {
                id: everyonerole,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: hostrole,
                allow: ['VIEW_CHANNEL'],
              },
            ],
          }).then(channel => channel.setParent("820217666483912714"))
          userdata["inlobby"] = stats.inlobby(true, currentlobby["host"], userdata)
          require(gtf.LOBBY).save(lobbies,userdata)
          stats.save(userdata)

          gtftools.interval(function() {
            
            require(gtf.EMBED).success('✅ Success', "Created new lobby: " + server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).toString() + ".", 0, true, embed, msg, userdata);

          }, 3000, 1)
          gtftools.interval(function() {
          var embed = new Discord.MessageEmbed()
          embed.setColor(0x808080)
          var user = msg.author.username
          let role = msg.guild.roles.cache.find(r => r.name === currentlobby["id"]);
          msg.member.roles.add(role).catch(console.error);

          results = "ℹ️ " + user + " has joined the room."+ "\n\n"
          embed.setDescription(results)
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed)
          return
          }, 5000, 1)

        })
    }
    else if (query[0] == "join") {
      if (userdata["inlobby"][0]) {
        require(gtf.EMBED).error("❌ Error", "You are already in a lobby" + "." + " Exit from your current lobby before joining a new one.", embed, msg, userdata);
        return
      }
      
      var number = query[1]
      //server.channels.find(channel => channel.name === stats.inlobby()[1])
      var success = false;
      var currentlobby = null
      var list = Object.keys(lobbies["lobbies"])
      for (var i = 0; i < list.length; i++ ) {
        if (lobbies["lobbies"][list[i]]["numberid"] == parseInt(number)) {
          success = true
          currentlobby = lobbies["lobbies"][list[i]]
          break;
        }
      }
      


      if (!success) {
        require(gtf.EMBED).error("❌ Error", "This ID does not exist in GTF lobbies.", embed, msg, userdata);
        return
      }
      if (stats.currentcar(userdata) == "No car.") {
         require(gtf.EMBED).error("❌ Error", "You do not have a current car.", embed, msg, userdata);
        return
      }
      if (currentlobby["players"].length + 1 > currentlobby["maxplayers"]) {
          require(gtf.EMBED).error("❌ Error", "This lobby is full.", embed, msg, userdata);
          return
      }
        userdata["inlobby"] = stats.inlobby(true, currentlobby["host"], userdata)
        stats.save(userdata)

      gtftools.interval(function() {
    

      currentlobby["players"].push({"id": userdata["id"], "car": userdata["garage"][stats.currentcarnum(userdata) - 1]})
      currentlobby["maxplayers"]++
      results = "☑️ You have joined a lobby: " + currentlobby["channelname"] + "."
       require(gtf.LOBBY).save(lobbies,userdata)

      embed.setColor(0x216C2A)
      embed.setDescription(results);
          embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
          msg.channel.send(embed);
          }, 2000, 1)
     
      gtftools.interval(function() {
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
         var user = msg.author.username
          let role = msg.guild.roles.cache.find(r => r.name === currentlobby["id"]);
          msg.member.roles.add(role).catch(console.error);

          results = "ℹ️ " + user + " has joined the room."
          embed.setDescription(results)
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed)
          return
        }, 3000, 1)

    }
    else if (query[0] == "list") {
      if (Object.keys(lobbies["lobbies"]).length == 0) {
      embed.setColor(0xFFFF00)
      var results = "⚠ There are no GTF lobbies online."
      } else {
      var list = []

      for (var key in lobbies["lobbies"]) {
       list.unshift(["`ID:" + lobbies["lobbies"][key]['numberid'] + "🌐` " + msg.guild.members.cache.get(lobbies["lobbies"][key]['host']).user.username + "\'s Lobby `" + lobbies["lobbies"][key]["players"].length + "/" + lobbies["lobbies"][key]['maxplayers'] + "`", ""])
      }
      }

      results = gtftools.list(list, page, "", "", false, "", 10, userdata);

      
      embed.setTitle("__GTF Lobbies - List__");
      embed.setDescription(results);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      gtftools.createpages(results, list, page, "", "", false, "", 10, [query,"lobby", reactionson, info], embed, msg, userdata);
      return
    }
    else if (query[0] == "exit" || query[0] == "delete" || query[0] == "quit") {
      var member = msg.member
      if (!stats.inlobbystat(userdata)[0]) {
        require(gtf.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, userdata);
        return
      }
      var currentlobby = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]
      console.log(currentlobby["channelname"])
      if (msg.channel.name !== currentlobby["channelname"]) {
        require(gtf.EMBED).error("❌ Error", "This lobby command can only be used in your current lobby.", embed, msg, userdata);
        return
      }

      var user = msg.author

      var isHost = currentlobby["host"] == userdata["id"]

      embed.setColor(0xFFFF00)
      var results = "⚠ Leave from the lobby?" + "\n\n" + "❓ **This is a fixed host room, so if the host leaves then all players will be booted from this lobby.**"

      embed.setDescription(results)

      msg.channel.send(embed).then(msg => {
        
        function exit() {
        lobbies["lobbies"][currentlobby["host"]]["players"] = lobbies["lobbies"][currentlobby["host"]]["players"].filter(x => (x["id"] != userdata["id"]))
        currentlobby["maxplayers"]++
        if (isHost) {
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).delete()
          server.roles.cache.find(s => s.name === currentlobby["id"]).delete()
          userdata["inlobby"] = stats.inlobby(false, "", userdata)
          delete lobbies["lobbies"][userdata["id"]]
        } else {
        msg.delete({timeout:1000})
        let role = server.roles.cache.find(s => s.name === currentlobby["id"]);
        member.roles.remove(role).catch(console.error);
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
        results = "ℹ️ " + user.user.username + " has left the room."
        embed.setDescription(results)
        server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed)
        userdata["inlobby"] = stats.inlobby(false, "", userdata)
        }
              require(gtf.LOBBY).save(lobbies,userdata)
      stats.save(userdata)
        }
        var emotelist = [[emote.yes, "Yes", exit, "Once"]]
         gtftools.createreactions(emotelist, msg, userdata)

      })

    }
    else if (query[0] == "settings" || query[0] == "set") {
      if (stats.inlobbystat(userdata)[1] != userdata["id"])  {
         require(gtf.EMBED).error("❌ Not The Host", "Only the host can change lobby settings.", embed, msg, userdata);
        return
      }

      var changes = []
        var setting = query[1]
        if (setting === undefined) {
           require(gtf.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, userdata);
        return
        }
        if (setting.includes("lap") || setting.includes("laps")) {
          require(gtf.LOBBY).lapsettings(changes, lobbies, [page, query, reactionson, info, embed, msg, userdata])
        }
        if (setting.includes("roomname")) {
          require(gtf.LOBBY).namesettings(changes, lobbies, [page, query, reactionson, info, embed, msg, userdata])
        }
        if (setting.includes("track")) {
          require(gtf.LOBBY).tracksettings(changes, lobbies, [page, query, reactionson, info, embed, msg, userdata])
        }
        console.log(changes)
      if (changes[0] == 'ERROR' || changes[0] == "LIST") {
            return
        }
      if (changes.length == 0) {
        require(gtf.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, userdata);
        return
      } else {
          var embed2 = new Discord.MessageEmbed()
        results = "ℹ️ " + msg.author.username + " has changed lobby settings." + "\n\n" + changes.join("\n")
        embed2.setDescription(results)
        setTimeout(function() {
        require(gtf.LOBBY).save(lobbies,userdata)
          msg.channel.send(embed2)
        }, 1000)
        return

        return
      }

    } else if (query[0] == "info") {
      if (!stats.inlobbystat(userdata)[0]) {
        require(gtf.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, userdata);
        return
      }

      var currentlobby = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]
      if (msg.channel.name !== currentlobby["channelname"]) {
        require(gtf.EMBED).error("❌ Error", "This lobby command can only be used in your current lobby.", embed, msg, userdata);
        return
      }
      embed.setTitle(currentlobby["channelname"])
      var racesettings = currentlobby["racesettings"]
      var playerlist = currentlobby["players"].map(x => msg.guild.members.cache.get(x["id"]).user.username).join("\n") 
      results = ""

      var racedetails = "__Lobby Settings__" + " " + "`" + currentlobby["players"].length + "/" + currentlobby["maxplayers"] + " Players`" + "\n" +
      playerlist + "\n\n" +
      "__Track Settings__" + "\n" +
      "**Track:** " + racesettings["track"] + "\n" +
      "**Time/Weather:** " + racesettings["time"] + " | " + racesettings["weather"] + "\n\n" +
      "**Lap(s):** " + racesettings["laps"] + "\n" +
      "**Total Distance:** " + racesettings["km"] + " km" + " | " + racesettings["mi"] + " mi" + "\n";

      embed.setDescription(results + "\n\n" + racedetails)
      msg.channel.send(embed).then(msg => {
            function func() {
              var results2 = "__Starting Grid__" + "\n"
              var players = currentlobby["players"]
              results2 = players.map(function(x) {
      return [x["car"]["name"], "`" + msg.guild.members.cache.get(x['id']).user.username + "`"].join(" ")
    })
              embed.setDescription(results2)
              msg.edit(embed)
            }
            function goback() {
              embed.setDescription(results + "\n\n" + racedetails)
              msg.edit(embed)
            }


          var emojilist = [[emote.tracklogo, 'trackgtfitness', goback], [emote.cargrid,'gtfcargrid', func]]
          gtftools.createreactions(emojilist, msg, userdata)
      })

    }
    else if (query[0] == "race" || query[0] == "start") {
        if (userdata["inlobby"][1] != userdata["id"])  {
         require(gtf.EMBED).error("❌ Not The Host", "Only the host can start a race.", embed, msg, userdata);
        return
      }
       var currentlobby = lobbies["lobbies"][userdata["id"]]
       
      if (currentlobby["isready"])  {
         require(gtf.EMBED).error("❌ Race Starting", "The race is already starting.", embed, msg, userdata);
        return
      }
      
      currentlobby["isready"] = true
       require(gtf.LOBBY).save(lobbies,userdata)
      results = "**The race is starting!**\n\n**❗You have 30 seconds to join the race by reacting to the 🏁 emote.**\n\n⚠ Changing cars while this message is active will not work."
      embed.setDescription(results)

      server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed).then(msg => {
        function start() {

        }
        var emotelist = [["🏁", "🏁", start, "Once"]]
          
        gtftools.createreactions(emotelist, msg, userdata)
        setTimeout(function() {
                   var reactions = msg.reactions.cache.find(emoji => emoji.emoji.name == '🏁')
var keys = reactions.users.cache.keys()
var size = reactions.users.cache.size
var index = 0
          while (index < size) {
            var id = keys.next().value
          lobbies["lobbies"][currentlobby["host"]]["players"].map(function(x) {
          if (x["id"].toString() == id.toString()) {
            x["ready"] = true
          }
          return x
        })
            index++
          }
        setTimeout(function() {
          msg.delete({})

          lobbies["lobbies"][currentlobby["host"]]["racesettings"]["players"] = lobbies["lobbies"][currentlobby["host"]]["players"].filter(x => x["ready"])
                if (lobbies["lobbies"][currentlobby["host"]]["racesettings"]["players"].length == 0)  {
         require(gtf.EMBED).error("❌ Race Aborted", "No players were on the track.", embed, msg, userdata);
      currentlobby["isready"] = false
       require(gtf.LOBBY).save(lobbies,userdata)
        return
      }

            require(gtf.RACE).preparerace("ONLINE", "", "ONLINE", lobbies["lobbies"][currentlobby["host"]]["racesettings"], args, embed, msg, userdata);
            currentlobby["isready"] = false
             require(gtf.LOBBY).save(lobbies,userdata)
        }, 2000)

        }, 30 * 1000)

      })

    } else {
       require(gtf.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, userdata);
    }
}
  }
};