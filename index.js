var car = require("./data/gtfcarlist");
var stats = require("./functions/profile/f_stats");
var gtftools = require("./functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("./files/directories");
////////////////////////////////////////////////////
var extra = require("./functions/misc/f_extras");
var emote = require("./index");
var fs = require("fs");

var data = {};
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF";

const prefix = "!";
var dw = JSON.parse(fs.readFileSync("./jsonfiles/dw.json", "utf8"));
module.exports.dwcar = dw;
var gtfcars = JSON.parse(fs.readFileSync("./jsonfiles/gtfcarlist_2021.json", "utf8"));
var gtftracks = JSON.parse(fs.readFileSync("./jsonfiles/gtftracklist.json", "utf8"));
var gtfparts = JSON.parse(fs.readFileSync("./jsonfiles/gtfpartlist.json", "utf8"));
var gtfpaints = JSON.parse(fs.readFileSync("./jsonfiles/gtfpaints.json", "utf8"));
var gtfexp = JSON.parse(fs.readFileSync("./jsonfiles/gtfexp.json", "utf8"));
var gtfweather = JSON.parse(fs.readFileSync("./jsonfiles/gtfweather.json", "utf8"));
var gtftime = JSON.parse(fs.readFileSync("./jsonfiles/gtftime.json", "utf8"));
module.exports.gtfcarlist = gtfcars;
module.exports.gtftracklist = gtftracks;
module.exports.gtfweather = gtfweather;
module.exports.gtftime = gtftime;
module.exports.gtfpartlist = gtfparts;
module.exports.gtfpaintlist = gtfpaints;
module.exports.gtfexp = gtfexp;
module.exports.embedcounts = {};


module.exports.alluserdata = function () {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
    dbo
      .collection("USERS")
      .find({})
      .forEach(row => {
        if (typeof row["id"] === undefined) {
          return;
        } else {
          data[row["id"]] = row;
        }
      })
      .then(() => db.close());
  });
};
require(gtf.MAIN).alluserdata();

client.commands = new Discord.Collection();
var date = new Date();

const express = require("express");
const server = express();
server.all("/", (req, res) => {
  res.send("GT Fitness is now online!");
});

server.listen(3000, () => {});

