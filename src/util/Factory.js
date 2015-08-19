
var assign = require('lodash/object/assign');

var Build = function (Class, preconstructor) {

  var Factory = function (opts) {

    // create a new object
    var obj = Object.create(Class.prototype);

    // if the factory has a preconstructor, use it to pre-configure 'opts'
    if (preconstructor) {
      opts = preconstructor.apply(null, arguments);
    }

    // assign opts to our object
    assign(obj, opts || {});

    // apply constructor
    Class.apply(obj);

    // return new instantiated object
    return obj;
  };

  Factory.Constructor = Class;

  return Factory;
};

module.exports = {
  Build: Build
};
