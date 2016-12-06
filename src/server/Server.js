'use strict';

const _ = require('lodash');
const http = require('http');
const mime = require('mime');
const socketio = require('socket.io');
const EventEmitter = require('events').EventEmitter;

const fs = require('./FileSystem');
const Connection = require('./Connection');

const httpRequestHandler = (req, res) => {

  var uri = req.url;

  uri = (uri == '/') ? '/index.html' : uri;

  const paths = [ fs.Project, fs.Root ];

  const success = (file, contents) => {
    let headers = {
      'Content-Type': mime.lookup(file),
      'Content-Disposition': 'inline'
    };

    res.writeHead(200, headers);
    res.end(contents);
  };

  const failure = err => {
    res.writeHead(404);
    res.end();
  }

  fs().find(uri, { paths, success, failure });
};

const Server = function (port) {
  const events = new EventEmitter();

  const connections = this.connections = Connection.Collection();

  this.listen = function () {
    if (!this.port) {
      throw new Error("Unable to start server, invalid port");
    }

    this.http.listen(this.port);
    this.socket.on('connection', onConnected);
    return this;
  };

  this.setPort = function (port) {
    this.port = parseInt(port, 10);
    return this;
  };

  this.on = function (event, handler) {
    events.on(event, handler);

    return this;
  };

  const onConnected = (socket) => {
    var connection = Connection(socket);
    connections.add(connection);
    events.emit('connected', connection);

    connection.on('disconnect', () => {
      connection.emit('disconnected');
      connections.remove(conn => conn === connection);
      events.emit('disconnected', connection);
    });
  };

  this.setPort(port);
  this.http = http.createServer(httpRequestHandler);
  this.socket = socketio(this.http);
  this.events = events;
};

const self = (port) => new Server(port);

self.Listen = (port) => self(port).listen();

module.exports = self;

