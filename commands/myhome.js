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

module.exports = {
  name: "myhome",
  title: "My GTF Home",
  cooldown: 5,
  level:0,
  delete: true,
  aliases: ["home"],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!home - Displays the main menu of GTF.", "!home 2 - Selects the Miscellaneous setting from the main menu."],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = ""

    /* Setup */

    var results = "";
    var main = stats.main(msgauthorid)
    var main2 = args + stats.currentcarmain(msgauthorid)
    var showcasenumber = 0
    var count = stats.count(msgauthorid)

    embed.setTitle("__My Home__");
    embed.setThumbnail(msg.guild.members.cache.get(gtffile.USERID).user.displayAvatarURL())
    embed.setFooter("Welcome to GT Fitness! React to one of the emotes associated with the list above to select an option.")

    if (parseInt(query[0]) == 2) {
      results = "__**🚘 Daily Workout**__ - !daily" + "\n" + 
        "__**❔ GT Fitness Facts**__ - !gtf" + "\n\n" +
         "__**GTS Decal Search**__ - !decal"
  

    embed.setDescription(results);
    embed.addField(main, main2);
  
    msg.channel.send(embed).then(msg => {
      function daily() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        require("/home/runner/gtfbot/commands/daily").execute(msg, '', msgauthorid) 
    }
      function gtf() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        require("/home/runner/gtfbot/commands/gtf").execute(msg, '', msgauthorid) 
    }
      var emojilist = [['🚘','🚘', daily], ['❔', "❔", gtf]]
      
      gtftools.createreactions(emojilist, msg, msgauthorid) 
      
    })
    } else {
      var aspec = "__**🏁Career Mode**__\n!career" + "\n" +
              "__**🅰Arcade Mode**__\n!arcade" + "\n" + 
          "__**🇩Drift Trial**__\n!drift" + "\n"
      "__**🇸Top Speed Run**__\n!ssrx"
      var places = "__**🛒GTF Car Dealerships**__\n!car" + "\n" +
      "__**🛠GTF Auto - Tuning**__\n!tune" + "\n" + 
      "__**🎨GTF Auto - Paints**__\n!paint"
      var myhome = "__**🚘Garage**__\n!garage" + "\n" +
              "__**👤Profile**__\n!profile" + "\n" + 
              "__**🎞Replay Theater**__\n!replay" + "\n" +
      "__**⚙Settings**__\n!settings"
      var other = "__**🇱GTF Experience Levels**__\n!levels" + "\n" + "__**🌀Miscellaneous**__\n!home 2";
      embed.addField("A-Spec", aspec, true)
      embed.addField("Places", places, true)
      
      embed.addField("My Home", myhome, true)
      
      embed.addField("Others", other, true)

      embed.setDescription(results);
      embed.addField(main, main2);
    
    msg.channel.send(embed).then(msg => {
      function career() {
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/career").execute(msg, '', msgauthorid)
      }
      function arcade() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/arcade").execute(msg, '', msgauthorid)
      }
      function drift() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/drift").execute(msg, '', msgauthorid)
      }
      function ssrx() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/ssrx").execute(msg, '', msgauthorid)
      }
      function gtfdealership() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/car").execute(msg, '', msgauthorid)
      }
      function gtftuning() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/tune").execute(msg, '', msgauthorid)
      }
      function gtfpaints() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/paint").execute(msg, '', msgauthorid)
      }
      function garage() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/garage").execute(msg, '', msgauthorid)
      }
      function profile() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/profile").execute(msg, '', msgauthorid)
      }
      function replay() { 
        msg.delete({timeout:0})
        showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/replay").execute(msg, '', msgauthorid)
      }
      function levels() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/levels").execute(msg, '', msgauthorid)
      }
      function settings() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/settings").execute(msg, '', msgauthorid)
      }
      function misc() { 
        msg.delete({timeout:0})
        var showcasenumber = -1
        clearInterval(s)
        require("/home/runner/gtfbot/commands/myhome").execute(msg, ['2'], msgauthorid) 
      }
      var emojilist = [['🏁','🏁', career, "Once"], ['🅰','🅰', arcade], ['🇩','🇩', drift], ['🇸','🇸', ssrx], ['🛒','🛒', gtfdealership], ['🛠','🛠', gtftuning],  ['🎨','🎨', gtfpaints], ['🚘','🚘', garage], ['👤','👤', profile], ["🎞", "🎞", replay], ["⚙", "⚙", settings], ["🇱", "🇱", levels], ["🌀", "🌀", misc]]
    
      gtftools.createreactions(emojilist, msg, msgauthorid) 
      
      var s = setInterval(function() {
      
      showcasenumber++
      if (showcasenumber == -1 || stats.count(msgauthorid) != count) {
          clearInterval(s)
          msg.delete({timeout:0})
          return
      } 
      if (showcasenumber % 3 == 0 && showcasenumber != 0) {       
          embed.setTitle("__My Home__");
          embed.addField("A-Spec", "__**🏁Career Mode**__\n!career" + "\n" +
              "__**🅰Arcade Mode**__\n!arcade" + "\n" + 
      "__**🇸Top Speed Run**__\n!ssrx", true)
      
      embed.addField("Places", "__**🛒GTF Car Dealerships**__\n!car" + "\n" +
      "__**🛠GTF Auto - Tuning**__\n!tune" + "\n" + 
      "__**🎨GTF Auto - Paints**__\n!paint", true)
      
      embed.addField("My Home", "__**🚘Garage**__\n!garage" + "\n" +
              "__**👤Profile**__\n!profile" + "\n" + 
              "__**🎞Replay Theater**__\n!replay" + "\n" +
      "__**⚙Settings**__\n!settings", true)
      
        embed.addField("Others", "__**🇱GTF Experience Levels**__\n!levels" + "\n" + "__**🌀Miscellaneous**__\n!home 2", true)
        embed.addField(main, main2);
          embed.image = []
          embed.description = ""
          msg.edit(embed)

          return
      }
         
        var car = require(gtffile.CARS).randomcars(["Any"], [""], 1)
        var carname = car[0][0]
        var image = car[0][2]
        var make = car[0][3].replace(" ", "-")
        var numberid = car[0][4]
        embed.setTitle(carname)

        embed.setDescription("Purchase this car using **!car " + make + " " + numberid + "**.")
        embed.setImage(image)
        embed.fields = []
        msg.edit(embed)
        return
      }, 30 * 1000)
    });
    return
  }
  }
};
