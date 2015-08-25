var _ = require('lodash');

var Collection = function (filter) {
  this.items = [];
  this.filter = filter || Collection.DefaultFilter;
  this.length = 0;
};

Collection.prototype.add = function (obj) {
  if (this.filter(obj)) {
    this.items.push(obj);
  }

  this.length = this.items.length;
};

Collection.prototype.remove = function (fn) {
  this.items = _.reject(this.items, fn);
  this.length = this.items.length;
};

Collection.prototype.each = function (cb) {
  var items = this.items;
  return _.each(items, function (item, i) {
    items[i] = cb(item);
  });
};

Collection.DefaultFilter = _.constant(true);

var Factory = function (filter) {
  return new Collection(filter);
};

Factory.Constructor = Collection;

module.exports = Factory;
