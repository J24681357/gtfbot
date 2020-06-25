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
var fs = require("fs");
client.commands = new Discord.Collection();

module.exports = {
  name: "gtfhelp",
  title: "GTF Help",
  cooldown: 3,
    level: 0,
  delete: true,
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!gtfhelp [\"command\"] - Shows arguments for a [\"command\"]."],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0xBE1931);
    
    if (msgauthorid != "TEXT") {
    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(
      user,
      msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL()
    );
    }
    var args = "\n" + "`Args: !help`" + "\n";

    /* Setup */
    var commandName = query[0];
    const commandFiles = fs
      .readdirSync("/app/commands")
      .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`/app/commands/${file}`);
      client.commands.set(command.name, command);
    }
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      require(gtffile.EMBED).error("❌ Error", "Invalid command." + "\n❓**!gtfhelp [\"command\"]** - Shows arguments for a **[\"command\"]**.", embed, msg, msgauthorid);
      return;
    }
    var description = command.description.map(function(x) {
      if (x.includes(" - ")) {
      x = x.split(" - ")
      x[0] = "__**" + x[0] + "**__" 
      x[1] = x[1].replace(/\[/g, "**[").replace(/\]/g, "]**")
      return x.join(" - ")
      } else {
        x = x.replace(/\[/g, "**[").replace(/\]/g, "]**")
        return x
      }
    })
    if (command.aliases === undefined) {
      var aliases = ""
    } else {
      var aliases = "\n\nAliases: " + command.aliases.join(", ")
    }
    if (command.level >= 1) {
      var level = "  " + emote.exp + "`Lv." + command.level + "`"
    } else {
      var level = ""
    }
    var title = "❓ __**" + command.title + level + "**__"
    var description = description.join("\n") + aliases + "\n\n" + "❓ **[ ] Arguments | [()] Numbers | [\" \"] Strings/Words**"
    if (msgauthorid == "TEXT") {
      console.log(title)
      return [title, description, 0xBE1931]
    } else {
    embed.setTitle(title)
    embed.setDescription(description)
    msg.channel.send(embed)
    }
    
  }
};
