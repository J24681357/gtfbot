var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('../index');

module.exports = {
  name: 'ssrx',
  title: 'Special Stage Route X - 10000m Top Speed Run',
  cooldown: 3,
   level:8,
    channels: ["gtf-mode", "testing", "gtf-test-mode"],

  delete: true,
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
    var args = '\n' + '`Args: !ssrx`' + '\n';
    var page = 0
    var results = ''
    var info = "❓ **For each setting, select an item (or number) corresponding from a setting's list.**"

    /* Setup */

    var results2 = '';
    var mode = 'SSRX';
    var carmode = 'GARAGE';

    var ready = false;
    if (query.length == 0) {
      query = 'Menu';
    }

    var car = stats.currentcar(userdata);
     var ocar = require(gtffile.CARS).find({"make":[car["make"]], "fullname":[car["name"]],"year":[car["year"]]})[0]
    var ready = true;
    if (ocar["type"] == "Production") {
    require(gtffile.RACE).preparerace(mode, '', carmode, "", args, embed, msg, userdata);
    } else {
       require(gtffile.EMBED).error("❌ Production Cars Only", "Production cars are only allowed for this event.", embed, msg, userdata)
      return
    }
  },
};