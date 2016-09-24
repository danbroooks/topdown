'use strict';

const PORT = process.argv[2] || 80;

let topdown = require('..');

let box1 = {
  points: [
    [100, 100], [100, 200], [200, 200], [200, 100]
  ]
};

let elements = [ box1 ];

let connected = (client) => {
  client.addCanvas('foreground');
  client.render('foreground', elements);
};

topdown
  .on('join', connected)
  .listen(PORT);
