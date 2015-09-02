var http = require('http');
var mime = require('mime');
var socketio = require('socket.io');

var fs = require('./FileSystem');

var Server = function (port) {
  this.port = parseInt(port, 10);
  this.http = http.createServer(this.httpRequestHandler);
  this.socket = socketio(this.http);
};

Server.prototype.listen = function () {
  this.http.listen(this.port);
  return this;
};

Server.prototype.httpRequestHandler = function (req, res) {

  var uri = req.url;

  uri = (uri == '/') ? '/index.html' : uri;

  fs().find(uri, {
    paths: [
      fs.Project,
      fs.Root
    ],
    success: function (file, contents) {
      var headers = {
        'Content-Type': mime.lookup(file),
        'Content-Disposition': 'inline'
      };

      res.writeHead(200, headers);
      res.end(contents);
    },
    failure: function (err) {
      res.writeHead(404);
      res.end();
    }
  });
};

Server.prototype.on = function (event, handler) {
  var s = this;
  this.socket.on(event, function () {
    handler.apply(s);
  });
  return this;
};

var Factory = function (port) {
  return new Server(port);
};

Factory.Listen = function (port) {
  return Factory(port).listen();
};

Factory.Constructor = Server;

module.exports = Factory;