// Server Settings
var executions = 0;
var listinmaint = [];

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.availinmaint) {
    listinmaint.push(command.name);
  }
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on("ready", () => {
  
  gtftools.checkcarlist(gtfcars);


  var gtfbot = {};
  module.exports.update = client.emojis.cache.get("419605168510992394").toString();
  module.exports.flag = client.emojis.cache.get("646244286635180033").toString();
  module.exports.transparent = client.emojis.cache.get("666878765552369684").toString();

  module.exports.bronze = client.emojis.cache.get("549169213676322857").toString();
  module.exports.silver = client.emojis.cache.get("549169214200741889").toString();
  module.exports.gold = client.emojis.cache.get("549167939807608832").toString();

  module.exports.goldmedal = client.emojis.cache.get("683881057589657650").toString();
  module.exports.silvermedal = client.emojis.cache.get("672660378047741982").toString();
  module.exports.bronzemedal = client.emojis.cache.get("672715512937054208").toString();
  module.exports.diamondmedal = client.emojis.cache.get("683880404855291918").toString();

  module.exports.redlightb = client.emojis.cache.get("638944391112818718").toString();
  module.exports.yellowlightb = client.emojis.cache.get("638944449971617822").toString();
  module.exports.greenlightb = client.emojis.cache.get("638944423056506880").toString();
  module.exports.redlight = client.emojis.cache.get("638944403964035072").toString();
  module.exports.yellowlight = client.emojis.cache.get("638944464853008404").toString();
  module.exports.greenlight = client.emojis.cache.get("638944437996617728").toString();

  module.exports.leftarrow = client.emojis.cache.get("635386925913735171").toString();
  module.exports.rightarrow = client.emojis.cache.get("635386926312062976").toString();
  module.exports.uparrow = client.emojis.cache.get("695112292987175012").toString();
  module.exports.downarrow = client.emojis.cache.get("695112293167661126").toString();

  module.exports.goldtrophy = "<a:goldtrophy:549167939807608832>";
  module.exports.silvertrophy = "<a:silvertrophy:549169214200741889>";
  module.exports.bronzetrophy = "<a:bronzetrophy:549169213676322857>";

  module.exports.yes = client.emojis.cache.get("646994014658232320").toString();
  module.exports.tracklogo = client.emojis.cache.get("647254741990244372").toString();
  module.exports.cargrid = client.emojis.cache.get("653716680781856781").toString();
  module.exports.carright = client.emojis.cache.get("666873065413541929").toString();
  module.exports.carrightblue = client.emojis.cache.get("667175771928002570").toString();
  module.exports.exit = client.emojis.cache.get("654528554519756804").toString();
  module.exports.gtflogo = client.emojis.cache.get("485339455339888640").toString();
  module.exports.loading = client.emojis.cache.get("695112393021325392").toString();
  module.exports.slowdown1 = client.emojis.cache.get("816068685717438485").toString();
  module.exports.slowdown2 = client.emojis.cache.get("816068685688209419").toString();
  module.exports.driftflag = client.emojis.cache.get("701499692877611139").toString();
  module.exports.tire = client.emojis.cache.get("805367277482409994").toString();

  module.exports.credits = client.emojis.cache.get("481849007145222154").toString();
  module.exports.exp = client.emojis.cache.get("470270715900329985").toString();
  module.exports.mileage = client.emojis.cache.get("470270715682226178").toString();
  module.exports.fpp = client.emojis.cache.get("642908988819636254").toString();

  module.exports.jaythefox = client.emojis.cache.get("733154452047134812").toString();
  module.exports.gtlogowhite = client.emojis.cache.get("682139679919046667").toString();
  module.exports.gtlogoblue = client.emojis.cache.get("485339455339888640").toString();

  module.exports.gt6progressbar = client.emojis.cache.get("713512070213140542").toString();
  module.exports.gt6progressbarblack = client.emojis.cache.get("713512070477512786").toString();

  var emote = require("./index");

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
    var number = 0;
    dbo
      .collection("GTFBOT")
      .find({})
      .forEach(row => {
        if (number > 0) {
        } else {
          check(row);
          number++;
        }
      })
      .then(() => db.close());
  });
  function check(row) {
    module.exports.gtfbotconfig = row;
    module.exports.gt6progressbarblack;
    if (require(gtf.MAIN).gtfbotconfig["maintenance"] == "YES") {
      client.user.setActivity("Commands are not available at the moment.", {
        type: "PLAYING",
      });
      client.guilds.cache.get("239493425131552778").members.cache.get(gtf.USERID).setNickname("🛠 Maintenance");
    } else if (require(gtf.MAIN).gtfbotconfig["maintenance"] == "PARTIAL") {
      client.user.setActivity("Many commands are unavailable. | Working commands: " + listinmaint.map(x => "!" + x).join(" "), {
        type: "PLAYING",
      });
      client.guilds.cache.get("239493425131552778").members.cache.get(gtf.USERID).setNickname("🛠 GTF Fitness");
    } else {
      client.user.setActivity("The World of GT Fitness", { type: "PLAYING" });
      client.guilds.cache.get("239493425131552778").members.cache.get(gtf.USERID).setNickname("! | GT Fitness");
    }

    if (dw["daily"]["car"] != "None") {
      dw["daily"] = {
        car: "None",
        start: false,
        prize: 50,
        completed: true,
        mode: 0,
      };
      console.log("Challenge ended abruptly.");
    }
  }

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("rateLimit", info => {
  client.users.cache.get("237450759233339393").send("**RATE LIMIT DETECTED**" + "\n\n" + JSON.stringify(info));
});

