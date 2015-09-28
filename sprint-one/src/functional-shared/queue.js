var Queue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = {};
  newQueue.length = 0;
  newQueue.storage = {};
  extend(newQueue, queueMethods);
  return newQueue;
};

var queueMethods = {};	

queueMethods.size = function() {
	return this.length;
};

queueMethods.enqueue = function (value) {
	this.storage[++this.length] = value;
};

queueMethods.dequeue = function () {
	var result;
	var key;
	if(this.length > 0){
		this.length--;
		result = this.storage[1];
		delete this.storage[1];
		for(key in this.storage){
			this.storage[key - 1] = this.storage[key];
		}
	}
	return result;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};


