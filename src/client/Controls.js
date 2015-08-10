
var _ = require('lodash');

var Point = require('../graphics/Point');

var Controls = function(win, doc) {

  var mouse = Point(0, 0);
  var keystate = {};

  win.onmousemove = function (e) {
    mouse = Point(e.offsetX, e.offsetY);
  };

  win.onkeydown = function (key) {
    keystate[key.which] = true;
  };

  win.onkeyup = function (key) {
    delete keystate[key.which];
  };

  this.__defineGetter__('mouse', function(){
    return mouse;
  });

  this.__defineGetter__('keystate', function(){
    return keystate;
  });

  doc.oncontextmenu = _.constant(false);
};

var Factory = function(win, doc){
  return new Controls(win, doc);
};

Factory.Constructor = Controls;

Factory.Keymap = require('../Keymap');

module.exports = Factory;

