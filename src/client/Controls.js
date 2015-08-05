
var Controls = function(){

};

var Factory = function(){
  return new Controls();
};

Factory.Constructor = Controls;

module.exports = Factory;