client.on("message", async msg => {
  if (userdata === undefined) {
    userdata = { id: msg.author.id };
  }
  var next = function () {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    var args = msg.content.slice(prefix.length).split(/ +/);
    var commandName = args.shift().toLowerCase();

    var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (msg.guild !== null) {
      if (!command) return;
      if (command.delete) {
        msg.delete({ timeout: 0 });
      }
    }

    // Profile
    if (require(gtf.MAIN).gtfbotconfig["maintenance"]) {
      if (msg.author.id != "237450759233339393" && !command.availinmaint) {
        var embed = new Discord.MessageEmbed();
        var user = msg.author.username;
        embed.setAuthor(user, msg.author.displayAvatarURL());
        embed.setColor(0x800080);
        embed.addField("⚠️ Maintenance", "This bot is currently in maintenance. Come back later!");
        msg.channel.send(embed);
        return;
      }
    }
    if (msg.guild !== null) {
      if (command.channels.length >= 1) {
        if (!command.channels.some(name => msg.channel.name.includes(name))) {
          userdata = { id: msg.author.id };
          require(gtf.EMBED).alert({ name: "❌ Incorrect Channel", description: "Commands are not allowed in this channel.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }
    }
    var check = require("./functions/misc/f_start").intro(userdata, command.name, msg);
    if (check == "COMMAND") {
      userdata = { id: msg.author.id };

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = command.cooldown * 1000;

      if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;

          const embed = new Discord.MessageEmbed();
          var user = msg.author.username;
          embed.setAuthor(user, msg.author.displayAvatarURL());
          embed.setColor(0x800080);
          embed.setDescription("⏲ You have a cooldown of " + timeLeft.toFixed(1) + " seconds for `!" + command.name + "`." + " Please wait.");
          //msg.channel.send(embed)
          return;
        }
      }
      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

      return executecommand(command, args, msg, userdata);
    }
    if (check != "SUCCESS") {
      return;
    }

    if (userdata["credits"] == 0 && userdata["exp"] == 0 && userdata["garage"].length == 0) {
      stats.addcredits(15000, userdata);
    }
    var currdate = gtftools.getFormattedDate(date, userdata);

    if (userdata["lastonline"] != currdate) {
      userdata["dailyworkout"] = false;
      //userdata["careerraces"] = Object.keys(userdata["careerraces"]).filter(key => key.match(/seasonal/gi)).forEach(key => delete userdata["careerraces"][key]);

      stats.setmileage(0, 0, userdata);
      userdata["lastonline"] = currdate;
    }

    // Deleting messages

    // Updates

    if (command.name != "update") {
      if (userdata["version"] === undefined || userdata["version"] < require(gtf.MAIN).gtfbotconfig["version"]) {
        require(gtf.EMBED).error("❌ Version Incompatible", "Your save data needs to be updated in order to use current features. Use **!update** to update your save to the latest version.", embed, msg, userdata);
        return;
      }
    }

    // Roles
    var roles = command.roles;
    if (!(roles === undefined)) {
      for (var i = 0; i < roles.length; i++) {
        if (msg.authorroles.cache.find(r => r.name === roles[i])) {
          roles.shift();
        }
        if (roles.length == 0) {
          break;
        }
      }
      if (roles.length > 0) {
        roles[0] = "❌ " + roles[0];
        roles = roles.join("\n❌ ");

        require(gtf.EMBED).alert({ name: "❌ Missing Roles", description: " **❌ You are unable to use `!" + commandName + "`, because of insufficient roles.** \n\n" + roles, embed: "", seconds: 0 }, msg, userdata);
        msg.channel.send(embed);
        return;
      }
    }
    //Checks if in a race
    if (!command.usedduringrace) {
      if (userdata["raceinprogress"][2] < new Date()) {
        userdata["raceinprogress"] = [false, ["", ""], undefined, msg.author.id];
      }
      if (stats.raceinprogressstat(userdata)[0]) {
        var embed = new Discord.MessageEmbed();
        var user = msg.author.username;
        embed.setAuthor(user, msg.author.displayAvatarURL());
        require(gtf.EMBED).alert(
          { name: "⚠️ Session In Progress", description: "You are unable to use `!" + commandName + "` until you've finished your session." + "\n\n" + "**❓ If you want to exit your current session, click the " + emote.exit + " reaction.**", embed: "", seconds: 0 },
          msg,
          userdata
        );
        msg.channel.send(embed).then(msg => {
          function exit() {
            return require("./commands/cancel").execute(msg, ["✨✨✨"], userdata);
          }
          var emojilist = [[emote.exit, "gtfexit", exit]];
          gtftools.createreactions(emojilist, msg, userdata);
        });
        return;
      }
    }
    //
    if (!command.usedinlobby) {
      if (stats.inlobbystat(userdata)[0]) {
        if (!msg.guild.roles.cache.find(r => r.name === "lobby-" + userdata["inlobby"][1])) {
          userdata["inlobby"] = stats.inlobby(false, "", userdata);
        } else {
          var embed = new Discord.MessageEmbed();
          var user = msg.guild.members.cache.get(userdata["id"]).user.username;
          embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
          require(gtf.EMBED).alert({ name: "⚠️ Lobby In Session", description: "You are unable to use `!" + commandName + "` until you have left from your current lobby.", embed: "", seconds: 0 }, msg, userdata);
          msg.channel.send(embed);
          return;
        }
      }
    }

    ///COOLDOWN///

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);

    const cooldownAmount = command.cooldown * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;

        const embed = new Discord.MessageEmbed();
        var user = msg.author.username;
        embed.setAuthor(user, msg.author.displayAvatarURL());
        embed.setColor(0x800080);
        embed.setDescription("⏲ You have a cooldown of " + timeLeft.toFixed(1) + " seconds for `!" + command.name + "`." + " Please wait.");
        msg.channel.send(embed).then(msg => {
          msg.delete({ timeout: 3000 });
        });
        return;
      }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    if (!require(gtf.EXP).checklevel(command.level, embed, msg, userdata)) {
      return;
    }

    if (command.requirecar) {
      if (stats.garagecount(userdata) == 0) {
        require(gtf.EMBED).alert({ name: "❌ No Car", description: "You do not have a current car.", embed: "", seconds: 0 }, msg, userdata);
        return;
      }
    }

    if (msg.author.username == "everyone" || msg.author.username == "here") {
      require(gtf.EMBED).error("❌ Username Not Allowed", "Your username is not allowed from this bot. Please choose another username.", embed, msg);
      return;
    }
    try {
      executecommand(command, args, msg, userdata);
    } catch (error) {
      var embed = new Discord.MessageEmbed();
      require(gtf.EMBED).alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, userdata);
      console.error(error);
    }
  };

  var userdata;
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
    dbo
      .collection("USERS")
      .find({ id: msg.author.id })
      .forEach(row => {
        if (typeof row["id"] === undefined) {
          return {};
        } else {
          userdata = row;
        }
      })
      .then(async () => {
        stats.save(userdata);
        db.close();
        next();
      });
  });
});

