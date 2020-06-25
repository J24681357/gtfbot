var gtf = require('/app/functions/f_gtf');
var race = require('/app/functions/races/f_races');
var car = require('/app/data/gtfcarlist');
var stats = require('/app/functions/profile/f_stats');
var gtftools = require('/app/functions/misc/f_tools');
var gtfperf = require('/app/functions/marketplace/f_perf');
var parts = require('/app/functions/marketplace/f_parts');
var exp = require('/app/profile/expprofile');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfraces = require('/app/functions/races/f_currentraces');
var gtfuser = require('/app/index');
var extra = require("/app/functions/misc/f_extras");
var emote = require('/app/index');
var fs = require('fs');

const prefix = '!';
var points = JSON.parse(fs.readFileSync('./users/user.json', 'utf8'));
module.exports.gtfuserdata = points;
var replays = JSON.parse(fs.readFileSync('./users/replays.json', 'utf8'));
module.exports.allreplays = replays;
var jaythefox = JSON.parse(fs.readFileSync('./users/jaythefox.json', 'utf8'));
module.exports.memory = jaythefox;
var lobbies = JSON.parse(fs.readFileSync('./lobby/lobbies.json', 'utf8'));
module.exports.lobby = lobbies;
var dw = JSON.parse(fs.readFileSync('./users/dw.json', 'utf8'));
module.exports.dwcar = dw;
var gtfbot = JSON.parse(fs.readFileSync('./users/botconfig.json', 'utf8'));
module.exports.gtfbotconfig = gtfbot;
var ctracks = JSON.parse(fs.readFileSync('./users/customtracks.json', 'utf8'));
module.exports.customtracks = ctracks;
client.commands = new Discord.Collection();
var date = new Date();

