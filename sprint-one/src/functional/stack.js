var Stack = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var key = 0;

  // Implement the methods below
  someInstance.push = function(value){
    key++;
    storage[key] = value;
  };

  someInstance.pop = function(){

    if(key > 0)
      key--;
    return storage[key+1];
  };

  someInstance.size = function(){
    return key;
  };

  return someInstance;
};
