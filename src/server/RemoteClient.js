
var Keymap = require('../Keymap');

var RemoteClient = function () {

};

RemoteClient.prototype.key = function(letter){
  if (Keymap[letter] !== undefined) {
    return Keymap[letter];
  }
};

var Factory = function () {
  return new RemoteClient();
};

Factory.Constructor = RemoteClient;

module.exports = Factory;
