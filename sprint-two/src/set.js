var Set = function(){
  var newSet = Object.create(setPrototype);
  newSet._storage = {};
  return newSet;
};

var setPrototype = {};

setPrototype.add = function(item){
	this._storage[item] = item;
};

setPrototype.contains = function(item){
	return item in this._storage;
};

setPrototype.remove = function(item){
	if(this.contains(item)){
		delete this._storage[item];
	}
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
