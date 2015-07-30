
var _ = require('lodash');

var Collection = function(filter){
  this.items = [];
  this.filter = filter || Collection.DefaultFilter;
  this.length = 0;
};

Collection.prototype.add = function(obj) {
  this.items.push(obj);
  this.length = this.items.length;
};

Collection.DefaultFilter = _.constant(true);

var Factory = function(filter){
  return new Collection(filter);
};

Factory.Constructor = Collection;

module.exports = Factory;

