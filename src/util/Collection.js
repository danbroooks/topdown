
var Collection = function(){

};

var Factory = function(){
  return new Collection();
};

Factory.Constructor = Collection;

module.exports = Factory;

