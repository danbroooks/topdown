
var http = require('http');

var Server = function(port){
  this.port = parseInt(port, 10);
};

Server.prototype.listen = function() {
  var server = http.createServer(this.httpRequestHandler.bind(this));

  server.listen(this.port);

  return this;
};

Server.prototype.httpRequestHandler = function (req, res) {
};

var Factory = function(port){
  return new Server(port);
};

Factory.Listen = function(port) {
  return Factory(port).listen();
};

Factory.Constructor = Server;

module.exports = Factory;

