
 var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newTailNode;
    var previousTailNode;
    if(list.tail){
      previousTailNode = list.tail;
      newTailNode = Node(value);
      previousTailNode.next = newTailNode;
      newTailNode.previous = previousTailNode;
      list.tail = newTailNode;
    } else { //null
      list.head = Node(value);
      list.tail = list.head;
    }
  };

  list.addToHead = function(value){
    var currentHeadNode;
    var newHeadNode;
    if(list.head){
      currentHeadNode = list.head;
      newHeadNode = Node(value);
      list.head.previous = newHeadNode;
      newHeadNode.next = currentHeadNode;
    } else { //null
      list.head = Node(value);
      list.head = list.tail;
    }
  };

  list.removeHead = function(){
    var result;
    //if head, get head value and set head to head.next
    if (list.head) {
      result = list.head.value;
      list.head = list.head.next;
    }
    return result;
  };

  list.removeTail = function(){
    var result;
    var temp;
    var previousNode;
    //if list.tail === list.head
    if(list.head === list.tail){
      list.head = null;
      list.tail = null;
    }else if(list.tail.previous !== null){
      temp = list.tail.value;
      previousNode = list.tail.previous;
      previousNode.next = null;
      list.tail = previousNode;
    }
    return temp;
   
  };

  list.each = function(callback){
    var temp = list.head;
    while(temp){
      callback(temp);
      temp = temp.next;
    }
  };

  list.contains = function(target){
    //loop through list and look for value
    var isFound = false;
    var pointer = list.head;
    while (pointer) {
      if (pointer.value === target) {
        isFound = true
      }
      pointer = pointer.next;
    }
    return isFound;
  };

  return list;
};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
