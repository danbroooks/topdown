var _ = require('lodash');
var http = require('http');
var mime = require('mime');
var socketio = require('socket.io');

var fs = require('./FileSystem');
var Connection = require('./Connection');

var Server = function (port) {
  this.port = parseInt(port, 10);
  this.connections = Connection.Collection();
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
  this.socket.on(event, _.bind(handler, this));
  return this;
};

Server.prototype.onConnected = function (socket) {
  var conn = Connection(socket);
  this.connections.add(conn);
  conn.on('disconnect', _.bind(this.onDisconnect, this));
};

Server.prototype.onDisconnect = function (socket) {
  this.connections.remove(function (conn) {
    return conn.id == socket.id;
  });
};

var Factory = function (port) {
  return new Server(port);
};

Factory.Listen = function (port) {
  return Factory(port).listen();
};

Factory.Constructor = Server;

module.exports = Factory;
