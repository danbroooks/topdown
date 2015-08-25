
var Keymap = require('../Keymap');

var RemoteClient = function () {

};

RemoteClient.prototype.key = function(letter){
  if (Keymap[letter] !== undefined) {
    return Keymap[letter];
  }

  var msg = 'Method .key() was passed `' + letter + '` which is not a valid keymap option';
  throw new Error(msg);
};

var Factory = function () {
  return new RemoteClient();
};

Factory.Constructor = RemoteClient;

module.exports = Factory;
