var BinarySearchTree = function(value){
	var newBST = Object.create(BinarySearchTreePrototype);
	newBST.value = value;
	newBST.left = null;
	newBST.right = null;
	return newBST;

};

var BinarySearchTreePrototype = {
	insert : function(value){
			
			if(value < this.value){
				if(!this.left){
					this.left = BinarySearchTree(value);
				}else{
					this.left.insert(value);
				}
			}else{
				if(!this.right){
					this.right = BinarySearchTree(value);
				}else{
					this.right.insert(value);
				}
			}
	},
	contains : function (target) {
		var searchFunction = function(parentNode){
				if(parentNode.value === target){
					return true;
				}else if(!!parentNode.left && parentNode.value > target){
					return searchFunction(parentNode.left);
				}else if(!!parentNode.right){
					return searchFunction(parentNode.right);
				}else{
					return false;
				}
		};

		return searchFunction(this);
	},
	depthFirstLog : function (callback) {

		

		var functionCB = function(node){
				if (node.left) {
					node.left.depthFirstLog(callback);
				}
				if (node.right) {
					node.right.depthFirstLog(callback);
				}
		};

		callback(this.value);
		functionCB(this);
	},

	breathFirstLog : function () {
		var newArr = [];
		var queue = [this];

		while(queue.length > 0){
			newArr.push(queue[0].value);
			//remove this from queue
			if (queue[0].left !== null) {
				//push this.left to queue
				queue.push(queue[0].left);
			}
			if (queue[0].right !== null) {
				//push this.left to queue
				queue.push(queue[0].right);
			}
			queue.splice(0, 1);
		}
		
		return newArr;
	}
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

