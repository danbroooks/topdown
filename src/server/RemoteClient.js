
var RemoteClient = function () {

};

var Factory = function () {
  return new RemoteClient();
};

Factory.Constructor = RemoteClient;

module.exports = Factory;
