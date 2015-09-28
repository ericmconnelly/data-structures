var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = Object.create(queueMethods);
  newQueue.length = 0;
  newQueue.storage = {};

  return newQueue;
};

var queueMethods = {
	size : function () {
		return this.length;
	},
	enqueue : function (value) {
		this.storage[++this.length] = value;
	},
	dequeue : function () {
		var result;
		var key;

		if(this.length > 0){
			this.length--;
			result = this.storage[1];
			delete this.storage[1];
			for (key in this.storage) {
				this.storage[key - 1] = this.storage[key];
			}
		}
		return result;
	}
};