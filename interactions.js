module.exports.formpage = function(args) {
  var list = ""
  var listnumber = ""
  var extra = ""
  if (args["other"].length != 0) {
        args["start"] = args["other"] + args["start"]
  }
  var pagetotal = Math.ceil(args["list"].length / args["rows"]);
  var x = 0;
  args["page"] = args["page"] * args["rows"]
  
  while (x < args["rows"] && args["list"][x+args["page"]] !== undefined) {
        if (args["numbers"]) {
        listnumber = (x + 1 + args["page"])
        }
        if (!args["other"]) {
          listnumber = listnumber + "." 
        } else {
          listnumber = listnumber + args["other"]
        }
        if (!args["numbers"]) {
          listnumber = ""
        }
        if (args["list"][x+args["page"]].length > 2) {
          extra = args["list"][x+args["page"]].slice(2).join(" ")
        }
    
        list = list + args["start"] + listnumber  + " " + args["list"][x + args["page"]][0] + " **" + args["list"][x + args["page"]][1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + args["end"] +  " " + extra + "\n";
            x++;
  }
   if (list == "") {
     if (args["page"] < 0) {
       args["page"]++
       return;
     }
     if (args["page"] > pagetotal) {
       args["page"]--;
       return
     }
   }
  return list
}