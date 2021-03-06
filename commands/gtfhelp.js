var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////
var fs = require("fs");
client.commands = new Discord.Collection();

module.exports = {
  name: "gtfhelp",
  title: "GTF Help",
  cooldown: 3,
  level: 0,
  channels: ["gtf-mode", "testing", "gtf-test-mode", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: ['!gtfhelp ["command"] - Shows arguments for a ["command"].'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0xbe1931);

    if (userdata["id"] != "TEXT") {
      var user = msg.guild.members.cache.get(userdata["id"]).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    }
    var args = "\n" + "`Args: !help`" + "\n";
    var page = 0;
    var results = "";
    var info = '❓ **[ ] Arguments | [()] Numbers | [" "] Strings/Words**';
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    /* Setup */
    var commandName = query[0];
    const commandFiles = fs.readdirSync("/home/runner/gtfbot/commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.name, command);
    }
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      require(gtf.EMBED).alert({ name: "❌ Error", description: "Invalid command." + '\n❓**!gtfhelp ["command"]** - Shows arguments for a **["command"]**.', embed: "", seconds: 0 }, msg, userdata);
      return;
    }
    var description = command.description.map(function (x) {
      if (x.includes(" - ")) {
        x = x.split(" - ");
        x[0] = "__**" + x[0] + "**__";
        x[1] = x[1].replace(/\[/g, "**[").replace(/\]/g, "]**");
        return x.join(" - ");
      } else {
        x = x.replace(/\[/g, "**[").replace(/\]/g, "]**");
        return x;
      }
    });
    if (command.aliases === undefined) {
      var aliases = "";
    } else {
      var aliases = "\n\nAliases: " + command.aliases.join(", ");
    }
    if (command.level >= 1) {
      var level = "  " + emote.exp + "`Lv." + command.level + "`";
    } else {
      var level = "";
    }
    var title = "❓ __**" + command.title + level + "**__";
    var description = description.join("\n") + aliases + "\n\n" + info;
    if (userdata["id"] == "TEXT") {
      return [title, description, 0xbe1931];
    } else {
      embed.setTitle(title);
      embed.setDescription(description);
      msg.channel.send(embed);
    }
  },
};
