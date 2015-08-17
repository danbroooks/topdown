
var Render = function(){

};

var Factory = function(){
  return new Render();
};

Factory.Constructor = Render;

module.exports = Factory;

