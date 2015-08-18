
var Client = function () {
  console.log(this);
};

var Factory = function () {
  return new Client();
};

Factory.Constructor = Client;

module.exports = Factory;
