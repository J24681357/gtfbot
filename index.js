var gtf = require('./functions/f_gtf');
var race = require('./functions/races/f_races');
var car = require('./data/gtfcarlist');
var stats = require('./functions/profile/f_stats');
var gtftools = require('./functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfraces = require('./functions/races/f_currentraces');
var gtfuser = require('./index');
var extra = require("./functions/misc/f_extras");
var emote = require('./index');

var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);


let MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

const prefix = '!';

var dw = JSON.parse(fs.readFileSync('./users/dw.json', 'utf8'));
module.exports.dwcar = dw;


var gtfcars = JSON.parse(fs.readFileSync('./users/gtfcarlist.json', 'utf8'));
var gtfparts = JSON.parse(fs.readFileSync('./users/gtfpartlist.json', 'utf8'));
module.exports.gtfcarlist = gtfcars
module.exports.gtfpartlist = gtfparts

module.exports.embedcounts = {}

var data = {}
module.exports.alluserdata = function() {
  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("USERS").find({}).forEach(row => {
        if (typeof row["id"] === undefined) {
          return
        } else {
          data[row["id"]] = row
        }
      }).then(() => 
      db.close())
    })
}
gtfuser.alluserdata()



client.commands = new Discord.Collection();
var date = new Date();


/*.then(function() {
if (!c) {
    gtfbot = {
      maintenance: "NO",
      errors: [],
      executions: 0,
      version: 4,
    };
        dbo.collection("GTFBOT").insertOne(gtfbot)
        console.log("initalization added")
      return gtfbot
  } else {
    return gtfbot
  }
  }) */



const express = require('express');
const server = express();
server.all('/', (req, res) => {
  res.send('Your bot is alive!')
})

server.listen(3000, () => { console.log("Server is Ready!") });

