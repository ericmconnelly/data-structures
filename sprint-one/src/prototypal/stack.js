var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newStack = Object.create(stackMethods);
  newStack.length = 0;
  newStack.storage = {};

  return newStack;
};

var stackMethods = {

	size : function(){
		return this.length;
	},

	push : function(value){
		this.storage[++this.length] = value;
	},

	pop : function(){
		var result;
		if(this.length > 0)
			this.length--;

		result = this.storage[this.length+1];
		delete this.storage[this.length+1];

		return result;
	}
};


