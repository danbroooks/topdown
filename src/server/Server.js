
var http = require('http');

var Server = function(port){
  this.port = parseInt(port, 10);
};

Server.prototype.listen = function() {

  var server = http.createServer(function(req, res){

  });

  server.listen(this.port);

  return this;
};

var Factory = function(port){
  return new Server(port);
};

Factory.Listen = function(port) {
  return Factory(port).listen();
};

Factory.Constructor = Server;

module.exports = Factory;