// Server Settings
var executions = 0;
var listinmaint = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.availinmaint) {
    listinmaint.push(command.name)
  }
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
client.on('ready', () => {

  var gtfbot = {}



  module.exports.update = client.emojis.cache.get('419605168510992394').toString();
  module.exports.flag = client.emojis.cache.get('646244286635180033').toString();
  module.exports.transparent = client.emojis.cache.get('666878765552369684').toString();
  module.exports.s1 = client.emojis.cache.get('666878765552369684').toString();
  module.exports.s1r1 = client.emojis.cache.get('674172865087799296').toString();

  module.exports.s2 = client.emojis.cache.get('673749991940161546').toString();
  module.exports.s2r1 = client.emojis.cache.get('674172864555122709').toString();

  module.exports.s3 = client.emojis.cache.get('673749992007270420').toString();
  module.exports.s3r1 = client.emojis.cache.get('674172864890535936').toString();

  module.exports.c142 = client.emojis.cache.get('673938767316516880').toString();

  module.exports.c242 = client.emojis.cache.get('673938767329099806').toString();
  module.exports.c242r1 = client.emojis.cache.get('674130136865701888').toString();
  module.exports.c242r2 = client.emojis.cache.get('674355507867418654').toString();
  module.exports.c242r3 = client.emojis.cache.get('674355507955499008').toString();

  module.exports.c342 = client.emojis.cache.get('673938767190687745').toString();

  module.exports.bronze = client.emojis.cache.get('549169213676322857').toString();
  module.exports.silver = client.emojis.cache.get('549169214200741889').toString();
  module.exports.gold = client.emojis.cache.get('549167939807608832').toString();

  module.exports.goldmedal = client.emojis.cache.get('683881057589657650').toString();
  module.exports.silvermedal = client.emojis.cache.get('672660378047741982').toString();
  module.exports.bronzemedal = client.emojis.cache.get('672715512937054208').toString();
  module.exports.diamondmedal = client.emojis.cache.get('683880404855291918').toString();

  module.exports.redlightb = client.emojis.cache.get('638944391112818718').toString();
  module.exports.yellowlightb = client.emojis.cache.get('638944449971617822').toString();
  module.exports.greenlightb = client.emojis.cache.get('638944423056506880').toString();
  module.exports.redlight = client.emojis.cache.get('638944403964035072').toString();
  module.exports.yellowlight = client.emojis.cache.get('638944464853008404').toString();
  module.exports.greenlight = client.emojis.cache.get('638944437996617728').toString();

  module.exports.leftarrow = client.emojis.cache.get('635386925913735171').toString();
  module.exports.rightarrow = client.emojis.cache.get('635386926312062976').toString();
  module.exports.uparrow = client.emojis.cache.get('695112292987175012').toString();
  module.exports.downarrow = client.emojis.cache.get('695112293167661126').toString();

  module.exports.goldtrophy = '<a:goldtrophy:549167939807608832>';
  module.exports.silvertrophy = '<a:silvertrophy:549169214200741889>';
  module.exports.bronzetrophy = '<a:bronzetrophy:549169213676322857>';

  module.exports.yes = client.emojis.cache.get('646994014658232320').toString();
  module.exports.tracklogo = client.emojis.cache.get('647254741990244372').toString();
  module.exports.cargrid = client.emojis.cache.get('653716680781856781').toString();
  module.exports.carright = client.emojis.cache.get('666873065413541929').toString();
  module.exports.carrightblue = client.emojis.cache.get('667175771928002570').toString();
  module.exports.exit = client.emojis.cache.get('654528554519756804').toString();
  module.exports.gtflogo = client.emojis.cache.get('485339455339888640').toString();
  module.exports.loading = client.emojis.cache.get('695112393021325392').toString();
  module.exports.driftflag = client.emojis.cache.get('701499692877611139').toString();

  module.exports.credits = client.emojis.cache.get('481849007145222154').toString();
  module.exports.exp = client.emojis.cache.get('470270715900329985').toString();
  module.exports.mileage = client.emojis.cache.get('470270715682226178').toString();
  module.exports.fpp = client.emojis.cache.get('642908988819636254').toString();

  module.exports.jaythefox = client.emojis.cache.get('733154452047134812').toString();
  module.exports.gtlogowhite = client.emojis.cache.get('682139679919046667').toString();
  module.exports.gtlogoblue = client.emojis.cache.get('485339455339888640').toString();

  module.exports.gt6progressbar = client.emojis.cache.get('713512070213140542').toString();
  module.exports.gt6progressbarblack = client.emojis.cache.get('713512070477512786').toString();
  var emote = require('./index');

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      var number = 0
      dbo.collection("GTFBOT").find({}).forEach(row => {
        if (number > 0) {

        } else {
          check(row)
          number++
        }
      }).then(() => 
      db.close())
    })
  function check(row) {
    module.exports.gtfbotconfig = row
    module.exports.gt6progressbarblack
    if (gtfuser.gtfbotconfig['maintenance'] == "YES") {
      client.user.setActivity('Commands are not available at the moment.', {
        type: 'PLAYING',
      });
      client.guilds.cache
        .get('239493425131552778')
        .members.cache.get(gtffile.USERID)
        .setNickname('🛠 Maintenance');
    } else if (gtfuser.gtfbotconfig['maintenance'] == "PARTIAL") {
      client.user.setActivity('Many commands are unavailable. | Working commands: ' + listinmaint.map(x => "!" + x).join(" "), {
        type: 'PLAYING',
      });
      client.guilds.cache
        .get('239493425131552778')
        .members.cache.get(gtffile.USERID)
        .setNickname('🛠 GTF Fitness');
    } else {
      client.user.setActivity('The World of GT Fitness', { type: 'PLAYING' });
      client.guilds.cache
        .get('239493425131552778')
        .members.cache.get(gtffile.USERID)
        .setNickname('! | GT Fitness');
    }
    gtfuser.gtfbotconfig['executions'] = 0;

    if (dw['daily']['car'] != 'None') {
      dw['daily'] = {
        car: 'None',
        start: false,
        prize: 50,
        completed: true,
        mode: 0,
      };
      console.log('Challenge ended abruptly.');
    }
  }

  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('rateLimit', (info) => {
  console.log(`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout: 'Unknown timeout '}`)
})

