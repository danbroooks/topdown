'use strict';

var _ = require('lodash');
var http = require('http');
var mime = require('mime');
var socketio = require('socket.io');
var EventEmitter = require('events').EventEmitter;

var fs = require('./FileSystem');
var Connection = require('./Connection');

var Server = function (port) {
  this.setPort(port);
  this.connections = Connection.Collection();
  this.http = http.createServer(this.httpRequestHandler);
  this.events = new EventEmitter();
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
  this.events.on(event, handler);

  return this;
};

Server.prototype.onConnected = function (socket) {

  var connection = Connection(socket);

  this.connections.add(connection);

  this.events.emit('connected', connection);

  connection.on('disconnect', this.onDisconnect.bind(this, connection));
};

Server.prototype.onDisconnect = function (connection) {
  connection.emit('disconnected');

  this.connections.remove(function (conn) {
    return conn === connection;
  });

  this.events.emit('disconnected', connection);
};

let self = (port) => new Server(port);

self.Listen = (port) => self(port).listen();

module.exports = self;

