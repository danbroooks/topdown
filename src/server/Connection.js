
var Collection = require('../util/Collection');

var Connection = function(){

};

var Factory = function(){
  return new Connection();
};

Factory.Collection = function() {
  return Collection(function(o){
    return o instanceof Connection;
  });
};

Factory.Constructor = Connection;

module.exports = Factory;

