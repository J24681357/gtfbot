var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "arcade",
  title: "Arcade Mode",
  cooldown: 3,
  level: 0,
  roles: [],
  channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    "!arcade - Displays the list of leagues/difficulties available.\n`Lv.XX` represents that the driver level that is required.",
    '!arcade ["mode"] - Enter a race in Arcade mode with the difficulty of [mode] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and [mode].',
  ],
  execute(msg, query, userdata) {
    try {
      /* Setup */
      const embed = new Discord.MessageEmbed();
      embed.setColor(0x0151b0);
      var user = msg.guild.members.cache.get(userdata["id"]).user.username;
      embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
      var args = "";
      var pageargs = {
        text: "",
        list: "",
        start: "",
        end: "",
        query: query,
        command: __filename.split("/").splice(-1)[0].split(".")[0],
        rows: 4,
        page: 0,
        numbers: false,
        reactions: true,
        dm: false,
        footer: "❓ **Select a league from the list above. **",
        special: "",
        other: "",
      };
      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

      var results2 = "";
      var mode = "ARCADE";

      var racemode;
      var levelselect = "";
      var ready = false;

      if (query.length == 0) {
        racemode = "Menu";
      } else {
        racemode = query[0];
        if (parseInt(racemode) == 1) {
          racemode = "beginner";
        }
        if (parseInt(racemode) == 2) {
          racemode = "amateur";
        }
        if (parseInt(racemode) == 3) {
          racemode = "pro";
        }
        if (parseInt(racemode) == 4) {
          racemode = "endurance";
        }
      }

      if (racemode == "beginner" || racemode == "b" || racemode == "sunday") {
        ready = true;
        levelselect = "beginner";
      } else if (racemode.match(/amateur/g) | racemode.match(/a/g)) {
        if (!require(gtf.EXP).checklevel(5, embed, msg, userdata)) {
          return;
        }
        ready = true;
        levelselect = "amateur";
      } else if (racemode.match(/professional/g) || racemode.match(/pro/g)) {
        if (!require(gtf.EXP).checklevel(15, embed, msg, userdata)) {
          return;
        }
        ready = true;
        levelselect = "professional";
      } else if (racemode.match(/endurance/g) || racemode.match(/endur/g)) {
        if (!require(gtf.EXP).checklevel(20, embed, msg, userdata)) {
          return;
        }
        ready = true;
        levelselect = "endurance";
      } else {
        embed.setTitle("__Arcade Mode__");
        results = "__**Beginner**__ - !arcade [beginner] " + "\n" + "__**Amateur**__ - !arcade [amateur] " + emote.exp + "`Lv.5`" + "\n" + "__**Professional**__ - !arcade [professional] " + emote.exp + "`Lv.15`" + "\n" + "__**Endurance**__ - !arcade [endurance] " + emote.exp + "`Lv.20`" + "\n" + " ";
        embed.setDescription(results);
      }
      if (!ready) {
        var list = results
          .split("\n")
          .slice(0, -1)
          .map(function (x) {
            return [x, " "];
          });
        pageargs["list"] = list;
        pageargs["text"] = gtftools.formpage(pageargs);
        gtftools.formpages(pageargs, embed, msg, userdata);
      } else {
        embed.setTitle("__Arcade Mode - Selection Menu__");

        results2 = "1️⃣" + " " + "Race" + "\n" + "~~2️⃣" + " " + "Race (My Courses)~~" + "\n" + "3️⃣" + " " + "Race (Custom Course)" + "\n\n" + "❓ **Click one of the reactions to select an option.**";

        embed.setDescription(results2);
        embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
        msg.channel.send({ embed: embed }).then(msg => {
          function selectgaragemode() {
            embed.fields = [];
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

          function selectgaragemodecoursemaker() {
            embed.fields = [];
            return selecttrack();
          }
          function selectgaragemodecoursemakerrandom() {
             embed.fields = [];
            return selectrandomtrack();
          }

          function selectgtsportmode() {
            embed.fields = [];
            var raceprep = {
              mode: mode,
              modearg: levelselect,
              carselect: "GTSPORT",
              car: {},
              trackselect: "RANDOM",
              track: {},
              racesettings: {},
              other: [],
            };
            return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
          }

          var emojilist = [
            ["1️⃣", "1️⃣", selectgaragemode],
            ["2️⃣", "2️⃣", selectgaragemodecoursemaker],
            ["3️⃣","3️⃣", selectgaragemodecoursemakerrandom]
          ];

          gtftools.createreactions(emojilist, msg, userdata);

          function selecttrack() {
            var coursestats = [];

            var MongoClient = require("mongodb").MongoClient;
            var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF";

            MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
              if (err) throw err;
              var dbo = db.db("GTFitness");
              dbo
                .collection("CUSTOMCOURSES")
                .find({ id: userdata["id"] })
                .forEach(row => {
                  coursestats = row["courses"];
                })
                .then(() => {
                  selectcourse();
                });
            });

            function selectcourse() {
              if (Object.keys(coursestats).length == 0) {
                require(gtf.EMBED).alert({ name: "❌ No Courses", description: "You have no courses saved." + "\n\n" + "Select another option when this message disappears.", embed: "", seconds: 3 }, msg, userdata);
              }
              info = "";

              var emojilist = [];
              var tracks = Object.keys(coursestats).map(function (id) {
                return coursestats[id];
              });

              var results = tracks.map(t => t["name"]).join("\n") + "\n\n" + "**❓ Select your track from the reactions below.**";
              embed.setDescription(results);
              msg.channel.send(embed).then(msg => {
                var numberlist = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];

                function func(index) {
                  var track = tracks[index];
                  var raceprep = {
                    mode: mode,
                    modearg: levelselect,
                    carselect: "GARAGE",
                    car: stats.currentcar(userdata),
                    trackselect: "SELECT",
                    track: track,
                    racesettings: {},
                    other: [],
                  };
                  return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
                }
                for (var index = 0; index < tracks.length; index++) {
                  emojilist.push([numberlist[index], numberlist[index], func, index]);
                }
                gtftools.createreactions(emojilist, msg, userdata);
              });
            }
          }

          function selectrandomtrack() {
            var t = require(gtf.COURSEMAKER).trackparams({
          min: 40,
          max: 80,
          minSegmentLength: 2,
          maxSegmentLength: 10,
          curviness: 0.3,
          maxAngle: 120,
          type: "Circuit",
        });
        var track = require(gtf.COURSEMAKER).drawtrack(t)
               
        track["name"] = "Generic Track";
        track["type"] = "Course Maker";
        track["options"] = ["Drift"];
        track["author"] = "ARCADE";
                var raceprep = {
                    mode: mode,
                    modearg: levelselect,
                    carselect: "GARAGE",
                    car: stats.currentcar(userdata),
                    trackselect: "SELECT",
                    track: track,
                    racesettings: {},
                    other: [],
                  };
              return require(gtf.RACE).raceprep(raceprep, embed, msg, userdata);
                 
          }

        });
      }
    } catch (error) {
      throw error;
    }
  } /// execute
};
