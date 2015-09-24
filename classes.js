function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return this.owner + " loves " + this.name;
};

var c = new Cat("Markov", "Ned");
var f = new Cat("Curie", "Kush");
console.log(c.cuteStatement());

Cat.prototype.cuteStatement = function() {
  return "Everyone loves " + this.name;
};

Cat.prototype.meow = function() {
  return "meow";
};
console.log(c.cuteStatement());
console.log(c.meow());

c.meow = function() {
  return "mew";
};

console.log(c.meow());
console.log(f.meow());
