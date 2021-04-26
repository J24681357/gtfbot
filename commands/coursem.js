var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = require('../files/directories');
////////////////////////////////////////////////////

module.exports = {
  name: 'coursem',
  title: 'GTF Course Maker',
  cooldown: 0,
  level: 0,
  channels: ["testing", "gtf-mode"],

  delete: false,
  requirecar: false,
  availitoeveryone: false,
  availinmaint: false,
  requireuserdata: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ['!course'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '';
    var page = 0
    var results = ''
    var pageargs = {
      "text": "",
      "list": "",
      "start": "📌ID:", 
      "end": "",
      "query": query,
      "command": __filename.split("/").splice(-1)[0].split(".")[0],
      "rows": 10,
      "page": 0,
      "numbers": true,
      "reactions": true,
      "dm": false,
      "footer":  '**❓ The red point would be the starting point.**',
         "special": "",
      "other": "`"
    }
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      // 

    var coursestats = []
      var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("CUSTOMCOURSES").find({"id":userdata["id"]}).forEach(row => {
          coursestats = row["courses"]
      }).then(() => 
      {startcourse()}
      )
})

function startcourse() {
    var reactionson = true
    var success = false

    if (!isNaN(query[0])) {
      query.unshift('view');
      query[1] = parseInt(query[1]);
}
  
 if (query[0] === undefined) {
      query.unshift("list");
}


if (query[0] == "list") {
  success = true

      if (Object.keys(coursestats).length == 0) {
        require(gtf.EMBED).alert({name:"❌ No Courses", description:  "You have no courses saved.", embed:"", seconds:0}, msg, userdata);
      return
      }
       embed.setTitle(emote.tracklogo + "__My Courses__");
       info = ""
      var list = Object.keys(coursestats).map(function(id) {
        return [coursestats[id]["name"], " "];
      });
      
      pageargs['list'] = list;
		pageargs['text'] = gtftools.formpage(pageargs, embed, msg, userdata);
		gtftools.formpages(pageargs, embed, msg, userdata);
      return

}
if (query[0] == "view") {
        var number = query[1];
        if (!gtftools.betweenInt(number, 1, Object.keys(coursestats).length)) {
          require(gtf.EMBED).alert({name:"❌ Invalid ID", description: "This ID does not exist in your course list.", embed:"", seconds:0}, msg, userdata);
          return;
        }
        var course = coursestats[number.toString()]

        
    embed.setTitle(emote.tracklogo + "__GTF Course Maker__");
    const attachment = new Discord.MessageAttachment(course["image"].buffer, 'course.png');
    embed.attachFiles(attachment).setImage('attachment://course.png')
    embed.setDescription("**Name:** " + course["name"] + "\n" + 
    "**Author:** " + msg.guild.members.cache.get(course["author"]).user.username +  "\n" + "**Track Length:** " + course["length"] + "mi" + " | " + course["lengthkm"] + "km")
    msg.channel.send(embed)
    return
}


  if (query[0] == "create") {
    success = true

    var curviness = 0.3
    var maxangle = 120
    var minsegment = 2
    var maxsegment = 20
    var allsegment = 0
    var type = "circuit"
    var name = "Generic Track " + (Object.keys(coursestats).length + 1)

    for (var i = 1; i < query.length; i++) {
      if (query[i].includes("name=")) {
        name = query[i].split("=")[1].toString()
      }
      if (query[i].includes("allsegments=")) {
        /// 0 - 20
        allsegment = parseFloat(query[i].split("=")[1])
        if (!gtftools.betweenInt(allsegment, 2, 20)) {
           require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Segment lengths must be between 2 and 20.", embed:"", seconds:0}, msg, userdata);
          return
        }
        minsegment = allsegment
        maxsegment = allsegment
        allsegment = ""
      }
      if (query[i].includes("maxsegment=")) {
        maxsegment = parseFloat(query[i].split("=")[1])
        if (allsegment.toString().length != 0) {
          if (!gtftools.betweenInt(maxsegment, 2, 20)) {
           require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Maximum segment length must be between 2 and 20.", embed:"", seconds:0}, msg, userdata);
            return
          }
        }
      }
      if (query[i].includes("minsegment=")) {
        /// 0 - 20
        minsegment = parseFloat(query[i].split("=")[1])
        if (allsegment.toString().length != 0) {
          if (!gtftools.betweenInt(minsegment, 2, 20)) {
            require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Mininum segment length must be between 2 and 20.", embed:"", seconds:0}, msg, userdata);
            return
          }
        }
      }
      if (query[i].includes("curviness=")) {
        /// 0.0 - 1.0
        curviness = parseFloat(query[i].split("=")[1])
          if (!gtftools.betweenInt(curviness, 0, 1)) {
            require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Curviness value must be between 0 and 1.", embed:"", seconds:0}, msg, userdata)
            return
          }
      }
      if (query[i].includes("maxangle=")) {
        /// 50-150
        maxangle = parseFloat(query[i].split("=")[1])
        if (!gtftools.betweenInt(maxangle, 50, 150)) {
           require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Max Angle value must be between 50 and 150.", embed:"", seconds:0}, msg, userdata);
          return
        }
      }
      if (query[i].includes("type=")) {
        type = query[i].split("=")[1]
      }

    }

    
           if (maxsegment < minsegment) {
                 require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Maximum segment length is lower than the minimum segment length.", embed:"", seconds:0}, msg, userdata);
            return
          }
          
          if (minsegment > minsegment) {
             require(gtf.EMBED).alert({name:"❌ Invalid Arguments", description: "Minimum segment length is greater than the maximum segment length.", embed:"", seconds:0}, msg, userdata);
            return
          }

    var t = require(gtf.COURSEMAKER).trackparams({
      min: 40,
      max: 80,
      minSegmentLength: minsegment,
      maxSegmentLength: maxsegment,
      curviness: curviness,
      maxAngle: maxangle,
      type: type
    });
    var course = require(gtf.COURSEMAKER).drawtrack(t)
    course["name"] = name
        course["type"] = "Course Maker"
    course["options"] = ["Drift"]
    course["author"] = msg.author.id

    embed.setTitle(emote.tracklogo + "__GTF Course Maker__");
    const attachment = new Discord.MessageAttachment(course["image"], 'course.png');
    embed.attachFiles(attachment).setImage('attachment://course.png')
    var footer = "Type = " + type + " | " + "Segments = " + minsegment + ":" + maxsegment + " | " + "Curviness = " + curviness + " | " +
      "Max Angle = " + maxangle
    embed.setDescription("**Name:** " + course["name"] + "\n" + "**Track Length:** " + course["length"] + "mi" + " | " + course["lengthkm"] + "km")
    embed.setFooter(footer)
    msg.channel.send(embed).then(msg => {

 function generate() {
      t = require(gtf.COURSEMAKER).trackparams({
      min: 40,
      max: 80,
      minSegmentLength: minsegment,
      maxSegmentLength: maxsegment,
      curviness: curviness,
      maxAngle: maxangle,
      type: type
    });
    var course = require(gtf.COURSEMAKER).drawtrack(t)
    course["name"] = name
    

    embed.setTitle(emote.tracklogo + "__GTF Course Maker__");
    const attachment = new Discord.MessageAttachment(course["image"], 'course2.png')
    embed.attachFiles(attachment)
    embed.setImage('attachment://course.png')
    var footer = "Type = " + type + " | " + "Segments = " + minsegment + ":" + maxsegment + " | " + "Curviness = " + curviness + " | " +
      "Max Angle = " + maxangle
    embed.setDescription("**Name:** " + course["name"] + "\n" + "**Track Length:** " + course["length"] + "mi" + " | " + course["lengthkm"] + "km")
    embed.setFooter(footer)
         msg.edit(embed)
    }
    function save() {
        require(gtf.COURSEMAKER).savecourse(course,userdata);
        require(gtf.EMBED).success('✅ Success', 'Course saved.', 5000, true, embed, msg, userdata);
        return
    }
        var emojilist = [[emote.yes, "Yes", save], ['🎲', '🎲', generate]];
        gtftools.createreactions(emojilist, msg, userdata);

    })
  }

      if (success) {
      return
    } else {

    }
}
  }
};
