module.exports.formpages = function(args, embed, msg, userdata) {

  var list = args["list"]

  if (args["dm"]) {
    msg_channel = msg.author
  } else {
    msg_channel = msg.channel
  }
    var select = 0
    var reset = true
    var index = 0
     stats.addcount(userdata)
    args["text"] = JSON.stringify(args["text"]).split("\\n").map(function(x) {
        if (reset) {
          x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(args["text"] + "\n" + args["footer"])
    var msg2 = msg
  
    msg_channel.send(embed).then(msg => {
      
    function selectoption() {
      if (command == "car" && args["numbers"] == false) {
        var pick = args["list"][select + (args["page"]*args["rows"])][0].split(" ")[0]
      } else {
        var pick = select + 1 + (args["page"]*args["rows"])
      } 
      if (command == "coursem") {
        args["query"] = []
      }
      if (args["command"] == "garage_regulate") {
        var pick = parseInt(args["list"][select + (args["page"]*args["rows"])][0].split(":")[1].split("`")[0])
        args["command"] = "garage"
        args["query"] = []
      }
      if (args["command"] == "lobby") {
        if (args["query"][0] == "settings") {
          if (args["query"][2] == 0) {
            args["query"].pop()
          }
        } else { 
        var pick = parseInt(args["list"][select + (args["page"]*args["rows"])][0].split(":")[1].split("`")[0])
        args["command"] = "lobby"
        args["query"] = ["join"]
      }
      }
      args["query"].push(pick)
        
      require("../../commands/" + args["dm"]).execute(msg2,args["query"],userdata)
      return stats.save(userdata)
      }
    

    function back() {
      reset = true
    if (args["page"] != 0) {
      args["page"]--
    }
    select = 0
    args["text"] = gtftools.formpage(args, userdata)
    args["text"] = JSON.stringify(args["text"]).split("\\n").map(function(x) {
        if (reset) {
          x =  stats.setting("PROGRESSBAR", userdata)[0]  + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
        }).join("\n").replace(/\"/gi, "")
    embed.setDescription(args["text"] + "\n" + args["footer"])
    args["text"] = ""
    msg.edit(embed)
    }
  
    function next() {
      reset = true
      if (args["page"] != Math.ceil(args["list"].length / args["rows"]) - 1) {
       args["page"]++
    }
    select = 0
      
    args["text"] = gtftools.formpage(args, userdata)
    args["text"] = JSON.stringify(args["text"]).split("\\n").map(function(x) {
        if (reset) {
          x =  stats.setting("PROGRESSBAR", userdata)[0] + " " + x
          reset=false
        }
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
      
    embed.setDescription(args["text"] + "\n" + args["footer"])
    args["text"] = ""
    msg.edit(embed)
    }
      
    function up() {
    var index = 0

    console.log(args["text"])
    args["text"] = gtftools.formpage(args, userdata)
    console.log(args["text"])
      
    select--
    if (select <= -1) {
      select = JSON.stringify(args["text"]).split("\\n").length-2
    }
    args["text"] = JSON.stringify(args["text"]).split("\\n").map(function(x) {
      if (select == index) {
          x =  stats.setting("PROGRESSBAR", userdata)[0] + " " + x
        }
      index++
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(args["text"] + "\n" + args["footer"])
    msg.edit(embed)
    }
      
    function down() {
    var index = 0

    args["text"] = gtftools.formpage(args, userdata)
      
    select++
      
    if (select >= JSON.stringify(args["text"]).split("\\n").length-1) {
      select = 0
    }
      
    args["text"] = JSON.stringify(args["text"]).split("\\n").map(function(x) {
        if (select == index) {
          x =  stats.setting("PROGRESSBAR", userdata)[0]  + " " + x
        }
      index++
        return x.replace(/\\r/gi, "\n")
    }).join("\n").replace(/\"/gi, "")
    embed.setDescription(args["text"] + "\n" + args["footer"])
    msg.edit(embed)
    }
    
    var emojilist = [[emote.yes, "Yes", selectoption, "Once"], [emote.leftarrow, "leftarrow", back], [emote.rightarrow, "rightarrow", next], [emote.uparrow, "uparrow", up], [emote.downarrow, "downarrow", down]]
 
    if (reactions) {
      gtftools.createreactions(emojilist, msg, userdata)
    }
    })
  }