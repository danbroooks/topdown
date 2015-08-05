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
  var self = this;
  return _.each(self.items, function (item, i){
    var val = cb(item);
    if (self.filter(val)) {
      self.items[i] = val;
    } else {
      throw new Collection.FilterMismatchError();
    }
  });
};

Collection.DefaultFilter = _.constant(true);

Collection.FilterMismatchError = function(msg) {
  this.message = msg || '';
};

Collection.FilterMismatchError.prototype = Object.create(Error.prototype);
Collection.FilterMismatchError.prototype.constructor = Collection.FilterMismatchError;

var Factory = function (filter){
  return new Collection(filter);
};

Factory.Constructor = Collection;

module.exports = Factory;
