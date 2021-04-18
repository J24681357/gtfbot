var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'daily',
  title: 'GTF Daily Workout',
  cooldown: 5,
  level: 4,
  description: ['!daily - Earns a random prize between credits and cars.\nYou need to drive 26.2mi/42.1km in a span of 24 hours in order to use this command.\nYou can set your time zone in the settings.'],
  channels: ["testing"],
  
  delete: false,
  availinmaint:false,
   requireuserdata:true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());  
    var args = " "
    var page = 0
    var results = " "
    var info = " "    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    embed.setTitle('__GTF Daily Workout - Prize__');

    var prizes = [];

    if (userdata["dailyworkout"]) {
      require(gtf.EMBED).error('❌ Daily Workout Completed', 'You have already earned your daily workout for the day.', embed, msg, userdata);
      return;
    }

    require(gtf.EMBED).checkgarageerror(embed, msg, userdata);

    if (parseFloat(stats.mileage('KM', false, userdata)) < 42.1 && parseFloat(stats.mileage('MI', false, userdata)) < 26.2) {
      require(gtf.EMBED).error('❌ Invalid Daily Workout', 'You are unable to earn your daily workout car because you have not drove 26.2mi/42.1km.', embed, msg, userdata);
      return;
    }
    userdata["dailyworkout"] = true

    results = '**You have earned a prize.**';
    
      prizes.push(["CREDITS", {"id": -1,"name": "5,000" + emote.credits + " Prize",
    "item": 5000,
    "author":"DAILY WORKOUT",
    "isgift":false}])
    prizes.push(["CREDITS", {"id": -1,"name":"10,000" + emote.credits + " Prize",
    "item": 10000,
    "author":"DAILY WORKOUT",
    "isgift":false}])
    prizes.push(["CREDITS", {"id": -1,"name":"20,000" + emote.credits + " Prize",
    "item": 20000,
    "author":"DAILY WORKOUT",
    "isgift":false}])

     var car = require(gtf.CARS).random({}, 1)[0]
      prizes.push(["CAR", {"id": -1,"name":car["name"] + " " + car["year"],
    "item": car,
    "author":"DAILY WORKOUT",
    "isgift":false}])

    require(gtf.MARKETPLACE).fourgifts('GTF Daily Workout', results, prizes, embed, msg, userdata);

  },
};
