
var Server = function(){

};

var Factory = function(){
  return new Server();
};

Factory.Constructor = Server;

module.exports = Factory;

