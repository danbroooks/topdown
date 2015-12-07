var assign = require('lodash/object/assign');

var Build = function (Class, preconstructor) {

  // create a new object from Factory's class
  var obj = Object.create(Class.prototype);

  // root object for adding additional object functionality
  function Root() {};

  Root.prototype = obj;

  // create function for object creation
  var Factory = function () {

    // create a new object
    obj = Object.create(Root.prototype);

    var opts;

    // if the factory has a preconstructor, use it to pre-configure 'opts'
    if (preconstructor) {
      opts = preconstructor.apply(null, arguments);
    } else {
      opts = arguments[0];
    }

    // assign opts to our object
    assign(obj, opts || {});

    // apply constructor
    Class.apply(obj);

    // return new instantiated object
    return obj;
  };

  Factory.Constructor = Class;

  // method to check if object was created by this factory
  Factory.Created = function (object) {
    return (object instanceof Factory.Constructor);
  };

  return Factory;
};

module.exports = {
  Build: Build
};
