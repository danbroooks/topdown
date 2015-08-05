
var _ = require('lodash');

var Controls = function(doc){
  doc.oncontextmenu = _.constant(false);
};

var Factory = function(doc){
  return new Controls(doc);
};

Factory.Constructor = Controls;

module.exports = Factory;

