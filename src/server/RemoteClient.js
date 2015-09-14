var Keymap = require('../Keymap');
var Build = require('../util/Factory').Build;

var RemoteClient = function () {};

RemoteClient.prototype.id = undefined;

RemoteClient.prototype.key = function (letter) {
  if (Keymap[letter] !== undefined) {
    return Keymap[letter];
  }

  var msg = 'Method .key() was passed `' + letter + '` which is not a valid keymap option';
  throw new Error(msg);
};

module.exports = Build(RemoteClient, function (socket) {
  var opts = {};
  opts.id = socket.id;
  return opts;
});