client.api.applications(gtf.USERID).guilds(gtf.SERVERID).commands.post({
  data: {
    name: 'tune',
    description: 'N/A: Display tuning parts in GT Auto to tune your current car.',
    options: [{
      "name": "type",
      "description": "N/A: Select the performance type you want to view.",
      "type": 3,
      "required": true,
      "choices": [
          {
            "name": "❗ Display Available Parts",
            "value": "list"
      },
  {
            "name": "Engine",
            "value": "engine"
      },
      {
            "name": "Transmission",
            "value": "transmission"
        },
        {
            "name": "Suspension",
            "value": "suspension"
        },
        {
            "name": "Tires",
            "value": "tires"
        },
        {
            "name": "Weight Reduction",
            "value": "weight"
        },
        {
            "name": "Turbo Kits",
            "value": "turbo"
        },
        {
            "name": "Aero Kits",
            "value": "aero"
        }]
      },
      {
      "name": "number",
      "description": "N/A: Pick a number associated with the type. Type \"S\" to revert to stock.",
      "type": 4,
      "required": false
      }
      ]
}
}) 

/*var choices2 = [
  {
            "name": "Decal",
            "value": "decal"
      },
      {
            "name": "Car",
            "value": "a"
        },
        {
            "name": "Professional",
            "value": "pro"
        },
  {"name": "Information",
  "value": "info"}]*/
