describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree();
  });

  it('should have methods named "addChild", "contains", "removeFromParent" and "traverse", and a property named "value" and "parent"', function() {
    expect(tree.addChild).to.be.a("function");
    expect(tree.contains).to.be.a("function");
    expect(tree.removeFromParent).to.be.a("function");
    expect(tree.traverse).to.be.a("function");
    expect(tree.hasOwnProperty("value")).to.equal(true);
    expect(tree.hasOwnProperty("parent")).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function(){
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function(){
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('should correctly remove parent children from node', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.children[1].children[0].addChild(9);
    // console.log(tree);
    tree.children[1].children[0].removeFromParent();
    // console.log(tree);

    expect(tree.contains(9)).to.equal(false);
  });

  it('should correcty traverse the tree', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.children[1].children[0].addChild(9);
    //tree.traverse(function(v))
    // console.log(tree);
    // tree.children[1].children[0].removeFromParent();
    // console.log(tree);

    tree.traverse(function(item) {
      item.value = item.value + 1;
    });

    expect(tree.contains(10)).to.equal(true);

  });




});