client.on('message', msg => {

  var userdata = {}
  var member = msg.guild.members.cache.get(msg.author.id);
  var next = function() {

      if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (member.roles.cache.some(role => role.name === 'Muted')) {
    msg.delete({ timeout: 0 });
  }

  var args = msg.content.slice(prefix.length).split(/ +/);
  var commandName = args.shift().toLowerCase();

  var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;
    if (command.delete) {
    msg.delete({ timeout: 0 });
  }

  // Profile
  console.log(gtfuser.gtfbotconfig['maintenance'])
    if (gtfuser.gtfbotconfig['maintenance']) {
    if (msg.author.id != '237450759233339393' && !command.availinmaint) {
      var embed = new Discord.MessageEmbed();
      var user = msg.author.username;
      embed.setAuthor(user, msg.author.displayAvatarURL());
      embed.setColor(0x800080);
      embed.addField('⚠️ Maintenance', 'This bot is currently in maintenance. Come back later!');
      msg.channel.send(embed);
      return;
    }
    }
  if (!command.channels.includes(msg.channel.name)) {
    userdata = {"id": msg.author.id}
      require(gtffile.EMBED).error('❌ Incorrect Channel', 'Commands are not allowed in this channel.', embed, msg, userdata);
      return;
  }
  var check = require('./functions/misc/f_start').intro(userdata, command.name, msg);
  if (check == "COMMAND") {
    userdata = {"id": msg.author.id}
    return executecommand(command, args, msg, userdata)
  }
  if (check != "SUCCESS") {
    return
  }

  if (userdata['credits'] == 0 && userdata['exp'] == 0 && userdata['garage'].length == 0) {
    stats.addcredits(15000, userdata);
  }
  var currdate = gtftools.getFormattedDate(date, userdata);

  if (userdata['lastonline'] != currdate) {
    userdata['dailyworkout'] = false;
    stats.setmileage(0, 0, userdata);
  }
  userdata['lastonline'] = currdate;


  //////////////////////////


  /*if (!replays[author]) {
    replays[author] = {
      id: author,
      replayid: 0,
      replays: [],
    };
  }*/


  /////////



  // Deleting messages

  // Updates

  if (command.name != 'update') {
    if (userdata['version'] === undefined || userdata['version'] < gtfuser.gtfbotconfig['version']) {
      require(gtffile.EMBED).error('❌ Version Incompatible', 'Your save data needs to be updated in order to use current features. Use **!update** to update your save to the latest version.', embed, msg, userdata);
      return;
    }
  }

  // Roles
  var roles = command.roles;
  if (!(roles === undefined)) {
    for (var i = 0; i < roles.length; i++) {
      if (member.roles.cache.find(r => r.name === roles[i])) {
        roles.shift();
      }
      if (roles.length == 0) {
        break;
      }
    }
    if (roles.length > 0) {
      roles[0] = '❌ ' + roles[0];
      roles = roles.join('\n❌ ');
      const embed = new Discord.MessageEmbed();
      var user = msg.guild.members.cache.get(msg.author.id).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(msg.author.id).user.displayAvatarURL);
      embed.setColor(0xff0000);
      embed.setDescription(' **❌ You are unable to use `!' + commandName + '`, because of insufficient roles.** \n\n' + roles);
      msg.channel.send(embed);
      return;
    }
  }
  //Checks if in a race
  if (!command.usedduringrace) {
    if (userdata['raceinprogress'][2] < new Date()) {
      userdata['raceinprogress'] = [false, ['', ''], undefined, msg.author.id];
    }
    if (stats.raceinprogressstat(userdata)[0]) {
      var embed = new Discord.MessageEmbed();
      var user = msg.guild.members.cache.get(msg.author.id).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(msg.author.id).user.displayAvatarURL);

      require(gtffile.EMBED).warning('⚠️ Session In Progress', 'You are unable to use `!' + commandName + "` until you've finished your session." + '\n\n' + '**❓ If you want to exit your current session, click the ' + emote.exit + ' reaction.**', embed, msg);
      msg.channel.send(embed).then(msg => {
        function exit() {
          return require('./commands/cancel').execute(msg, ['✨✨✨'], userdata);
        }
        var emojilist = [[emote.exit, 'gtfexit', exit]];
        gtftools.createreactions(emojilist, msg, userdata);
      });
      return;
    }
  }
  //
  if (!command.usedinlobby) {
    if (stats.inlobbystat(userdata)[0]) {
      var embed = new Discord.MessageEmbed();
      var user = msg.guild.members.cache.get(msg.author.id).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(msg.author.id).user.displayAvatarURL);
      require(gtffile.EMBED).warning('⚠️ In A Lobby', 'You are unable to use `!' + commandName + '` until you have left from your current lobby.', embed, msg);
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
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      const embed = new Discord.MessageEmbed();
      var user = msg.author.username;
      embed.setAuthor(user, msg.author.displayAvatarURL());
      embed.setColor(0x800080);
      embed.setDescription('⏲ You have a cooldown of ' + timeLeft.toFixed(1) + ' seconds for `!' + command.name + '`.' + ' Please wait.');
      msg.channel.send(embed).then(msg => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  }
  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  if (!require(gtffile.EXP).checklevel(command.level, embed, msg, userdata)) {
    return;
  }

  if (command.requirecar) {
    if (require(gtffile.EMBED).checknocars(userdata)) {
      require(gtffile.EMBED).error('❌ No Car', 'You do not have a current car.', embed, msg, userdata);
      return;
    }
  }

  if (msg.guild.members.cache.get(stats.userid(userdata)).user.username == 'everyone' || msg.guild.members.cache.get(stats.userid(userdata)).user.username == 'here') {
    require(gtffile.EMBED).error('❌ Username Not Allowed', 'Your username is not allowed from this bot. Please choose another username.', embed, msg);
    return;
  }
  try {
    
    executecommand(command, args, msg, userdata)
    /*if (command.name == 'jay') {
      fs.writeFile('./users/jaythefox.json', JSON.stringify(jaythefox), function(err, result) {
        if (err) console.log('error', err);
      });
      return;
    }
    if (command.name == 'dw') {
      fs.writeFile('./users/dw.json', JSON.stringify(dw), function(err, result) {
        if (err) console.log('error', err);
      });
      return;
    }
    if (command.name == 'maker') {
      fs.writeFile('./users/customtracks.json', JSON.stringify(ctracks), function(err, result) {
        if (err) console.log('error', err);
      });
      return;
    }
    if (command.name == 'replay') {
      fs.writeFile('./users/replays.json', JSON.stringify(replays), function(err, result) {
        if (err) console.log('error', err);
      });
    }
    if (command.name == 'lobby') {
      fs.writeFile('./lobby/lobbies.json', JSON.stringify(lobbies), function(err, result) {
        if (err) console.log('error', err);
      });
    }
    fs.writeFile('./users/botconfig.json', JSON.stringify(gtfuser.gtfbotconfig), function(err, result) {
      if (err) console.log('error', err);
    });
    */


    /*  fs.writeFile('./users/races.json', JSON.stringify(gtfuser.allraces), function(err, result) {
        if (err) {
          console.log('error', err);
      });
      }*/

  } catch (error) {
    var embed = new Discord.MessageEmbed();
    require(gtffile.EMBED).error('❌ Unexpected Error', 'Oops, an unexpected error has occurred.\n' + '**' + error + '**', embed, msg, userdata);
    console.error(error);
  }
 }

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("USERS").find({"id":msg.author.id}).forEach(row => {
        if (typeof row["id"] === undefined) {
          return {}
        } else {
          userdata = row
        }
      }).then(() => {  
          stats.save(userdata)
          db.close();
         next()
      })
    })


 
});