/*
    Displays your information, stats, and career progression.

*/
//client.api.applications(process.env.USERID).guilds(gtf.SERVERID).commands("825481564476538900").delete()
//client.api.applications(process.env.USERID).guilds(gtf.SERVERID).commands("825464762841956423").delete()
/*client.api.applications(process.env.USERID).guilds(gtf.SERVERID).commands.post({
  data: {
  "name": "lobby",
  "description": "Test: Does the same as /lobby info.",
  "options": [
      {
      "name": "list",
      "description": "Test: Displays the list of lobbies in GTF.",
      "type": 1,
      "options": []
    },
    {
      "name": "create",
      "description": "Test: Create a new lobby.",
      "type": 1,
      "options": []
    },
    {
      "name": "start",
      "description": "Test: Starts a race in your current lobby.",
      "type": 1,
      "options": []
    },
    {
      "name": "info",
      "description": "Test: Get info about the current lobby you are in.",
      "type": 1,
      "options": []
    },
    {
      "name": "settings",
      "description": "Test: Set lobby settings (Lobby host only).",
      "type": 2,
      "options": [
        {
          "name": "roomname",
          "description": "Set the room name for the current lobby.",
          "type": 1,
          "options": [{
                            "name": "name",
                            "description": "1-20 characters & no spaces",
                            "type": 3,
                            "required": true
                  }]
        },
        {
          "name": "track",
          "description": "Test: Set the track in the current lobby.",
          "type": 1,
          "options": [{
                            "name": "number",
                            "description": "The track number to set the lobby | 0 for full list.",
                            "type": 4,
                            "required": true
                  }]
        },
        {
          "name": "laps",
          "description": "Test: Set the number of laps in the current lobby.",
          "type": 1,
          "options": [{
                            "name": "number",
                            "description": "Set the number of laps (1-10).",
                            "type": 4,
                            "required": true
                  }]
        }
      ]
    },
     {
      "name": "exit",
      "description": "Test: Exit from your current lobby.",
      "type": 1,
      "options": []
    }
  ]
}
})
*/

