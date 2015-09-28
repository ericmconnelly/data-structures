// var HashTable = function(){
//   this._storage_size = 0;
//   this._limit = 8;
//   this._storage = LimitedArray(this._limit);
// };


// HashTable.prototype.insert = function(k, v){
//   var i = getIndexBelowMaxForKey(k, this._limit);

//   if(!this._storage[i]){
//     var chainHead = SeparateChaining();
//     chainHead.addToTail(k,v);
//     this._storage[i] = chainHead;
//     this._storage_size++;
//     console.log("adding value: " + v +" using key: " + k);
//     console.log("after insert:");
//     console.log(this._storage_size);
//   }else{
//     this._storage[i].addToTail(k, v);
//     this._storage_size++;
//     console.log("adding value: " + v +" using key: " + k);
//     console.log("after insert:");
//     console.log(this._storage_size);
//   }


//   this.resize();
// };

// HashTable.prototype.retrieve = function(k){
//   var i = getIndexBelowMaxForKey(k, this._limit);
//   var result = null;
//   var temp = this._storage[i].head;
//   while(temp !== null){
//     if(temp.key === k){
//     result = temp.value;
//     }
//     temp = temp.next;
//   }
//   return result;
// };

// HashTable.prototype.remove = function(k){
//   var i = getIndexBelowMaxForKey(k, this._limit);
//   if (this._storage[i] && this._storage[i].removeNode) {
//   var remove = this._storage[i].removeNode(k);
//     this._storage_size--;
//     console.log("after removing: " + remove + " at key " + k)
//     console.log(this._storage_size);
//   }


//   this.resize();

// };

// HashTable.prototype.resize = function(){
//   // console.log(this._storage.storage);
//   var loadFactor = Math.ceil((this._storage_size / this._limit ) * 100);
//   var resize = false;
//   var newLimit;
//   var newArr;

//   if(loadFactor >= 75){
//   resize = true;
//   newLimit = this._limit * 2;
//   } else if (loadFactor < 12.5 && this._limit >= 16) {
//   resize = true;
//   newLimit = this._limit / 2;
//   } else{
//     resize = false;
//   }

//   // console.log(loadFactor);
//   // console.log(resize);
//   // console.log(this._storage_size);

//   if (resize) {
//   this._limit = newLimit;
//     console.log("THIS IS THE LIMIT");
//     console.log(newLimit);
//     newArr = LimitedArray(this._limit);

//     for(var i = 0; i < this._storage.length; i++){
//           newArr.set(i, this._storage.get(i));
//     }
//     this._storage = newArr;
//   }
// };


//  var SeparateChaining = function(){
//   var sc = {};
//   sc.head = null;
//   sc.tail = null;

//   sc.addToTail = function(key, value){
//     if(sc.tail){
//       sc.tail.next = ChainNode(key, value);
//       sc.tail = sc.tail.next;
//     } else { //null
//       sc.head = ChainNode(key, value);
//       sc.tail = sc.head;
//     }
//   };

//   sc.removeNode = function(key){
//     var temp;

//     //if head, get head value and set head to head.next
//     if (sc.head.key === key) {
//       temp = sc.head.value;
//       sc.head = sc.head.next;
//       return temp;
//      }else{
//      var traverseSC = function(parentNode, node){
//      if(node.key === key){
//      // node.value = null;
//           temp = node.value;
//      parentNode.next = node.next;
//           return temp;
//      }else if(!node.next){
//        traverseSC(node, node.next);
//      }
//      }

//      return traverseSC(sc.head, sc.head.next);
//     }
//   };

//   sc.contains = function(target){
//     //loop through sc and look for value
//     var isFound = false;
//     var pointer = sc.head;
//     while (pointer) {
//       if (pointer.value === target) {
//         isFound = true
//       }
//       pointer = pointer.next;
//     }
//     return isFound;
//   };

//   return sc;
// };

// var ChainNode = function(key, value){
//   var scNode = {};

//   scNode.key = key;
//   scNode.value = value;
//   scNode.next = null;

//   return scNode;
// };

  

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
  var bucket = this._storage.get(i) || [];


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

