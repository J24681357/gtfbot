var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require('../../files/directories');
////////////////////////////////////////////////////
var Canvas = require('canvas');

module.exports.trackparams = function(params) {
  var track = new Object();
  var min = params.min;
  var max = params.max;
  var minSegmentLength = params.minSegmentLength;
  var maxSegmentLength = params.maxSegmentLength;
  var curviness = params.curviness;
  var maxAngle = params.maxAngle / 360 * Math.PI;
  
  track.data = new Array();
  track.points = Math.floor((max - min) * Math.random()) + min;
  
  track.minX = 0;
  track.minY = 0;
  track.maxX = 0;
  track.maxY = 0;
  
  track.data[0] = {x: 400, y: 400};
  direction = 0;
  
  for(i = 1; i < track.points; i++) {
    var len = Math.floor((maxSegmentLength - minSegmentLength) * Math.random()) + minSegmentLength;
    var dx = Math.sin(direction) * len;
    var dy = Math.cos(direction) * len;
    var x = track.data[i-1].x + dx;
    var y = track.data[i-1].y + dy;
    track.data[i] = { x: x, y: y };
    turn = Math.pow(Math.random(), 1 / curviness);
    if(Math.random() < .5) turn = -turn;
    direction += turn * maxAngle;
  }
  
  // In the last quarter of the track, force the points progressively closer to the start.
  q = Math.floor(track.points * .75);
  c = track.points - q;
  var x0 = track.data[0].x;
  var y0 = track.data[0].y;
  
  for(i = q; i < track.points; i++) {
    var x = track.data[i].x;
    var y = track.data[i].y;
    var a = i-q;
    track.data[i].x = x0 * a/c + x * (1 - a/c);
    track.data[i].y = y0 * a/c + y * (1 - a/c);
  }
  
  for(i = 1; i < track.points; i++) {  
    x = track.data[i].x;
    y = track.data[i].y;
    if(x < track.minX) track.minX = x;
    if(y < track.minY) track.minY = y;
    if(x > track.maxX) track.maxX = x;
    if(y > track.maxY) track.maxY = y;
    
    track.minSize = Math.min(track.minX, track.minY);
    track.maxSize = Math.max(track.maxX, track.maxY);
  }
  
  track.type = params.type
  return track;
}

module.exports.drawtrack = function(track) {
  const canvas = Canvas.createCanvas(2000, 2000);

  var ctx = canvas.getContext('2d');
  var ctx2 = canvas.getContext('2d');
  var total = 0

  var x = 0
  var y = 0
  var scale = 500 / (track.maxSize - track.minSize);
  ctx.setTransform(scale, 0, 0, scale, -track.minSize, -track.minSize);
  ctx.strokeStyle = '#000000';
  
   ctx.lineWidth = 5;
   ctx.globalCompositeOperation = 'xor';

          if (track.type != "sprint") {
  ctx.moveTo(track.data[0].x, track.data[0].y);
  for(i = 1; i <= track.points; i++) {
    var p = i % track.points;
    ctx.lineTo(track.data[p].x, track.data[p].y);
   
  }
  
  ctx.stroke();
          }
  // To draw the actual track, we need to bisect each line segment and use the center as the curve
  // endpoint, then use the original line endpoints as the control points
  ctx.beginPath();
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  
   ctx.globalCompositeOperation = 'source-over';
  
  x_prev = 0
  y_prev = 0
  var distance = []
  
    var p1 = 0
    var p2 = 0

  for(i = 0; i <= track.points; i++) {
    if (track.type == "sprint") {
          p1 = i % track.points;
    p2 = (i+1) % track.points;
    if (gtftools.betweenInt(p1, 0, 20) || gtftools.betweenInt(p2, 0, 20)) {
      continue;
    }
    } else {
            p1 = i % track.points;
    p2 = (i+1) % track.points;
    }
    x = (track.data[p1].x + track.data[p2].x) / 2;
    y = (track.data[p1].y + track.data[p2].y) / 2;
    
    if(i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.quadraticCurveTo(track.data[p1].x, track.data[p1].y, x, y);
    }

    var dist = Math.sqrt( Math.pow((x_prev-x), 2) + Math.pow((y_prev-y), 2) );
    distance.push(dist)
    x_prev = x
    y_prev = y
  }
  distance = distance.slice(1)
  total = distance.reduce(
  ( accumulator, currentValue ) => accumulator + currentValue,
  0
)
  total = (Math.round((total * 10 / 1609) * 100) / 100)

  ctx.stroke();
  ctx.closePath();

  if (track.type == "sprint") {
var i = 21
  } else {
var i = gtftools.randomInt(2, track.points-5)
}
 var p1 = i % track.points;
    var p2 = (i+1) % track.points;
    x = (track.data[p1].x + track.data[p2].x) / 2;
    y = (track.data[p1].y + track.data[p2].y) / 2;

      
      
      ctx.fillStyle = "#c82124"; //red
ctx.beginPath();
ctx.arc(track.data[p1].x, track.data[p1].y, 5, 0.5 * Math.PI, 2.5 * Math.PI);
ctx.closePath();
ctx.fill();

var trimmedcanvas = trimCanvas(canvas);

  function trimCanvas(c) {
    var ctx = c.getContext('2d'),
        copy = Canvas.createCanvas(2000, 2000).getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        },
        x, y;
    
    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }
    
    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    return copy.canvas;
}
var course = trimmedcanvas.toBuffer()

return {"name": "", "image": course, "length": total, "lengthkm": (Math.round((total * 1.609) * 100) / 100)}

}

////////////////////////////////////

module.exports.loadcourse = function(number, userdata) {
        var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("CUSTOMCOURSES").find({"id":userdata["id"]}).forEach(row => {
          coursestats = row["courses"]
      }).then(() => {
  var course = coursestats[number.toString()]
  return course
      }
      )
})
}

module.exports.savecourse = function(course, userdata) {
  
  var coursedata = ""
  var found = false

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");

      dbo.collection("CUSTOMCOURSES").find({"id": userdata["id"]}).forEach(row => {
        coursedata = row
        delete coursedata["_id"]
        add()
        dbo.collection("CUSTOMCOURSES").replaceOne({ "id": userdata["id"] }, coursedata)
        found = true
      })

    }
  )


  function add() {
    var size = Object.keys(coursedata["courses"]).length + 1
    coursedata["courses"][size] = course
  }

}