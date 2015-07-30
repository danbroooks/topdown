
var Connection = function(){

};

var Factory = function(){
  return new Connection();
};

Factory.Constructor = Connection;

module.exports = Factory;

