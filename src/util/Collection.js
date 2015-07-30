
var Collection = function(){
  this.items = [];
  this.length = 0;
};

Collection.prototype.add = function(obj) {
  this.items.push(obj);
  this.length = this.items.length;
};

var Factory = function(){
  return new Collection();
};

Factory.Constructor = Collection;

module.exports = Factory;

