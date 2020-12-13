var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "dw4",
  title: "GT Sport Daily Workout (4 Cars)",
  cooldown: 300,
  level: 3,
  channels: ["gtf-mode", "testing", "gtf-test-mode"],

  delete: true,
  requirecar: false,
  availinmaint:false,
   requireuserdata:true,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!dw4 - Selects a random car from the GT Sport car list.\nThis uses the same format as the GTF Daily Workout."],
  execute(msg, query,userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x8b0000);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "`Cooldown: 5 minutes`"
    var page = 0
    var results = ''
    var info = ''

    /* Setup */
    /*if (!exp.checklevel(3, embed, msg)) {
        return
    }*/
    var results = " ";

    /* Setup */
    embed.setTitle(emote.gtlogowhite + " __GTF Daily Workout (4 Cars)__");
    
  var prizes = [];
  for (var index = 0; index < 4; index++) {
    prizes.unshift(require(gtffile.GTSCARS).RandomGTSCar().name)
    }
  var select = [[emote.rightarrow + " ",emote.transparent + " ",emote.transparent + " ", emote.transparent + " "], [emote.transparent + " ", emote.rightarrow + " ",emote.transparent + " ",emote.transparent + " "], [emote.transparent + " ",emote.transparent + " ", emote.rightarrow + " ",emote.transparent + " "], [emote.transparent + " ",emote.transparent + " ",emote.transparent + " ", emote.rightarrow + " "]]
    results = "**" + user + "\nGT Sport Daily Workout Car**";
    embed.setDescription(results)
    msg.channel.send(embed).then(msg => {
    var index = 0
    var results1 = function(index) {
      return select[index][0] + "||" + prizes[0] + "||" + "\n" +
      select[index][1] + "||" + prizes[1] + "||" + "\n" +
      select[index][2] + "||" + prizes[2] + "||" + "\n" +
      select[index][3] + "||" + prizes[3] + "||"
    }

    gtftools.interval(function() {
    index = Math.floor(Math.random() * select.length)
    var final = results1(index)
    embed.setDescription(final)
    msg.edit(embed)
    }, 2000, 4)

    gtftools.interval(function() {

    results = results1(index) + "\n\n" +
    "🎊 __**Daily Workout Car**__ 🎊" + "\n" + prizes[index]
    embed.setDescription(results + "\n\n" + "`Cooldown: 5 minutes`")
    msg.edit(embed)}, 9000, 1)

    })
  }
};
