var assign = require('lodash/object/assign');

var Build = function (Class, preconstructor) {

  // create a new object from Factory's class
  var obj = Object.create(Class.prototype);

  // root object for adding additonal object functionality
  function Root() {};

  Root.prototype = obj;

  Root.prototype.instanceof = function (Fac) {
    return this instanceof Fac.Constructor;
  };

  // create function for object creation
  var Factory = function (opts) {

    // create a new object
    obj = Object.create(Root.prototype);

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
