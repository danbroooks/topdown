
var _ = require('lodash');

var Controls = function(win, doc){
  doc.oncontextmenu = _.constant(false);
};

var Factory = function(win, doc){
  return new Controls(win, doc);
};

Factory.Constructor = Controls;

module.exports = Factory;