// Server Settings
var executions = 0;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
client.on('ready', () => {
  if (!gtfbot) {
    gtfbot = {
      maintenance: false,
      CAREMOTE: '',
      errors: [],
      executions: 0,
      version: 4,
    };
  }

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

  module.exports.jaythefox = client.emojis.cache.get('561743692059246592').toString();
  module.exports.gtlogowhite = client.emojis.cache.get('682139679919046667').toString();
  module.exports.gtlogoblue = client.emojis.cache.get('485339455339888640').toString();

  module.exports.gt6progressbar = client.emojis.cache.get('713512070213140542').toString();
  module.exports.gt6progressbarblack = client.emojis.cache.get('713512070477512786').toString();
  var emote = require('/app/index');

  const http = require('http');
  const express = require('express');
  const app = express();
  app.get('/', (request, response) => {
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    console.log("Port")
  }, 240000);

  if (gtfuser.gtfbotconfig['maintenance']) {
    client.user.setActivity('Commands are not available at the moment.', {
      type: 'PLAYING',
    });
    client.guilds.cache
      .get('239493425131552778')
      .members.cache.get(gtffile.USERID)
      .setNickname('🛠 Maintenance');
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

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var author = msg.author.id;
  var member = msg.guild.members.cache.get(author);

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (member.roles.cache.some(role => role.name === 'Muted')) {
    msg.delete({ timeout: 0 });
  }

  // Profile
  if (!points[author]) {
    points[author] = {
      id: author,
      raceinprogress: [false, ['', ''], 0],
      racedetails: [],
      careerraces: [],
      inlobby: [false, ''],
      dailyworkout: false,

      credits: 15000,
      exp: 0,
      level: 1,
      mileage: [0, 0],

      garage: [],
      numcarpurchase: 0,
      numgiftearned: 0,
      currentcar: 0,

      items: [],
      gifts: [],
      messages: [],
      count: 0,
      achievements: [],
      t: 'N/A',
      lastonline: 'START',
      version: gtfuser.gtfbotconfig['version'],
      gtsprofileid: '',
      settings: {
        'RACE DM': 0,
        'MILEAGE': 0,
        'TIME OFFSET': 0,
        'PROGRESSBAR': ['⬜', '⬛'],
        'COMPACTMODE': 'Off',
        'HOMELAYOUT': 0,
        'HOMECOLOR': 0,
      },
    };
  }

  if (!replays[author]) {
    replays[author] = {
      id: author,
      replayid: 0,
      replays: [],
    };
  }

  if (points[author]['credits'] == 0 && points[author]['exp'] == 0 && points[author]['garage'].length == 0) {
    stats.addcredits(15000, author);
  }
  var currdate = gtftools.getFormattedDate(date, author);

  if (points[author]['lastonline'] != currdate) {
    points[author]['dailyworkout'] = false;
    stats.setmileage(0, 0, author);
  }
  points[author]['lastonline'] = currdate;
  /////////

  const args = msg.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  // Deleting messages
  if (command.delete) {
    msg.delete({ timeout: 0 });
  }
  // Update
  if (gtfuser.gtfbotconfig['maintenance']) {
    if (author != '237450759233339393') {
      var embed = new Discord.MessageEmbed();
      var user = msg.author.username;
      embed.setAuthor(user, msg.author.displayAvatarURL);
      embed.setColor(0x800080);
      embed.addField('⚠️ Maintenance', 'This bot is currently in maintenance. Come back later!');
      msg.channel.send(embed);
      return;
    }
  }
  if (command.name != 'update') {
    if (points[author]['version'] === undefined || points[author]['version'] < gtfuser.gtfbotconfig['version']) {
      require(gtffile.EMBED).error('❌ Version Incompatible', 'Your save data needs to be updated in order to use current features. Use **!update** to update your save to the latest version.', embed, msg, author);
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
      var user = msg.guild.members.cache.get(author).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(author).user.displayAvatarURL);
      embed.setColor(0xff0000);
      embed.setDescription(' **❌ You are unable to use `!' + commandName + '`, because of insufficient roles.** \n\n' + roles);
      msg.channel.send(embed);
      return;
    }
  }
  //

  //Checks if in a race

  if (!command.usedduringrace) {
    if (gtfuser.gtfuserdata[author]['raceinprogress'][2] < new Date()) {
      gtfuser.gtfuserdata[author]['raceinprogress'] = [false, ['', ''], undefined, author];
    }
    if (stats.raceinprogressstat(author)[0]) {
      var embed = new Discord.MessageEmbed();
      var user = msg.guild.members.cache.get(author).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(author).user.displayAvatarURL);

      require(gtffile.EMBED).warning('⚠️ Session In Progress', 'You are unable to use `!' + commandName + "` until you've finished your session." + '\n\n' + '**❓ If you want to exit your current session, click the ' + emote.exit + ' reaction.**', embed, msg);
      msg.channel.send(embed).then(msg => {
        function exit() {
          return require('/app/commands/cancel').execute(msg, ['✨✨✨'], author);
        }
        var emojilist = [[emote.exit, 'gtfexit', exit]];
        gtftools.createreactions(emojilist, msg, author);
      });
      return;
    }
  }
  //
  if (!command.usedinlobby) {
    if (stats.inlobbystat(author)[0]) {
      var embed = new Discord.MessageEmbed();
      var user = msg.guild.members.cache.get(author).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(author).user.displayAvatarURL);
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

  if (timestamps.has(author)) {
    const expirationTime = timestamps.get(author) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      const embed = new Discord.MessageEmbed();
      var user = msg.author.username;
      embed.setAuthor(user, msg.author.displayAvatarURL);
      embed.setColor(0x800080);
      embed.setDescription('⏲ You have a cooldown of ' + timeLeft.toFixed(1) + ' seconds for `!' + command.name + '`.' + ' Please wait.');
      msg.channel.send(embed).then(msg => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  }
  timestamps.set(author, now);
  setTimeout(() => timestamps.delete(author), cooldownAmount);
  
  if (!exp.checklevel(command.level, embed, msg, author)) {
      return;
  }
  
  if (command.requirecar) {
  if (require(gtffile.EMBED).checknocars(author)) {
      require(gtffile.EMBED).error('❌ No Car', 'You do not have a current car.', embed, msg, author);
      return;
    }
  }
  
  if (msg.guild.members.cache.get(stats.userid(author)).user.username == 'everyone' || msg.guild.members.cache.get(stats.userid(author)).user.username == 'here') {
    require(gtffile.EMBED).error('❌ Username Not Allowed', 'Your username is not allowed from this bot. Please choose another username.', embed, msg);
    return;
  }
  
  if (!(command.name === 'jay' || command.name === 'dw' || command.name === 'dw4' || command.name === 'gtf')) {
    if (points[author]['t'] == 'N/A') {
      var embed = new Discord.MessageEmbed();
      var user = msg.author.username;
      var userid = author;
      embed.setColor(0x800080);
      embed.setAuthor(user, msg.author.displayAvatarURL);
      embed.setTitle('⚠ __**' + 'Before You Start' + '**__ ⚠');
      embed.setThumbnail(msg.guild.members.cache.get(gtffile.USERID).user.displayAvatarURL);
      embed.setDescription(
        'Welcome to the world of GT Fitness!\nYou may start on your career and find other cool features by using **!home**.\n**!home** will be your main menu if you are ever stuck on what to do.\nYou can find the GTF settings at anytime by using **!settings**.\n\n**❓ Confused with any commands? You can use __!gtfhelp ["command"]__ to find arguments with more information.**\n\n⚠ Click the ' +
          emote.yes +
          ' emote to continue.'
      );
      msg.channel.send(embed).then(msg => {
        function start() {
          points[userid]['t'] = 'Complete';
          msg.delete({ timeout: 5000 });
          embed.setTitle('__**Setup Complete**__');
          embed.setColor(0x216c2a);
          embed.setDescription('**✅ Join The Fitness Race!**');
          msg.edit(embed);
          require("/app/commands/update").execute(msg, [""] , author)
        }
        var emojilist = [[emote.yes, 'Yes', start]];
        gtftools.createreactions(emojilist, msg, userid);
      });

      return;
    }
  }

  try {
    gtfuser.gtfbotconfig['executions']++;
    if (gtfuser.gtfbotconfig['executions'] >= 3) {
      console.log('WAITING');
      setTimeout(function() {
        command.execute(msg, args, author), 1000 * gtfuser.gtfbotconfig['executions'];
        gtfuser.gtfbotconfig['executions']--;
      });
    } else {
      command.execute(msg, args, author);
      if (gtfuser.gtfbotconfig['executions'] == 1) {
        setTimeout(() => (gtfuser.gtfbotconfig['executions'] = 0), 5000);
      }
    }

    if (command.name == 'jay') {
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
    fs.writeFile('/app/users/botconfig.json', JSON.stringify(gtfuser.gtfbotconfig), function(err, result) {
      if (err) console.log('error', err);
    });
    fs.writeFile('./users/user.json', JSON.stringify(gtfuser.gtfuserdata), function(err, result) {
      if (err) {
        console.log('error', err);
        console.log('E');
      } else {
        console.log('User data saved.');
      }
    });

    fs.writeFile('./users/races.json', JSON.stringify(gtfuser.allraces), function(err, result) {
      if (err) {
        console.log('error', err);
      }
    });
  } catch (error) {
    var embed = new Discord.MessageEmbed();
    require(gtffile.EMBED).error('❌ Unexpected Error', 'Oops, an unexpected error has occurred.\n' + '**' + error + '**', embed, msg, author);
    console.error(error);
  }
});

client.login(process.env.SECRET).then(function() {
  setTimeout(function() {
    
    //extra.updatecommandslist(client)
    var index1 = 0;
    var userkeys = Object.keys(points);
    var keys = [];
    for (var i = 0; i < userkeys.length; i++) {
      if (gtfuser.gtfuserdata[userkeys[i]]['racedetails'] === undefined) {
        continue;
      }
      if (gtfuser.gtfuserdata[userkeys[i]]['racedetails'].length == 0) {
        continue;
      }
      if (!gtfuser.gtfuserdata[userkeys[i]]['raceinprogress'][0] || gtfuser.gtfuserdata[userkeys[i]]['raceinprogress'][1][0] === undefined || gtfuser.gtfuserdata[userkeys[i]]['raceinprogress'][1][1] === undefined) {
        continue;
      }
      keys.push(userkeys[i]);
    }

    gtftools.interval(
      function() {
        stats.resumerace(keys[index1], client);
        console.log('Good');
        index1++;
      },
      1000,
      keys.length
    );

    var server = client.guilds.cache.get('239493425131552778');

    setInterval(function() {
      fs.writeFile('./backups/user.txt', JSON.stringify(gtfuser.gtfuserdata), function(err, result) {
        if (err) {
          console.log('error', err);
        }
      });
      console.log('User backup saved.');
    }, 3600000);
  }, 5000);
});
