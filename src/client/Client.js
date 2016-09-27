'use strict';

module.exports = (render, controls, network) => {

  let connect = (http) => {
    network.connect(http);

    network.on('addCanvas', render.addLayer);

    network.on('render', render.draw);
    
    network.on('setControls', controls.configure);
    
    controls.keystream.onValue(function (val) {
      network.emit('keystream', val);
    });
  };

  return Object.freeze({ connect });
};
