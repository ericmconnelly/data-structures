var HashTable = function(){
  this._entryCount = 0;
  this._limit = 8;
  this._setStorage();
};


HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  //set this collison bucket to a default if there isn't one there already 
  this._storage.set(i, this._storage.get(i) || new LinkedList());
  
  var collisionsList = this._storage.get(i);

  var entryTuple;

  collisionsList.each(function(node){
    if(node.value[0] === k){
      entryTuple = node.value;
    }
  });

  if(!entryTuple){
    collisonsList.addToTail([k,v]);
    this._entryCount++;
    this._checkResize();
  }else{
    entryTuple[1] = v;
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var result = null;
  var temp = this._storage.get(i);
  while(temp !== null){
    if(temp.key === k){
      result = temp.value;
    }
    temp = temp.next;
  }
  return result;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[i] && this._storage[i].removeNode) {
    var remove = this._storage[i].removeNode(k);
    this._entryCount--;
    this._checkResize();
    // console.log("after removing: " + remove + " at key " + k)
    // console.log(this._storage_size);
  }
};

HashTable.prototype._checkResize = function(){
  if(this._entryCount > .75 * this._limit){
    this._increaseSize();
  }else if (this._entryCount < .25 * this._limit){
    this._decreaseSize();
  }
};


HashTable.prototype._increaseSize = function(){
  var oldLimit = this._limit;
  var oldStorage = this._storage;
  this._limit = this._limit * 2;
  var oldStorage = this._storage;
  this._setStorage();
  var that = this;
  oldStorage.each(function(collisionsList){
    collisionsList.each(function(node){
      that.insert(node.value[0], node.value[1]);
    });
  });
};

HashTable.prototype._setStorage= function(){
  this._storage = this._makeLimitedArray(this._limit);
};

HashTable.prototype._makeLimitedArray= function(limit){
    return LimitedArray(limit);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
