'use strict'

var Keymap = require('../Keymap');

const key = (letter) => {
  if (Keymap[letter] !== undefined) {
    return Keymap[letter];
  }

  var msg = 'Method .key() was passed `' + letter + '` which is not a valid keymap option';
  throw new Error(msg);
};

module.exports = (connection) => {
  let id = connection.id;

  const on = (event, handler) => {
    connection.on(event, handler);
    return rc;
  };

  const emit = (event, data) => {
    connection.emit(event, data);
    return rc;
  };

  const addCanvas = name => emit('addCanvas', name)

  const setControls = config => emit('setControls', config);

  const render = (canvas, data) => emit('render', { canvas, data })

  const rc = Object.freeze({ id, on, key, addCanvas, setControls, render });

  return rc;
};
