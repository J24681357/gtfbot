var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env;
////////////////////////////////////////////////////

module.exports.intro = function(userdata, command, msg) {
  if (command === "jay" || command === "dw" || command === "dw4" || command === "dwex" || command === "course" || command === "gtf" || command == "srating") {
    return "COMMAND";
  }

  if (typeof userdata["t"] !== undefined) {
    if (userdata["t"] == "Complete") {
      return "SUCCESS";
    } else {
      return doit();
    }
  } else {
    return doit();
  }

  function doit() {
    var embed = new Discord.MessageEmbed();
    var author = msg.author;
    var userid = msg.author.id;
    var user = msg.author.username;
    var avatar = msg.author.displayAvatarURL();

    embed.setColor(0x800080);
    embed.setAuthor(user, avatar);

    embed.setTitle("⚠ __**" + "Before You Start" + "**__ ⚠");
    embed.setThumbnail(author.displayAvatarURL);
    embed.setDescription("Welcome to the world of GT Fitness!\nYou may start on your career and find other cool features by using **!home**.\n**!home** will be your main menu if you are ever stuck on what to do.\n\n⚠ Click the " + emote.yes + " emote to finish the process.");
    msg.channel.send(embed).then(msg => {
      var i = 0;
      function complete() {
        userdata = {
          id: userid,
          raceinprogress: [false, ["", ""], 0],
          racedetails: [],
          careerraces: [],
          inlobby: [false, ""],
          dailyworkout: false,

          credits: 20000,
          exp: 0,
          level: 1,
          mileage: [0, 0],
          totalmileage: [0, 0],
          version: 100,
          commandhistory: [],

          garage: [],
          numcarpurchase: 0,
          numgiftearned: 0,
          currentcar: 0,

          items: [],
          gifts: [],
          messages: [],
          count: 0,
          achievements: [],
          t: "N/A",
          lastonline: "START",
          test1: [],
          test2: [],
          test3: [],

          settings: {
            "RACE DM": 0,
            MILEAGE: 0,
            "TIME OFFSET": 0,
            PROGRESSBAR: ["⬜", "⬛"],
            COMPACTMODE: "Off",
            HOMELAYOUT: 0,
            HOMECOLOR: 0,
          },
        };
        userdata["t"] = "Complete";

        let MongoClient = require("mongodb").MongoClient;
        var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF";

        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
          var dbo = db.db("GTFitness");
          var users = dbo.collection("USERS");
          users.insertOne(userdata, (err, result) => {});
          dbo.collection("REPLAYS").insertOne(
            {
              id: userdata["id"],
              replays: {},
            },
            (err, result) => {}
          );
          dbo.collection("CUSTOMCOURSES").insertOne(
            {
              id: userdata["id"],
              courses: {},
            },
            (err, result) => {}
          );
        });
        embed.setTitle("__**Setup Complete**__");
        embed.setColor(0x216c2a);
        embed.setDescription("**✅ Join The Fitness Race!**");
        author.send(embed);
      }
      var emojilist = [[emote.yes, "Yes", complete]];
      var task1 = "First, you would want to buy a new car!\nYou can use the **!car** command to choose from a list of manufacturers of what you want to buy.\nIf I want find cars from Mazda, you type in **!car Mazda** to get a catalog of Mazda cars.\n\n**❓ Type the correct command (without the prefix !) to list __Audi__ cars from the __!car__ command.**";
      var task2 = "Now you how to see the list of cars from each manufacturer, lets purchase a car.\nTo purchase a car, you would look at the numbers associated with each of the cars in a manufacturer's list.\nIf I would want to purchase the 1st car from the Audi dealership, you would type **!car Audi 1**.\n\n**🔰 Without the prefix (!), type the correct command to purchase the __5th__ car from the __Nissan__ dealership using the __!car__ command.**";
      var task3 = "Great, you know how to purchase cars!\nYou can access to your garage by using **!garage**.\nSince you would have only one car in your garage, you can select a car by using **!garage 1**.\n\n**🔰 Without the prefix (!), type the correct command to select the __10th__ car using the __garage__ command.**";
      var task4 = 'Now that you selected your car, you can now do races in career mode using **!career**!\nEach career has different leagues (B, A, IC, IB, etc) with increasing difficulty and distance.\nTo view the events from each league, you can type **!career ["league"]** where ["league"] is a list from the parentheses.\nTo race in one of the events listed in each league, similarly to the **!car** command, you would look at the number list associated with the league\'s list.\nEx: you would use **!career b 1** to participate in the first event in the B League.\n\n**🔰 Without the prefix (!), type the correct command to participate in the __4th__ event from the __IC__ League using the __!career__ command.**';
      var task5 = "You can also tune your cars in the GTF Auto using the **!tune** command. In the GTF Auto, there are a variety of types of parts to upgrade your car including engine, tires, and more!\nIf I want to list the available engine parts, I would type **!tune engine**.\n\n**🔰 Without the prefix (!), type the correct command to list __tires__ from the __!tune__ command**.";
      var task6 = "Now you would have a catalog of parts for the type you've choosen. Just like the **!car** command, each number is associated with each upgrade part for your car.\n\n**🔰 Without the prefix (!), type the correct command to install Comfort Soft tires on a car using the __!tune__ command.\nHint: Comfort Soft tires is the 3rd item in the tires list.**";
      var task7 = "**Congrats, You have completed the brief tutorial!\n\n❓ **You can also navigate through most commands by their reactions from the bottom of each embed to reduce typing.\nMany other commands are listed in **!home**.\n\n🔰 **Type __ok__ to complete the tutorial.**";
      var tasks = [[" ", " "]]
      //var tasks = [[task1, "car Audi"], [task2, "car Nissan 5"], [task3, "garage 10"], [task4, "career ic 4"], [task5, "tune tires"], [task6, "tune tires 3"], [task7, "ok"], [" ", " "]];

      embed.setTitle("__**Tutorial**__");
      function nexttask(i) {
        if (i != tasks.length - 1) {
          embed.setDescription(tasks[i][0] + "\n\n" + "⏲ **You have 2 minutes to answer this question correctly.**");
          author.send(embed).then(msg => {
            const filter = m => m.content.toLowerCase() == tasks[i][1].toLowerCase();
            const filter2 = m => m.content.toLowerCase() != tasks[i][1].toLowerCase();
            const collector = msg.channel.createMessageCollector(filter, { time: 1000 * 120 });
            const collector2 = msg.channel.createMessageCollector(filter2, { time: 1000 * 120 });

            var correct = false;

            collector.on("collect", m => {
              correct = true;
              collector.stop();
              collector2.stop();
              i++;
              if (i == tasks.length - 1) {
                complete();
              } else {
                nexttask(i);
              }
            });

            collector2.on("collect", m => {
              console.log("E");
              if (embed.color == 16711680) {
              } else {
                embed.setColor(0xff0000);
                msg.edit(embed);
                setTimeout(function() {
                  embed.setColor(0x800080);
                  msg.edit(embed);
                }, 2500);
              }
            });

            collector.on("end", collected => {
              if (!correct) {
                author.send("⚠ Time is up! You may start this tutorial over by typing **!home**.");
              }
              collector.stop();
              collector2.stop();
            });
          });
        }
      }

      gtftools.createreactions(emojilist, msg, userdata);
    });

    return;
  }
};
