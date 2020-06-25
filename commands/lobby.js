var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtflobby = require("/home/runner/gtfbot/index");

module.exports = {
  name: "lobby",
  cooldown: 3,
  delete: true,
  level:0,
  description: ["Test"],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !lobby [create|list|settings|exit]`" + "\n"

    /* Setup */
    var results = " ";
    var page = 0;

    embed.setTitle("__GTF Lobbies (BETA)__");
    var lobby = gtflobby.lobby

    var server = msg.guild;
    if (query.length == 0) {
      query[0] = "info"
    }

    if (query[0] == "create") {
      console.log(server.channels.cache.find(channel => channel.name === "lobby-" + msgauthorid))
      if (server.channels.cache.find(channel => channel.name === "lobby-" + msgauthorid) !== undefined) {
         require(gtffile.EMBED).error("❌ Error", "You cannot host more than 1 lobby.", embed, msg, msgauthorid);
        return
      }

      server.roles.create({
        data: {
          name: 'lobby-' + msgauthorid,
        color: 'BLUE',
        permissions: [],
      }
      })
      .then(role => function() {

      }).then(function() {

        var everyonerole = server.roles.cache.find(r => r.name === '@everyone');
        var hostrole = server.roles.cache.find(r => r.name === 'lobby-' + msgauthorid);

        var numberid = Object.keys(lobby).length + 1

        lobby[msgauthorid] = {
            id: "lobby-" + msgauthorid,
            channelname: "lobby-" + msgauthorid,
            numberid: numberid,
            mode: "RACE",
            host: msg.author.id,
            maxplayers: 4,
            players: [msg.author.id],
            racesettings: require(gtffile.RACE).setrace("Online")
          }
        var currentlobby = lobby[msgauthorid]
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
          stats.inlobby(true, currentlobby["host"], msgauthorid)

          gtftools.interval(function() {
            
            require(gtffile.EMBED).success('✅ Success', "Created new lobby: " + server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).toString() + ".", 0, true, embed, msg, msgauthorid);

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
          }, 5000, 1)

        })
    }
    else if (query[0] == "join") {
      if (stats.inlobbystat(msgauthorid)[0]) {
        require(gtffile.EMBED).error("❌ Error", "You are already in a lobby" + "." + " Exit from your current lobby before joining a new one.", embed, msg, msgauthorid);
        return
      }
      
      var number = query[1]
      if (number <= 0 || isNaN(number) || number === undefined || number > Object.keys(lobby).length) {
        require(gtffile.EMBED).error("❌ Error", "This ID does not exist in GTF lobbies.", embed, msg, msgauthorid);
        return
      }
      //server.channels.find(channel => channel.name === stats.inlobby()[1])
      var success = false;
      var currentlobby = null
      for (var key in lobby) {
        if (lobby[key]["numberid"] == number) {
          success = true
          currentlobby = lobby[key]
          break;
        }
      }
      
      if (stats.currentcar(msgauthorid) == "No car.") {
         require(gtffile.EMBED).error("❌ Error", "You do not have a current car.", embed, msg, msgauthorid);
        return
      }

      if (!success) {
        require(gtffile.EMBED).error("❌ Error", "This ID does not exist in GTF lobbies.", embed, msg, msgauthorid);
        return
      }
      if (stats.currentcar(msgauthorid) == "No car.") {
         require(gtffile.EMBED).error("❌ Error", "You do not have a current car.", embed, msg, msgauthorid);
        return
      }

      gtftools.interval(function() {
        if (currentlobby["players"] >= 16) {
          require(gtffile.EMBED).error("❌ Error", "This lobby is full.", embed, msg, msgauthorid);
          return
        }
      stats.inlobby(true, currentlobby["host"], msgauthorid)
      currentlobby["players"].push(msgauthorid)
      results = "☑️ You have joined a lobby: " + server.channels.find(channel => channel.name === name).toString() + "."

      embed.setColor(0x216C2A)
      embed.setDescription(results);
          embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
          msg.channel.send(embed);
          }, 3000, 1)
      gtftools.interval(function() {
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
        var user = msg.author.username

        let role = msg.guild.roles.find(r => r.name === name);
        msg.member.addRole(role).catch(console.error);

        results = "ℹ️ " + user + " has joined the room."
        embed.setDescription(results)
        server.channels.find(channel => channel.name === currentlobby["channelname"]).send(embed)
        return
        }, 3000, 1)

    }
    else if (query[0] == "list") {
      if (Object.keys(lobby).length == 0) {
      embed.setColor(0xFFFF00)
      var results = "⚠ There are no GTF lobbies online."
      } else {
      results = []

      for (var key in lobby) {
       results.unshift("`ID:" + lobby[key]['numberid'] + "🌐` " + msg.guild.members.cache.get(lobby[key]['host']).user.username + "\'s Lobby `" + lobby[key]["players"].length + "/" + lobby[key]['maxplayers'] + "`")
      }
      }
      embed.setTitle("__GTF Lobbies - List__");
      embed.setDescription(results);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed);
    }
    else if (query[0] == "exit" || query[0] == "delete") {
      if (!stats.inlobbystat(msgauthorid)[0]) {
        require(gtffile.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, msgauthorid);
        return
      }
      var currentlobby = lobby[stats.inlobbystat(msgauthorid)[1]]
      if (msg.channel.name !== "lobby-" + stats.inlobbystat(msgauthorid)[1]) {
        require(gtffile.EMBED).error("❌ Error", "This lobby command can only be used in lobbies.", embed, msg, msgauthorid);
        return
      }

      var user = msg.guild.members.cache.get(msgauthorid)
      var member = msg.member;

      var isHost = currentlobby["host"] == msgauthorid

      embed.setColor(0xFFFF00)
      var results = "⚠ Leave from the lobby?" + "\n\n" + "❓ **This is a fixed host room, so if the host leaves then all players will be booted from this lobby.**"

      embed.setDescription(results)

      msg.channel.send(embed).then(msg => {
        
        function exit() {
        currentlobby["players"] = currentlobby["players"].filter(x => (x[0] != msgauthorid))
        if (isHost) {
          server.channels.cache.find(channel => channel.name === currentlobby["channelname"]).delete()
          server.roles.cache.find(s => s.name === currentlobby["channelname"]).delete()
          stats.inlobby(false, "", msgauthorid)
          delete lobby[msgauthorid]
        } else {
        msg.delete({timeout:1000})
        let role = msg.guild.roles.find(r => r.name === "lobby-" + currentlobby["host"]);
        member.removeRole(role).catch(console.error);
        var embed = new Discord.MessageEmbed()
        embed.setColor(0x808080)
        results = "ℹ️ " + user + " has left the room."
        embed.setDescription(results)
        server.channels.find(channel => channel.name === currentlobby["channelname"]).send(embed)
        stats.inlobby(false, "", msgauthorid)

        }
        }
        var emotelist = [[emote.yes, "Yes", exit, "Once"]]
         gtftools.createreactions(emotelist, msg, msgauthorid)

      })

    }
    else if (query[0] == "settings") {
      var currentlobby = lobby[stats.inlobbystat(msgauthorid)[1]]
      if (!(currentlobby["host"] == msgauthorid))  {return "NO"}
      var changes = []
      for (var i = 1; i < query.length; i++) {
        var setting = query[i]
        if (setting.includes("track=")) {
          var number = parseInt(query[i].split("track=")[1])
          if (number <= 0 || isNaN(number) || number > require(gtffile.TRACKS).trackslength) {
             return "NO"
          } else {
            var track = require(gtffile.TRACKS).Track(number - 1)
            lobby[stats.inlobbystat(msgauthorid)[1]]["racesettings"]["track"] = track.name
            lobby[stats.inlobbystat(msgauthorid)[1]]["racesettings"]["km"] = track.length
            lobby[stats.inlobbystat(msgauthorid)[1]]["racesettings"]["mi"] = (Math.round((100 *((track.length)/ 1.609)))) / 100
            changes.push("**Track:** " + track.name)
          }
        }
      }
      if (changes.length == 0) {
        require(gtffile.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, msgauthorid);
        return
      } else {
        var embed2 = new Discord.MessageEmbed()
        embed2.setColor(0x808080)

        results = "ℹ️ " + user + " has changed lobby settings." + "\n\n" + changes.join("\n")

        embed2.setDescription(results)
        msg.channel.send(embed2)
        return
      }

    } else if (query[0] == "info") {
      if (!stats.inlobbystat(msgauthorid)[0]) {
        require(gtffile.EMBED).error("❌ Not In Lobby", "You are not in a lobby. Find a lobby from the list in **!lobby list**.", embed, msg, msgauthorid);
        return
      }

      if (msg.channel.name !== "lobby-" + stats.inlobbystat(msgauthorid)[1]) {
        require(gtffile.EMBED).error("❌ Error", "This lobby command can only be used in your current lobby.", embed, msg, msgauthorid);
        return
      }
      var currentlobby = lobby[stats.inlobbystat(msgauthorid)[1]]
      embed.setTitle(msg.guild.members.cache.get(currentlobby['host']).toString() + "\'s Lobby")
      var racesettings = currentlobby["racesettings"]
      var playerlist = currentlobby["players"].map(x => msg.guild.members.cache.get(x[0])).join(", ")

      var racedetails = "__Lobby Settings__" + " " + "`" + currentlobby["players"].length + "/" + currentlobby["maxplayers"] + " Players`" + "\n" +
      playerlist + "\n\n" +
      "__Track Settings__" + "\n" +
      "**Track:** " + racesettings["track"] + "\n" +
      "**Time/Weather:** " + racesettings["time"] + " | " + racesettings["weather"] + "\n\n" +
      "**Lap(s):** " + racesettings["laps"] + "\n" +
      "**Total Distance:** " + racesettings["km"] + " km" + " | " + racesettings["mi"] + " mi" + "\n";

      embed.setDescription(results + "\n\n" + racedetails)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
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
          gtftools.createreactions(emojilist, msg, msgauthorid)
      })

    }
    else if (query[0] == "r") {

    } else {
       require(gtffile.EMBED).error("❌ Error", "Invalid arguments.", embed, msg, msgauthorid);
    }
  }
};
