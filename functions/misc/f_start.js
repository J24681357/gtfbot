var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");
var gtfperf = require("../../functions/marketplace/f_perf");
var parts = require("../../functions/marketplace/f_parts");
var exp = require("../../profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
////////////////////////////////////////////////////
var gtffile = process.env
var gtfuser = require("../../index");


module.exports.intro = function(userdata, command, msg) {
  if ((command === 'jay' || command === 'dw' || command === 'dw4' || command === 'gtf' || command == 'srating')) {
    userdata = {
      id: msg.author.id
      }
    return "COMMAND"
  }

  if (userdata !== undefined || userdata.size != 0) {
    if (userdata["t"] == "Complete") {
      return "SUCCESS"
    } else {
      return doit()
    }

  } else {
    return doit()
  }

  function doit() {

    userdata = {

      id: msg.author.id,
      raceinprogress: [false, ['', ''], 0],
      racedetails: [],
      careerraces: [],
      inlobby: [false, ''],
      dailyworkout: false,

      credits: 15000,
      exp: 0,
      level: 1,
      mileage: [0, 0],
      totalmileage: [0, 0],

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

      settings: {
        'RACE DM': 0,
        'MILEAGE': 0,
        'TIME OFFSET': 0,
        'PROGRESSBAR': ['⬜', '⬛'],
        'COMPACTMODE': 'Off',
        'HOMELAYOUT': 0,
        'HOMECOLOR': 0,
      }
    }
    //version: gtfuser.gtfbotconfig['version'],
    var embed = new Discord.MessageEmbed()
    var user = msg.author.username
    var avatar = msg.author.displayAvatarURL()
    embed.setColor(0x800080);
    embed.setAuthor(user, avatar);

    embed.setTitle('⚠ __**' + 'Before You Start' + '**__ ⚠');
    embed.setThumbnail(msg.guild.members.cache.get(gtffile.USERID).user.displayAvatarURL);
    embed.setDescription(
      'Welcome to the world of GT Fitness!\nYou may start on your career and find other cool features by using **!home**.\n**!home** will be your main menu if you are ever stuck on what to do.\nYou can find the GTF settings at anytime by using **!settings**.\n\n**❓ Confused with any commands? You can use __!gtfhelp ["command"]__ to find arguments with more information.**\n\n⚠ Click the ' +
      emote.yes +
      ' emote to continue.'
    );
    msg.channel.send(embed).then(msg => {
      function start() {
        userdata['t'] = 'Complete';

        let MongoClient = require('mongodb').MongoClient;
        var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

        MongoClient.connect(url, { useUnifiedTopology: true },
          function(err, db) {
            if (err) throw err;
            var dbo = db.db("GTFitness");
            var users = dbo.collection("USERS")
            users.insertOne(userdata, (err, result) => {
            })
          })
        msg.delete({ timeout: 5000 });
        embed.setTitle('__**Setup Complete**__');
        embed.setColor(0x216c2a);
        embed.setDescription('**✅ Join The Fitness Race!**');
        msg.edit(embed);
        require("../../commands/update").execute(msg, [""], userdata)
      }
      var emojilist = [[emote.yes, 'Yes', start]];
      gtftools.createreactions(emojilist, msg, userdata);
    });

    return;
  }
}