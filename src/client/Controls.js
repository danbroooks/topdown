var _ = require('lodash');
var Kefir = require('kefir');

var Point = require('../graphics/Point');

var Controls = function (win, doc) {

  var self = this;
  var keystate = {};

  win.onkeydown = function (key) {
    var config = self.config;

    if (!config || _.contains(_.values(config), key.which)) {
      keystate[key.which] = true;
    }
  };

  win.onkeyup = function (key) {
    delete keystate[key.which];
  };

  var keystream = Kefir.fromPoll(30, function () {
    return _.keys(keystate).map(function (val) {
      return parseInt(val, 10);
    });
  });

  this.__defineGetter__('keystream', function () {
    return keystream.skipDuplicates(function (a, b) {
      return _.xor(a, b).length == 0;
    }).throttle(100);
  });

  var mouse = Point(0, 0);

  win.onmousemove = function (e) {
    mouse = Point(e.offsetX, e.offsetY);
  };

  this.__defineGetter__('mouse', function () {
    return mouse;
  });

  doc.oncontextmenu = _.constant(false);
};

Controls.prototype.config = undefined;

Controls.prototype.configure = function (config) {
  this.config = config;
};

var Factory = function (win, doc) {
  return new Controls(win, doc);
};

Factory.Constructor = Controls;

Factory.Keymap = require('../Keymap');

module.exports = Factory;
