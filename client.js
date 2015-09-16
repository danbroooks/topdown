var Render = require('./src/client/Render.js');
var Controls = require('./src/client/Controls.js');
var Network = require('./src/client/Network.js');

var Client = require('./src/client/Client.js');

var c = Client(
  Render(document),
  Controls(window, document),
  Network()
);

c.connect(window.location.protocol + '//' + window.location.host);
