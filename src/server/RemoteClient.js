var Keymap = require('../Keymap');
var Build = require('../util/Factory').Build;

var connections = {};

function io(rc) {
  return connections[rc.id];
}

var RemoteClient = function () {};

RemoteClient.prototype.id = undefined;

RemoteClient.prototype.key = function (letter) {
  if (Keymap[letter] !== undefined) {
    return Keymap[letter];
  }

  var msg = 'Method .key() was passed `' + letter + '` which is not a valid keymap option';
  throw new Error(msg);
};

RemoteClient.prototype.addCanvas = function (name) {
  io(this).emit('addCanvas', name);
  return this;
};

RemoteClient.prototype.setControls = function (config) {
  io(this).emit('setControls', config);
  return this;
};

RemoteClient.prototype.render = function (canvas, data) {
  io(this).emit('render', {
    canvas: canvas,
    data: data
  });

  return this;
};

RemoteClient.prototype.on = function (event, handler) {
  io(this).on(event, handler);

  return this;
};

module.exports = Build(RemoteClient, function (connection) {

  connections[connection.id] = connection;

  var opts = {};
  opts.id = connection.id;
  return opts;
});
