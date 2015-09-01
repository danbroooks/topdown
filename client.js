var Render = require('./src/client/Render.js');
var Controls = require('./src/client/Controls.js');

var Client = require('./src/client/Client.js');

var c = Client(
  Render(document),
  Controls(window, document)
);
