var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  	var newStack = {};
  	newStack.length = 0;
  	newStack.storage = {};
  	extend(newStack, stackMethods);

  	return newStack;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var stackMethods = {};

stackMethods.push = function (value) {
	this.storage[this.length] = value;
	this.length++;
}

stackMethods.pop = function () {
	if(this.length > 0){
		this.length--;
	}
	return this.storage[this.length];
}

stackMethods.size = function () {
	return this.length;
}