
var FileSystem = function(){

};

var Factory = function(){
  return new FileSystem();
};

Factory.Constructor = FileSystem;

module.exports = Factory;