/*
"options": [
    {
      "name": "create",
      "description": "Test: Create a new lobby.",
      "type": 1,
      "options": []
    },
    {
      "name": "start",
      "description": "Test: Starts a race in your current lobby.",
      "type": 1,
      "options": []
    },
    {
      "name": "info",
      "description": "Test: Get info about the current lobby you are in.",
      "type": 1,
      "options": []
    },
    {
      "name": "settings",
      "description": "Test: Set lobby settings (Lobby host only).",
      "type": 2,
      "options": [
        {
          "name": "roomname",
          "description": "Set the room name for the current lobby.",
          "type": 1,
          "options": [{
                            "name": "name",
                            "description": "1-20 characters & no spaces",
                            "type": 3,
                            "required": true
                  }]
        },
        {
          "name": "laps",
          "description": "Test: Set the number of laps in the current lobby.",
          "type": 1,
          "options": [{
                            "name": "number",
                            "description": "Set the number of laps (2-10).",
                            "type": 4,
                            "required": true
                  }]
        }
      ]
    },
     {
      "name": "exit",
      "description": "Test: Exit from your current lobby.",
      "type": 1,
      "options": []
    }
  ]
*/
client.ws.on("INTERACTION_CREATE", async interaction => {
  interaction.guild = client.guilds.cache.get(interaction.guild_id);
  interaction.channel = client.channels.cache.get(interaction.channel_id);
  interaction.member = interaction.guild.members.cache.get(interaction.member.user.id);
  interaction.author = interaction.member.user;

  if (Object.keys(interaction["data"]).includes("custom_id")) {
  embed.setColor(0x0151b0);
  interaction.content = interaction["data"]["custom_id"].split("__").join(" ")
  
    try {
      load_msg(interaction);
      console.log(interaction.content)
    } catch (error) {
      require(gtf.EMBED).alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, { id: interaction.author.id });
      console.error(error);
    }
    return
  }

  const args = interaction.data.options;

  function findVal(object, key) {
    var value;
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === "object") {
        value = findVal(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }
  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj).reduce((acc, [key, value]) => (key === keyToFind ? acc.concat(value) : typeof value === "object" ? acc.concat(findAllByKey(value, keyToFind)) : acc), []);
  }

  // USAGE

  if (args == undefined) {
    interaction.content = interaction.data.name.toLowerCase();
  } else {
    if (interaction.data.name.toLowerCase() == "course") {
      interaction.content = args.map(x => x["name"] + "=" + x["value"]);
      interaction.content.unshift(interaction.data.name.toLowerCase());
      interaction.content = interaction.content.join(" ");
    } else if (interaction.data.name.toLowerCase() == "lobby") {
      interaction.content = findAllByKey(interaction.data.options, "name").reverse();
      if (findAllByKey(interaction.data.options, "value").length != 0) {
        interaction.content.pop();
        interaction.content.push(findAllByKey(interaction.data.options, "value")[0]);
      }
      interaction.content.unshift(interaction.data.name.toLowerCase());
      interaction.content = interaction.content.join(" ");
    } else {
      interaction.content = args.map(x => x["value"]);
      interaction.content.unshift(interaction.data.name.toLowerCase());
      interaction.content = interaction.content.join(" ");
    }
  }
  const embed = new Discord.MessageEmbed();
  embed.setColor(0x0151b0);

  const commandName = interaction.data.name.toLowerCase();

  var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "**✅ Success**",
      },
    },
  });

  setTimeout(function () {
    try {
      load_msg(interaction);
    } catch (error) {
      var embed = new Discord.MessageEmbed();
      require(gtf.EMBED).alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, { id: interaction.author.id });
      console.error(error);
    }
    return;
    if (commandName === "ping") {
      new Discord.WebhookClient(client.user.id, interaction.token).send("Pong!");
      return;
    }
  }, 200);
  ////////////////////////////////////////////

  function load_msg(msg) {
    if (userdata === undefined) {
      userdata = { id: msg.author.id };
    }
    var next = function () {
      var args = msg.content.split(/ +/);
      var commandName = args.shift().toLowerCase();

      var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return;
      if (command.delete) {
        msg.delete({ timeout: 0 });
      }

      // Profile
      if (require(gtf.MAIN).gtfbotconfig["maintenance"]) {
        if (msg.author.id != "237450759233339393" && !command.availinmaint) {
          var embed = new Discord.MessageEmbed();
          var user = msg.author.username;
          embed.setAuthor(user, msg.author.displayAvatarURL());
          embed.setColor(0x800080);
          embed.addField("⚠️ Maintenance", "This bot is currently in maintenance. Come back later!");
          msg.channel.send(embed);
          return;
        }
      }
      if (command.channels.length >= 1) {
        if (!command.channels.some(name => msg.channel.name.includes(name))) {
          userdata = { id: msg.author.id };
          require(gtf.EMBED).alert({ name: "❌ Incorrect Channel", description: "Commands are not allowed in this channel.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }
      var check = require("./functions/misc/f_start").intro(userdata, command.name, msg);
      if (check == "COMMAND") {
        userdata = { id: msg.author.id };

        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;

        if (timestamps.has(msg.author.id)) {
          const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;

            const embed = new Discord.MessageEmbed();
            var user = msg.author.username;
            embed.setAuthor(user, msg.author.displayAvatarURL());
            embed.setColor(0x800080);
            embed.setDescription("⏲ You have a cooldown of " + timeLeft.toFixed(1) + " seconds for `!" + command.name + "`." + " Please wait.");
            //msg.channel.send(embed)
            return;
          }
        }
        timestamps.set(msg.author.id, now);
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

        return executecommand(command, args, msg, userdata);
      }
      if (check != "SUCCESS") {
        return;
      }

      if (userdata["credits"] == 0 && userdata["exp"] == 0 && userdata["garage"].length == 0) {
        stats.addcredits(15000, userdata);
      }
      var currdate = gtftools.getFormattedDate(date, userdata);

      if (userdata["lastonline"] != currdate) {
        userdata["dailyworkout"] = false;
        //userdata["careerraces"] = Object.keys(userdata["careerraces"]).filter(key => key.match(/seasonal/gi)).forEach(key => delete userdata["careerraces"][key]);

        stats.setmileage(0, 0, userdata);
        userdata["lastonline"] = currdate;
      }

      // Updates

      if (command.name != "update") {
        if (userdata["version"] === undefined || userdata["version"] < require(gtf.MAIN).gtfbotconfig["version"]) {
          require(gtf.EMBED).alert({ name: "❌ Version Incompatible", description: "Your save data needs to be updated in order to use current features. Use **!update** to update your save to the latest version.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }

      // Roles
      var roles = command.roles;
      if (!(roles === undefined)) {
        for (var i = 0; i < roles.length; i++) {
          if (msg.authorroles.cache.find(r => r.name === roles[i])) {
            roles.shift();
          }
          if (roles.length == 0) {
            break;
          }
        }
        if (roles.length > 0) {
          roles[0] = "❌ " + roles[0];
          roles = roles.join("\n❌ ");
          require(gtf.EMBED).alert({ name: "❌ Missing Roles", description: " **❌ You are unable to use `!" + commandName + "`, because of insufficient roles.** \n\n" + roles, embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }
      //Checks if in a race
      if (!command.usedduringrace) {
        if (userdata["raceinprogress"][2] < new Date()) {
          userdata["raceinprogress"] = [false, ["", ""], undefined, msg.author.id];
        }
        if (stats.raceinprogressstat(userdata)[0]) {
          var embed = new Discord.MessageEmbed();
          var user = msg.author.username;
          embed.setAuthor(user, msg.author.displayAvatarURL());

          require(gtf.EMBED).alert(
            { name: "⚠️ Session In Progress", description: "You are unable to use `!" + commandName + "` until you've finished your session." + "\n\n" + "**❓ If you want to exit your current session, click the " + emote.exit + " reaction.**", embed: "", seconds: 0 },
            msg,
            userdata
          );
          msg.channel.send(embed).then(msg => {
            function exit() {
              return require("./commands/cancel").execute(msg, ["✨✨✨"], userdata);
            }
            var emojilist = [[emote.exit, "gtfexit", exit]];
            gtftools.createreactions(emojilist, msg, userdata);
          });
          return;
        }
      }
      //
      if (!command.usedinlobby) {
        if (stats.inlobbystat(userdata)[0]) {
          var embed = new Discord.MessageEmbed();
          var user = msg.guild.members.cache.get(userdata["id"]).user.username;
          embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
          require(gtf.EMBED).alert({ name: "⚠️ Lobby In Session", description: "You are unable to use `!" + commandName + "` until you have left from your current lobby.", embed: "", seconds: 0 }, msg, userdata);
          msg.channel.send(embed);
          return;
        }
      }

      ///COOLDOWN///

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);

      const cooldownAmount = command.cooldown * 1000;

      if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;

          const embed = new Discord.MessageEmbed();
          var user = msg.author.username;
          embed.setAuthor(user, msg.author.displayAvatarURL());
          embed.setColor(0x800080);
          embed.setDescription("⏲ You have a cooldown of " + timeLeft.toFixed(1) + " seconds for `!" + command.name + "`." + " Please wait.");
          msg.channel.send(embed).then(msg => {
            msg.delete({ timeout: 3000 });
          });
          return;
        }
      }
      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

      if (!require(gtf.EXP).checklevel(command.level, embed, msg, userdata)) {
        return;
      }

      if (command.requirecar) {
        if (stats.garagecount(userdata) == 0) {
          require(gtf.EMBED).alert({ name: "❌ No Car", description: "You do not have a current car.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
      }

      if (msg.author.username == "everyone" || msg.author.username == "here") {
        require(gtf.EMBED).error("❌ Username Not Allowed", "Your username is not allowed from this bot. Please choose another username.", embed, msg);
        return;
      }
      try {
        executecommand(command, args, msg, userdata);
      } catch (error) {
        var embed = new Discord.MessageEmbed();
        require(gtf.EMBED).error("❌ Unexpected Error", "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed, msg, userdata);
        console.error(error);
      }
    };
    var userdata;
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo
        .collection("USERS")
        .find({ id: msg.author.id })
        .forEach(row => {
          if (typeof row["id"] === undefined) {
            return {};
          } else {
            userdata = row;
          }
        })
        .then(async () => {
          stats.save(userdata);
          db.close();
          next();
        });
    });
  }
});

client.login(process.env.SECRET).then(function () {
  var keys = [];
  //extra.updatecommandslist(client)
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
    dbo
      .collection("USERS")
      .find({})
      .forEach(row => {
        if (typeof row["id"] === undefined) {
          return;
        } else {
          if (row["racedetails"] === undefined) {
            return;
          }

          if (row["racedetails"].length == 0) {
            return;
          }
          if (!row["raceinprogress"][0] || row["raceinprogress"][1][0] === undefined || row["raceinprogress"][1][1] === undefined) {
            return;
          }
          keys.push(row);
        }
      });

    var index1 = 0;
    setTimeout(function () {
      require(gtf.SEASONAL).changeseasonals(false);
      gtftools.interval(
        function () {
          stats.resumerace(keys[index1], client);
          index1++;
        },
        1000,
        keys.length
      );

      db.close();
    }, 5000);
  });
});

var executecommand = function (command, args, msg, userdata) {
  try {
    command.execute(msg, args, userdata);
  } catch (error) {
    if (error == "DONE") {
      return
    }
    var embed = new Discord.MessageEmbed();
    require(gtf.EMBED).alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, userdata);
    console.error(error);
  }
};
