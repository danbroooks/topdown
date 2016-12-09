'use strict';

const _ = require('lodash');
const createServer = require('http').createServer;
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

const Server = function () {
  const events = new EventEmitter();

  const connections = Connection.Collection();

  const listen = (port) => {
    if (!port) {
      throw new Error("Unable to start server, invalid port");
    }

    http.listen(parseInt(port, 10));
    socket.on('connection', onConnected);
    return server;
  };

  const on = (event, handler) => {
    events.on(event, handler);
    return server;
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

  const http = createServer(httpRequestHandler);
  const socket = socketio(http);

  let server = Object.freeze({ events, connections, http, socket, on, listen });

  return server;
};

const self = () => new Server();

module.exports = self;