client.login(process.env.SECRET).then(function() {
 var keys = [];
  //extra.updatecommandslist(client)
  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("USERS").find({}).forEach(row => {
        if (typeof row["id"] === undefined) {
          return
        } else {
      if (row['racedetails'] === undefined) {
        return
      }

      if (row['racedetails'].length == 0) {
        return
      }
      if (!row['raceinprogress'][0] || row['raceinprogress'][1][0] === undefined || row["raceinprogress"][1][1] === undefined) {
        return
      }
      keys.push(row);
      }
      })

    var index1 = 0
  setTimeout(function() {
    
 require(gtffile.SEASONAL).changeseasonals()
    gtftools.interval(
      function() {
        stats.resumerace(keys[index1], client);
        console.log('Good');
        index1++;
      },
      1000,
      keys.length
    )

  db.close()
  }, 5000)
    })




});

var executecommand = function(command, args, msg, userdata) {
  try {
  gtfuser.gtfbotconfig['executions']++;
    if (gtfuser.gtfbotconfig['executions'] >= 3) {
      console.log('WAITING');
      setTimeout(function() {
        command.execute(msg, args, userdata), 1000 * gtfuser.gtfbotconfig['executions'];
        gtfuser.gtfbotconfig['executions']--;
      });
    } else {
      command.execute(msg, args, userdata);
      if (gtfuser.gtfbotconfig['executions'] == 1) {
        setTimeout(() => (gtfuser.gtfbotconfig['executions'] = 0), 5000);
      }
    }

  } catch (error) {
    var embed = new Discord.MessageEmbed();
    require(gtffile.EMBED).error('❌ Unexpected Error', 'Oops, an unexpected error has occurred.\n' + '**' + error + '**', embed, msg, userdata);
    console.error(error);
  }
  }

/* setInterval(function() {
     fs.writeFile('./backups/user.txt', JSON.stringify(data), function(err, result) {
       if (err) {
         console.log('error', err);
       }
     });
     console.log('User backup saved.');
   }, 3600000);*/