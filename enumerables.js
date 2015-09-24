Array.prototype.myUniq = function() {
  var uniqueArray = [];
  for (var i = 0; i < this.length; i++) {
    if (uniqueArray.indexOf(this[i]) === -1) {
      uniqueArray.push(this[i]);
    }
  }
  return uniqueArray;
};

Array.prototype.twoSum = function() {
  var pairs = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        pairs.push([i,j]);
      }
    }
  }
  return pairs;
};

Array.prototype.myTranspose = function() {
  var transposed = [];
  for (var i = 0; i < this.length; i++) {
    var newRow = [];
    for (var j = 0; j< this[i].length; j++) {
      newRow.push(this[j][i]);
    }
    transposed.push(newRow);
  }
  return transposed;
};

// console.log([
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8]
//   ].myTranspose());

Array.prototype.myEach = function(callback) {
  for (var i=0; i< this.length; i++) {
    callback(this[i]);
  }
  return this;
};

Array.prototype.myMap = function(callback) {
  var mapped = [];
  this.myEach(function(el) {
    mapped.push(callback(el));
  });

  return mapped;
};

// console.log([1,2,3].myMap(function(el) { return el + 1; }));

Array.prototype.myInject = function(callback, accumulator) {
  if (!accumulator) {
    accumulator = this.shift();
  }

  this.myEach(function(el) {
    accumulator = callback(el, accumulator);
  });
  return accumulator;
};

// console.log([1,2,3].myInject(function(el, acc) { return el + acc;}, 1));

Array.prototype.bubbleSort = function() {
  var sorted = false;
  while (!sorted) {
    sorted = true;
    for (var i=0; i< (this.length-1); i++) {
      if (this[i] > this[i+1]) {
        var temp = this[i];
        this[i] = this[i+1];
        this[i+1] = temp;
        sorted = false;
      }
    }
  }
  return this;
};

// console.log([4,5,2,1,2,4,9,1,2,2,32,12,56,23,76,3].bubbleSort());

String.prototype.substrings = function() {
  var subs = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = (i + 1); j < (this.length + 1); j++) {
      subs.push(this.slice(i,j));
    }
  }
  return subs;
};

// console.log("cat".substrings());
