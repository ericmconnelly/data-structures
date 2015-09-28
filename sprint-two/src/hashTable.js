// /*
//  * Complexity: What is the time complexity of the above functions?
//  */

var HashTable = function(){
  this._entryCount = 0;
  this._limit = 8;

  this._storage = LimitedArray(this._limit);
  this._lowerLimit = 0.25;
  this._upperLimit = 0.75;
};


HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i) || LinkedList();


  // 2 cases
    //  when key never get stored
    //  when key previously have been stored(collision)


  // when key previously have been stored
  // replace that key with new value
    var entryTuple;
    for(var j = 0; j < bucket.length; j++){
      entryTuple = bucket[j];
      if(entryTuple[0] === k){
        entryTuple[1] = v;
        return;
      }
    }

    // _.each(bucket, function(tuple){
    //   if(tuple[0] ===k){
    //     tuple[1] = v;
    //   }
    // });
  
    bucket.push([k,v]);
    this._entryCount++;
    if( this._entryCount > 0.75 * this._limit ){
      this._resize( this._limit * 2 );
    }
    // this._checkResize();
    this._storage.set(i, bucket);
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i) || [];
  var tuple;
  // _.each(bucket, function(tuple){
  //     if(tuple[0] === k){
  //       return tuple[1];
  //     }
  // });
  
  for(var j = 0; j < bucket.length; j++){
    tuple = bucket[j];
    if(tuple[0] === k){
      bucket.splice(j, 1);
      return tuple[1];
    }
  }

  return null;

};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i) || [];
  var tuple;
  // _.each(bucket, function(tuple, j){
  //     if(tuple[0] === k){
  //       bucket.splice(j, 1);
  //       this._entryCount--;
  //       this._checkResize();
  //       return tuple[1];
  //     }
  // });

  for(var j = 0; j < bucket.length; j++){
    tuple = bucket[j];
    if(tuple[0] === k){
      bucket.splice(j, 1);
      this._entryCount--;
      // this._checkResize();
      if( this._entryCount < 0.25 * this._limit ){
        this._resize( this._limit * 0.5 );
      }
      return tuple[1];
    }
  }
};


HashTable.prototype._checkResize = function(){
  if(this._entryCount > 0.75  * this._limit){
    this._resize(this._limit * 2);
  }else if (this._entryCount < 0.25 * this._limit){
     this._resize(this._limit * 0.5);
  }
};


HashTable.prototype._resize = function(newLimit){
  // var oldLimit = this._limit;
  var oldStorage = this._storage;
  this._limit = newLimit;
  this._entryCount = 0;
  this._storage = this._makeLimitedArray(newLimit);
  
  // this._setStorage();
  var that = this;

  oldStorage.each(function(bucket){
    if(!bucket){
      return;
    }
    for(var i = 0; i < bucket.length; i++){
      var tuple = bucket[i];
      that.insert(tuple[0], tuple[1]);
    }
  });
};


HashTable.prototype._makeLimitedArray= function(newLimit){
    return LimitedArray(newLimit);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

