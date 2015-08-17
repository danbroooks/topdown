
var Network = function(){

};

var Factory = function(){
  return new Network();
};

Factory.Constructor = Network;

module.exports = Factory;

