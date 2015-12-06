var _ = require('lodash');
var http = require('http');
var mime = require('mime');
var socketio = require('socket.io');

var fs = require('./FileSystem');
var Connection = require('./Connection');
var RemoteClient = require('./RemoteClient');

var Server = function (port) {
  this.setPort(port);
  this.connections = Connection.Collection();
  this.http = http.createServer(this.httpRequestHandler);
  this.socket = socketio(this.http);
};

Server.prototype.listen = function () {
  if (!this.port) {
    throw new Error("Unable to start server, invalid port");
  }

  this.http.listen(this.port);
  this.socket.on('connection', _.bind(this.onConnected, this));
  return this;
};

Server.prototype.setPort = function (port) {
  this.port = parseInt(port, 10);
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
  this.socket.on(event, _.bind(function(socket) {
    var rc = RemoteClient(socket);
    handler.apply(this, [rc]);
  }, this));

  return this;
};

Server.prototype.emit = function (event, data) {
  this.socket.emit(event, data);
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
