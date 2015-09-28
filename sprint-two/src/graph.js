

var Graph = function(){
	 this.nodes = [];
	 this.edges = [];

	 // var nodes = {};
};

Graph.prototype.addNode = function(node){
	
	//add node to nodes object using node as key
	this.nodes.push(node);

	// //create some kind of adjacent list that store all the 
	// //adjacent node to our node
	// this.nodes[node].adjacentNodes = [];
};

Graph.prototype.contains = function(node){
	return this.nodes.indexOf(node) !== -1;
};

Graph.prototype.removeNode = function(node){
	if(this.contains(node)){
		this.nodes.splice(this.nodes.indexOf(node) - 1, 1);
	}
};

Graph.prototype.hasEdge = function(fromNode, toNode){
	for(var i = 0; i < this.edges.length; i++){
		if (this.edges[i].indexOf(fromNode) !== -1 && this.edges[i].indexOf(toNode) !== -1) {
			return true;
		}
	}
	return false;
};

Graph.prototype.addEdge = function(fromNode, toNode){
	this.edges.push([fromNode, toNode]);
};

Graph.prototype.removeEdge = function(fromNode, toNode){
	var index;
	var i;
	if(this.edges.hasEdge(fromNode, toNode)){
		for(i = 0; i < this.edges.length; i++){
			if (this.edges[i].indexOf(fromNode) !== -1 && this.edges[i].indexOf(toNode) !== -1) {
				index = i;
			}
		}
	}

	if(index){
		this.edges.splice(i, 1);
	}
};

Graph.prototype.forEachNode = function(cb){
	var i;
	for (i = 0; i < this.nodes.length; i++) {
		 cb(this.nodes[i]);
	}
};



/*
 * Complexity: What is the time complexity of the above functions?
 */



