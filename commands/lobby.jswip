var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtffile = process.env
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

    var user =msg.author.username
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
   embed.setTitle("__GTF Lobbies (BETA)__");

    var server = msg.guild;
    if (query.length == 0) {
      query[0] = "info"
    }

    if (query[0] == "create") {
      if (server.channels.cache.find(channel => channel.name === "lobby-" + userdata["id"]) !== undefined) {
         require(gtffile.EMBED).error("❌ Error", "You cannot host more than 1 lobby.", embed, msg, userdata);
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
            "maxplayers": 4,
            "players": [userdata["id"]],
            "racesettings": require(gtffile.RACE).setrace("Online")
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
          })
          stats.inlobby(true, currentlobby["host"], userdata)
          require(gtffile.LOBBY).save(lobbies,userdata)
          stats.save(userdata)

          gtftools.interval(function() {
            
            require(gtffile.EMBED).success('✅ Success', "Created new lobby: " + server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).toString() + ".", 0, true, embed, msg, userdata);

          }, 3000, 1)
          gtftools.interval(function() {
          var embed = new Discord.MessageEmbed()
          embed.setColor(0x808080)
          var user = msg.author.username
          let role = msg.guild.roles.cache.find(r => r.name === currentlobby["channelname"]);
          msg.member.roles.add(role).catch(console.error);

          results = "ℹ️ " + user + " has joined the room."+ "\n\n" + 
          "⚠ In order to the host to make lobby changes, make you allow DM access to this bot in the server settings. You may skip this if this does not apply to you."
          embed.setDescription(results)
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed)
          return
          }, 5000, 1)

        })
    }
    else if (query[0] == "join") {
      if (stats.inlobbystat(userdata)[0]) {
        require(gtffile.EMBED).error("❌ Error", "You are already in a lobby" + "." + " Exit from your current lobby before joining a new one.", embed, msg, userdata);
        return
      }
      
      var number = query[1]
      if (!gtftools.betweenInt(number, 1, Object.keys(lobbies["lobbies"]).length)) {
        require(gtffile.EMBED).error("❌ Error", "This ID does not exist in GTF lobbies.", embed, msg, userdata);
        return
      }
      //server.channels.find(channel => channel.name === stats.inlobby()[1])
      var success = false;
      var currentlobby = null
      var list = Object.keys(lobbies["lobbies"])
      console.log(list)
      for (var i = 0; i < list.length; i++ ) {
        if (lobbies["lobbies"][list[i]]["numberid"] == number) {
          success = true
          currentlobby = lobbies["lobbies"][list[i]]
          break;
        }
      }
      
      if (stats.currentcar(userdata) == "No car.") {
         require(gtffile.EMBED).error("❌ Error", "You do not have a current car.", embed, msg, userdata);
        return
      }

      if (!success) {
        require(gtffile.EMBED).error("❌ Error", "This ID does not exist in GTF lobbies.", embed, msg, userdata);
        return
      }
      if (stats.currentcar(userdata) == "No car.") {
         require(gtffile.EMBED).error("❌ Error", "You do not have a current car.", embed, msg, userdata);
        return
      }

      gtftools.interval(function() {
        if (currentlobby["players"].length + 1 > 4) {
          require(gtffile.EMBED).error("❌ Error", "This lobby is full.", embed, msg, userdata);
          return
        }
      stats.inlobby(true, currentlobby["host"], userdata)
      currentlobby["players"].push(userdata["id"])
      results = "☑️ You have joined a lobby: " + currentlobby["channelname"] + "."
       require(gtffile.LOBBY).save(lobbies,userdata)
      stats.save(userdata)

      embed.setColor(0x216C2A)
      embed.setDescription(results);
          embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed);
          }, 3000, 1)
          
     
      gtftools.interval(function() {
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
         var user = msg.author.username
          let role = msg.guild.roles.cache.find(r => r.name === currentlobby["channelname"]);
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
      results = []

      for (var key in lobbies["lobbies"]) {
       results.unshift("`ID:" + lobbies["lobbies"][key]['numberid'] + "🌐` " + msg.guild.members.cache.get(lobbies["lobbies"][key]['host']).user.username + "\'s Lobby `" + lobbies["lobbies"][key]["players"].length + "/" + lobbies["lobbies"][key]['maxplayers'] + "`")
      }
      }
      embed.setTitle("__GTF Lobbies - List__");
      embed.setDescription(results);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed);
    }
    else if (query[0] == "exit" || query[0] == "delete" || query[0] == "quit") {
      var member = msg.member
      if (!stats.inlobbystat(userdata)[0]) {
        require(gtffile.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, userdata);
        return
      }
      var currentlobby = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]
      if (msg.channel.name !== "lobby-" + stats.inlobbystat(userdata)[1]) {
        require(gtffile.EMBED).error("❌ Error", "This lobby command can only be used in lobbies.", embed, msg, userdata);
        return
      }

      var user = msg.author

      var isHost = currentlobby["host"] == userdata["id"]

      embed.setColor(0xFFFF00)
      var results = "⚠ Leave from the lobby?" + "\n\n" + "❓ **This is a fixed host room, so if the host leaves then all players will be booted from this lobby.**"

      embed.setDescription(results)

      msg.channel.send(embed).then(msg => {
        
        function exit() {
        lobbies["lobbies"][currentlobby["host"]]["players"] = lobbies["lobbies"][currentlobby["host"]]["players"].filter(x => (x != userdata["id"]))
        if (isHost) {
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).delete()
          server.roles.cache.find(s => s.name === currentlobby["channelname"]).delete()
          stats.inlobby(false, "", userdata)
          delete lobbies["lobbies"][userdata["id"]]
        } else {
        msg.delete({timeout:1000})
        let role = server.roles.cache.find(s => s.name === currentlobby["channelname"]);
        member.roles.remove(role).catch(console.error);
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
        results = "ℹ️ " + user.user.username + " has left the room."
        embed.setDescription(results)
        server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).send(embed)
        stats.inlobby(false, "", userdata)
        }
              require(gtffile.LOBBY).save(lobbies,userdata)
      stats.save(userdata)
        }
        var emotelist = [[emote.yes, "Yes", exit, "Once"]]
         gtftools.createreactions(emotelist, msg, userdata)

      })

    }
    else if (query[0] == "settings" || query[0] == "set") {
      if (stats.inlobbystat(userdata)[1] != userdata["id"])  {return "NO"}

      var changes = []
        var setting = query[1]
        if (setting.includes("track")) {
          var tracks = require(gtffile.TRACKS).list("names")
          var number = parseInt(query[2])
          if (!gtftools.betweenInt(number, 1, tracks.length)) {
            var list = tracks.map(x => [x, " "])
             results2 = gtftools.list(list, page, "", "", true, "", 10, [query, "lobby"], embed, msg, userdata)
      
             embed.setDescription(results2)
            gtftools.createpages(results2, list, page, "", "", true, "", 10, [query, "lobby", reactionson, info], embed, msg, userdata, "DM")
          return
          } else {
            var trackname = tracks[number-1]
            var track = require(gtffile.TRACKS).find({"name":[trackname]})[0]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["track"] = track["name"]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] = track["length"]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] = (Math.round((100 *((track["length"])/ 1.609)))) / 100
            changes.push("**Track:** " + track["name"])
          }
        }
      if (changes.length == 0) {
        require(gtffile.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, userdata);
        return
      } else {
        var embed2 = new Discord.MessageEmbed()
        embed2.setColor(0x808080)

        results = "ℹ️ " + msg.author.username + " has changed lobby settings." + "\n\n" + changes.join("\n")

        embed2.setDescription(results)
        require(gtffile.EMBED).success('✅ Success', "", 0, true, embed, msg, userdata, "DM")
        require(gtffile.LOBBY).save(lobbies,userdata)
        setTimeout(function() {
          server.channels.cache.find(channel => channel.name === lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["channelname"]).send(embed2)
        }, 3000)
        return
      }

    } else if (query[0] == "info") {
      if (!stats.inlobbystat(userdata)[0]) {
        require(gtffile.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, userdata);
        return
      }

      if (msg.channel.name !== "lobby-" + stats.inlobbystat(userdata)[1]) {
        require(gtffile.EMBED).error("❌ Error", "This lobby command can only be used in your current lobby.", embed, msg, userdata);
        return
      }
      var currentlobby = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]
      embed.setTitle(msg.guild.members.cache.get(currentlobby['host']).user.username + "\'s Lobby")
      var racesettings = currentlobby["racesettings"]
      var playerlist = currentlobby["players"].map(x => msg.guild.members.cache.get(x).user.username).join("\n") 
      results = ""

      var racedetails = "__Lobby Settings__" + " " + "`" + currentlobby["players"].length + "/" + currentlobby["maxplayers"] + " Players`" + "\n" +
      playerlist + "\n\n" +
      "__Track Settings__" + "\n" +
      "**Track:** " + racesettings["track"] + "\n" +
      "**Time/Weather:** " + racesettings["time"] + " | " + racesettings["weather"] + "\n\n" +
      "**Lap(s):** " + racesettings["laps"] + "\n" +
      "**Total Distance:** " + racesettings["km"] + " km" + " | " + racesettings["mi"] + " mi" + "\n";

      embed.setDescription(results + "\n\n" + racedetails)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
            function func() {
              var results2 = "__Starting Grid__" + "\n"
              var players = currentlobby["players"]
              for (var i = 0; i < players.length; i++) {
                var car = stats.currentcar(players[i])
                results2 = (i + 1) + ". " + car["name"] + " " + msg.guild.members.cache.get(players[i]).toString() + "\n"
              }
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
    else if (query[0] == "r") {

    } else {
       require(gtffile.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, userdata);
    }
}
  }
};
