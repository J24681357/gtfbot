var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "drift",
  title: "Drift Trial",
  cooldown: 3,
  level: 5,
  channels: ["testing", "gtf-demo"],

  delete: false,
  availitoeveryone: true,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    "!drift - Displays the list of difficulties available.\n`Lv.XX` represents that the driver level that is required.",
    '!drift ["mode"] - Enter a Drift Trial with the difficulty of ["mode"] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and ["mode"].\nA `LOANER CAR` is used.',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "";
    var results = "";
    var pageargs = {
      text: "",
      list: "",
      start: "",
      end: "",
      query: query,
      command: __filename.split("/").splice(-1)[0].split(".")[0],
      rows: 10,
      page: 0,
      numbers: false,
      reactions: true,
      dm: false,
      footer: "**❓ Select a drift mode from the list above.**",
      special: "",
      other: "",
    };
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    var results2 = "";
    var mode = "DRIFT";

    var racemode;
    var racedetails = "";
    var levelselect = "";
    var ready = false;

    if (query.length == 0) {
      racemode = "Menu";
    } else {
      racemode = query[0];
    }

    if (parseInt(query[0]) == 1) {
      racemode = "B";
    }
    if (parseInt(query[0]) == 2) {
      racemode = "Pro";
    }
    if (query.includes("-")) {
      query = query[0].split("-");
    }

    if (racemode == "beginner" || racemode == "b" || racemode == "B") {
      ready = true;
      if (!require(gtf.EXP).checklevel(5, embed, msg, userdata)) {
        return;
      }
      levelselect = "driftbeginner";
    } else if (racemode == "professional" || racemode == "pro" || racemode == "Pro") {
      ready = true;
      if (!require(gtf.EXP).checklevel(15, embed, msg, userdata)) {
        return;
      }
      levelselect = "driftprofessional";
    } else {
      embed.setTitle("__Drift Trial__");
      results = "__**Drift Trial (Beginner)**__ - !drift [beginner] " + emote.exp + "`Lv.5`" + "\n" + "__**Drift Trial (Professional)**__ - !drift [pro] " + emote.exp + "`Lv.15`" + "\n" + " ";
      embed.setDescription(results + "\n\n" + racedetails);
    }
    if (!ready) {
      var list = results
        .split("\n")
        .slice(0, -1)
        .map(function (x) {
          return [x, " "];
        });
      pageargs["list"] = list;
      pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
      gtftools.formpages(pageargs, embed, msg, userdata);
    } else {
      embed.setTitle("__Drift Trial - Car Selection__");
      var gtfcar = stats.currentcar(userdata);

      results2 = "🚘" + " " + gtfcar["name"] + "\n" + emote.gtlogowhite + " " + "~~GT Sport Loaner Car~~" + "\n\n" + "❓ **Click one of the reactions to select a car.**";

      embed.setDescription(results2);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
        function selectgaragemode() {
          embed.fields = [];

          var ocar = require(gtf.CARS).find({ make: [gtfcar["make"]], fullname: [gtfcar["name"]], year: [gtfcar["year"]] })[0];

          if (ocar["drivetrain"] == "FF") {
            require(gtf.EMBED).alert({ name: "❌ FF Cars Prohibited", description: "Front Wheel Drive cars are not allowed in a Drift Trial.", embed: "", seconds: 0 }, msg, userdata);
            return;
          }
          var raceprep = {
            mode: mode,
            modearg: levelselect,
            carselect: "GARAGE",
            car: stats.currentcar(userdata),
            trackselect: "RANDOM",
            track: {},
            racesettings: {},
            other: [],
          };
          return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
        }

        function selectgtsportmode() {
          embed.fields = [];
          var raceprep = {
            mode: mode,
            modearg: levelselect,
            carselect: "GTSPORT",
            car: stats.currentcar(userdata),
            trackselect: "RANDOM",
            track: {},
            racesettings: {},
            other: [],
          };
          return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
        }

        var emojilist = [
          ["🚘", "🚘", selectgaragemode],
          [emote.gtlogowhite, "gtlogowhite", selectgtsportmode],
        ];

        gtftools.createreactions(emojilist, msg, userdata);
      });
    }
  },
};
