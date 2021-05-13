var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "tune",
  title: "📦 GTF Auto - Tuning Shop",
  cooldown: 3,
  level: 0,
  channels: ["gtf-demo", "testing", "gtf-test-mode"],

  delete: false,
  availinmaint: false,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    "!tune - Displays the list of types of performance parts in GTF Auto.",
    '!tune ["type"] - Displays a list of ["type"] in GTF Auto.',
    '!tune ["type"] [(number)] - Purchases a performance part from the [(number)] associated from the list of ["type"] parts.\nThis applies to your current car.\nThe current ["type"] part on your current car will be sold and replaced, but you must purchase the part with its full price first.',
    '!tune ["type"] [stock] - Revert the ["type"] installed to your car to Stock.',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "";
    var page = 0;
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
      numbers: true,
      reactions: true,
      dm: false,
      footer: "❓ **Select a part type corresponding with the name (or number) of the part type above.**",
      special: "",
      other: "",
    };
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    /* Setup */
    var results2 = "";
    var select = "";
    var car = stats.currentcar(userdata);
    var title = "📦 GTF Auto - Tuning Shop";
    embed.setTitle("__" + title + "__");

    var selectedtype = false;

    if (query.length == 0) {
      var partscount = {"Engine":0, "Transmission":0, "Suspension":0, "Tires":0, "Weight Reduction":0, "Turbo":0, "Aero Kits":0}
      var keys = Object.keys(partscount)
      for (var x = 0; x < keys.length; x++) {
        var type = keys[x]
        var select = require(gtf.PARTS).find({ type: type });
        for (var y = 0; y < select.length; y++) {
         var part = select[y]
          var cond = require(gtf.PARTS).checkpartsavail(part, car);
          console.log(cond)
          if (cond != "❌") {
            partscount[type]++
          }
      }
      }
      results =
        "__**Engine**__ " + "`🔧" + partscount["Engine"] + "`" +
        "\n" +
        "__**Transmission**__ " + "`🔧" + partscount["Transmission"] + "`" +
        "\n" +
        "__**Suspension**__ " + "`🔧" + partscount["Suspension"] + "`" +
        "\n" +
        "__**Tires**__ "  + "`🔧" + partscount["Tires"] + "`" +
        "\n" +
        "__**Weight Reduction**__ " + "`🔧" + partscount['Weight Reduction'] + "`" +
         "\n" +
        "__**Turbo Kits**__ " + "`🔧" + partscount['Turbo'] + "`" + "\n" +
        "__**Aero Kits**__ " + "`🔧" + partscount['Aero Kits'] + "`"
      var list = results.split("\n").map(function (x) {
        return [x, " "];
      });
      pageargs["rows"] = 7;
      pageargs["list"] = list;
      pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
      gtftools.formpages(pageargs, embed, msg, userdata);
      return;
    }

    if (query[0] == "engine" || query[0] == "eng" || query[0] == "e" || parseInt(query[0]) == 1) {
      var selectedtype = true;
      var type = "engine";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (query[0] == "transmission" || query[0] == "trans" || query[0] == "tr" || parseInt(query[0]) == 2) {
      var selectedtype = true;
      var type = "transmission";
      var select = require(gtf.PARTS).find({ type: type });
      
    }

    if (query[0] == "suspension" || query[0] == "susp" || query[0] == "sus" || query[0] == "su" || parseInt(query[0]) == 3) {
      selectedtype = true;
      var type = "suspension";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (query[0] == "tires" || query[0] == "tire" || query[0] == "ti" || parseInt(query[0]) == 4) {
      var selectedtype = true;
      var type = "tires";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (query[0] == "weight-reduction" || query[0] == "weight" || query[0] == "we" || parseInt(query[0]) == 5) {
      selectedtype = true;
      var type = "weight-reduction";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (query[0] == "turbo" || query[0] == "supercharger" || query[0] == "tu" || parseInt(query[0]) == 6) {
      selectedtype = true;
      var type = "turbo";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (query[0] == "aero-kits" || query[0] == "aero-kit" || query[0] == "aero" || parseInt(query[0]) == 7) {
      selectedtype = true;
      var type = "aero-kits";
      var select = require(gtf.PARTS).find({ type: type });
    }

    if (selectedtype) {
      var name = select[0]["type"];
      var number = query[1];
      var itempurchase = true;
      embed.setTitle("__GTF Auto - " + name + "__");
      if (number == "s" || number == "Stock" || number == "stock") {
        number = "S";
      }
      if (number != "S") {
        if (number <= 0 || isNaN(number) || number === undefined || number > select.length) {
          if (number !== undefined) {
            require(gtf.EMBED).alert({ name: "⚠ Invalid ID", description: "This ID does not exist.", embed: embed, seconds: 0 }, msg, userdata);
          }
          itempurchase = false;
        }
      }
    }

    if (itempurchase) {
      if (number == "S") {
        var part = { name: "Stock", type: select[0]["type"], cost: 0 };
      } else {
        var part = select[number - 1];
        var cond = require(gtf.PARTS).checkpartsavail(part, car);
        if (cond.includes("❌")) {
          require(gtf.EMBED).alert({ name: "❌ Part Unavailable", description: "**" + part["type"] + " " + part["name"] + "** is unavailable for **" + car["name"] + "**." + "\n\n" + "**❗ Choose another option when this message disappears.**", embed: "", seconds: 3 }, msg, userdata);
          return;
        }
        if (cond.includes("✅")) {
          require(gtf.EMBED).alert({ name: "❌ Part Already Installed", description: "**" + part["type"] + " " + part["name"] + "** is already installed for **" + car["name"] + "**." + "\n\n" + "**❗ Choose another option when this message disappears.**", embed: "", seconds: 3 }, msg, userdata);
          return;
        }
      }
      require(gtf.MARKETPLACE).purchase(msg.member, part, "PART", embed, msg, userdata);
      return;
    }
    if (select.length == 0) {
      require(gtf.EMBED).alert({name:"❌ Error", description:  "Invalid arguments.", embed:"", seconds:0}, msg, userdata);
      return
    }

    var select3 = select.map(function (x) {
      var cond = require(gtf.PARTS).checkpartsavail(x, car);
      return ["**" + gtftools.numFormat(x["cost"]) + "**" + emote.credits + " " + x["type"] + " " + x["name"] + " ", cond];
    });
    pageargs["footer"] = "❓ **Select an upgrade corresponding with the numbers above or the reactions.**";
    pageargs["end"] = emote.fpp;
    pageargs["list"] = select3;
    pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
    gtftools.formpages(pageargs, embed, msg, userdata);
    return;
  },
};
