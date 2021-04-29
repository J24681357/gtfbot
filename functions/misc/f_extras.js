var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require("../../files/directories");
////////////////////////////////////////////////////
var gtfuser = require("../../index");
var fs = require("fs");

module.exports.message = function (client, title, text, color, image, channelid, reactions, number) {
  var server = client.guilds.cache.get(gtf.SERVERID);
  var channel = server.channels.cache.get(channelid);
  var embed = new Discord.MessageEmbed();
  var description = text;

  if (typeof channel == "undefined") {
    channel.send("Invalid");
    return;
  }

  channel.messages.fetch().then(msg => {
    var arr = Array.from(msg.entries()).reverse();

    if (typeof arr[number - 1] === "undefined") {
      embed.setTitle(title);
      embed.setDescription(description);
      if (color.length != 0) {
        embed.setColor(color);
      }
      if (typeof image !== "undefined") {
        if (image.length != 0) {
          embed.setThumbnail(image);
        }
      }
      channel.send(embed);
      return;
    }

    channel.messages.fetch(arr[number - 1][0]).then(msg => {
      if (msg == undefined) {
        embed.setTitle(title);
        embed.setDescription(description);
        if (color.length != 0) {
          embed.setColor(color);
        }
        if (typeof image !== "undefined") {
          if (image.length != 0) {
            embed.setThumbnail(image);
          }
        }
        channel.send(embed);
        return;
      }

      var otitle = msg.embeds[0].title;
      var odescription = msg.embeds[0].description;

      if (odescription === undefined || otitle === undefined) {
        embed.setTitle(title);
        embed.setDescription(description);
        if (color.length != 0) {
          embed.setColor(color);
        }
        if (typeof image !== "undefined") {
          if (image.length != 0) {
            embed.setThumbnail(image);
          }
        }
        msg.edit(embed);
        return;
      }

      if (JSON.stringify(odescription) !== JSON.stringify(description) || JSON.stringify(otitle) !== JSON.stringify(title)) {
        embed.setTitle(title);
        embed.setDescription(description);
        if (color.length != 0) {
          embed.setColor(color);
        }
        if (typeof image !== "undefined") {
          if (image.length != 0) {
            embed.setThumbnail(image);
          }
        }
        msg.edit(embed);
      }
      var time = 0;
      if (reactions.length != 0) {
        if (msg.reactions.cache.size < reactions.length) {
          time = 3000 * (reactions.length + 1);
          var i = 0;
          gtftools.interval(
            function () {
              msg.react(reactions[i][0]);
              i++;
            },
            3000,
            reactions.length
          );
        }

        setTimeout(function () {
          var filters = function (index) {
            var filterzero = (reaction, user) => reaction.emoji.name === reactions[index][0];
            const filter11 = msg.createReactionCollector(filterzero, { timer: 1000 });

            filter11.on("collect", r => {
              try {
                for (const user of r.users.cache.values()) {
                  if (user.id == gtf.USERID) {
                    continue;
                  }
                  r.users.remove(user).then(
                    x =>
                      function () {
                        console.log("E");
                      }
                  );
                  var useri = msg.guild.members.cache.get(user.id);
                  var role = msg.guild.roles.cache.find(r => r.name === reactions[index][1]);

                  if (useri.roles.cache.find(r => r.name === reactions[index][1])) {
                    useri.roles.remove(role).catch(console.error);
                  } else {
                    useri.roles.add(role).catch(console.error);
                  }
                }
              } catch (error) {
                console.error(error);
              }
            });
          };
          for (var i = 0; i < reactions.length; i++) {
            filters(i);
          }
        }, time);
      }
    });
  });
};

module.exports.updatecommandslist = function (client) {
  var commandslist = fs
    .readdirSync("/app/commands")
    .filter(file => file.endsWith(".js"))
    .map(file => file.split(".js")[0]);
  var size = commandslist.length;
  var index = 0;
  gtftools.interval(
    function () {
      if (commandslist[index] == "gift" || commandslist[index] == "lobby") {
        index++;
      } else {
        var results = require("../../commands/gtfhelp").execute("", [commandslist[index]], "TEXT");

        require(gtf.EXTRA).message(client, results[0], results[1], results[2], "", "703096311129571358", [], index + 1);
        index++;
        if (index == size) {
          console.log("Commands List Updated.");
        }
      }
    },
    2500,
    size
  );
};
