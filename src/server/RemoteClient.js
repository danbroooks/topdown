var Keymap = require('../Keymap');
var Build = require('../util/Factory').Build;

var sockets = {};

function io(rc) {
  return sockets[rc.id];
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
};

RemoteClient.prototype.setControls = function (config) {
  io(this).emit('setControls', config);
};

RemoteClient.prototype.render = function (data) {
  io(this).emit('render', data);
};

module.exports = Build(RemoteClient, function (socket) {

  sockets[socket.id] = socket;

  var opts = {};
  opts.id = socket.id;
  return opts;
});
