var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = require('../files/directories');
////////////////////////////////////////////////////
var gtfuser = require('../index');

module.exports = {
  name: 'ssrx',
  title: 'Special Stage Route X - 10000m Top Speed Run',
  cooldown: 3,
   level:8,
    channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint:false,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ['!ssrx - Start a 10000m Top Speed Run with your current car.'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '';
    var results = ''
    var info = "❓ **For each setting, select an item (or number) corresponding from a setting's list.**"
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      // 


    var results2 = '';
    var mode = 'SSRX';
    var carmode = 'GARAGE';
    var levelselect = 10000

    var ready = false;
    if (query.length == 0) {
      query = 'Menu';
    }

    var car = stats.currentcar(userdata);
     var ocar = require(gtf.CARS).find({"make":[car["make"]], "fullname":[car["name"]],"year":[car["year"]]})[0]
     console.log(ocar)
    var ready = true;
    if (ocar["type"] == "Production") {
      
        var raceprep = {
            "mode": mode,
            "modearg": levelselect,
            "carselect": 'GARAGE',
            "car": stats.currentcar(userdata),
            "trackselect": "SELECT",
            "track": require(gtf.TRACKS).find({"name":["Special Stage Route X"]})[0],
            "other": []
          }
          raceprep["track"]["length"] = 10
          return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
    } else {
      	require(gtf.EMBED).alert({name:'❌ Production Cars Only', description:'Production cars are only allowed for this event.',embed:"", seconds:0}, msg, userdata);
      return
    }
  },
};