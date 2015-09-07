// Load dependencies

var obj = require('lib').obj;

var Stack = require('../core').Stack;
var Point = require('../draw').Point;
var Camera = require('graphics').Camera;
var Canvas = require('graphics').Canvas;





// Constructor

var Constructor = function () {

  this.canvasStack = Stack(function (o) {
    return o instanceof Canvas;
  });

  this.cameraStack = Stack(function (o) {
    return o instanceof Camera;
  });

};





// Declare object literal

var gfx = {};





//

gfx.createCanvas = function (name) {
  if (name) {
    var c = Canvas(name);
    this.canvasStack.push(name, c);
  }
};





// Gets primary canvas

gfx.getPrimaryCanvas = function () {
  return this.canvasStack.selected;
};

gfx.getCanvas = gfx.getPrimaryCanvas;





// Sets primary canvas

gfx.setPrimaryCanvas = function (canvasName) {
  this.canvasStack.select(canvasName);
};

gfx.setCanvas = gfx.setPrimaryCanvas;





// Sets camera

gfx.setCamera = function (name) {
  this.cameraStack.select(name);
};





// Add camera

gfx.addCamera = function (name) {
  if (name) {
    var cam = Camera();
    this.cameraStack.push(name, cam);
  }
};





// draw

gfx.draw = function (points, fill, stroke) {
  this.canvasStack.selected.draw(points, fill, stroke);
};





// clears current canvas

gfx.clear = function () {
  this.canvasStack.selected.clear();
};





// prints text to current canvas

gfx.text = function (text, position) {
  this.canvasStack.selected.text(text, position);
};





//

gfx.clingAll = function () {
  this.canvasStack.each(function (c) {
    c.cling();
  });
};

gfx.cling = gfx.clingAll;


// // gfx.loadImage = function(src, callback) {
// //   var image = new Image();
// //   image.src = src;
// //   if (callback) {
// //     image.onload = callback;
// //   }
// //   return image;
// // };


gfx.bindCameraToCanvas = function (camera, canvas) {
  var canv = this.canvasStack.get(canvas);
  var cam = this.cameraStack.get(camera);
  if (canv && cam) {
    canv.useCamera(cam);
  }
};





// Create definition

var Graphics = obj.define(Object, Constructor, gfx);





// Export module

module.exports = Graphics;
