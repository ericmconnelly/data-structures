var Tree = function(value){
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me
  newTree.parent = null;
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
	var newChild = Tree(value);
	newChild.parent = this;
	this.children.push(newChild);
};

treeMethods.contains = function(target){
	var isFound = false;

	var searchTree = function(parent){
		if (parent.value === target) {
			isFound = true;
		}
		if (parent.children) {
			for (var i = 0; i < parent.children.length; i++) {
				searchTree(parent.children[i]);
			}
		}
	}

	searchTree(this);
	return isFound;
};

treeMethods.removeFromParent = function(){
	var temp;
	//if the tree has parent
	if (this.parent) {
		//store parent in temp
		temp = this.parent;
		//then set parent = null
		this.parent = null;
		//remove current from parent children
		temp.children.splice(temp.children.indexOf(this.value), 1);
	}
};


treeMethods.traverse = function(callback){
	var i;
	for (i = 0; i < this.children.length; i++) {
		callback(this.children[i]);
		if (this.children[i].children.length > 0) {
			this.children[i].traverse(callback);
		}
	}
};




/*
 * Complexity: What is
  the time complexity of the above functions?
 */
