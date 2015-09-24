function range(start, end) {

  if ( end < start) {
    return [];
  }
  var final = [start];
  return final.concat(range(start+1, end));
}

// console.log(range(1,5));

function sum(array) {
  var s = 0;
  for(var i=0;i<array.length; i++){
    s += array[i];
  }
  return s;
}

// console.log(sum([1,3,5,6]));

function recursiveSum(array){
  if (array.length < 2 ) {
    return array[0];
  }

  return array[0] + recursiveSum(array.slice(1,array.length));
}

// console.log(recursiveSum([8,9,10]));

function exp(b, n){
  if (n === 0) {
    return 1;
  } else if (n ===1) {
    return b;
  }
  return b*exp(b, n-1);
}

// console.log(exp(4,4));

function exp2(b, n) {
  if (n === 0) {
    return 1;
  } else if (n ===1) {
    return b;
  } else if ( n % 2 === 0 ) {
    var half = exp2(b, n/2);
    return half * half;
  } else {
    var half2 = exp2(b, (n-1)/2);
    return b * half2 * half2;
  }
}

// console.log(exp2(4,5));

function fibs(n) {
  if (n === 1) {
    return [1];
  } else if (n === 2) {
    return [1,1];
  }

  var lastFibs = fibs(n-1);
  var l = lastFibs.length;
  lastFibs.push(lastFibs[l-1] + lastFibs[l-2]);
  return lastFibs;
}

// console.log(fibs(7));

function bsearch(array, target) {
  if (array.length < 2) {
    if (array[0] === target) {
      return 0;
    } else {
      return -1;
    }
  }
  var pivot_index = Math.floor(array.length/2);

  if (array[pivot_index] === target) {
    return pivot_index;
  } else if (target < array[pivot_index]) {
    return bsearch(array.slice(0, pivot_index), target);
  } else {
    var result = bsearch(array.slice(pivot_index + 1, array.length), target);
    if (result === -1) {
      return -1;
    }else {
    return result + (pivot_index + 1);
    }
  }
}

// console.log(bsearch([1,2,4,6,8,9,10], 9));
function makeChange(amount, coins) {
  if (amount < coins[coins.length-1]) {
    return [];
  }

  var bestChange = -1;
  coins.forEach(function(coin) {
    if (coin > amount) {
    } else {
      var currentChange = [coin].concat(makeChange(amount - coin, coins));

      if (currentChange === [] || sum(currentChange) !== amount) {
        return [];
      } else {
        if (currentChange.length < bestChange.length || bestChange === -1) {
          bestChange = currentChange;
        }
      }
    }
  });
  return bestChange;
}

// console.log(makeChange(14,[10,7, 2]));

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  var left = array.slice(0, Math.floor(array.length / 2));
  var right = array.slice(Math.floor(array.length / 2), array.length);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  var final = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] < arr2[0]) {
      final.push(arr1.shift());
    } else {
      final.push(arr2.shift());
    }
  }
  return final.concat(arr1).concat(arr2);
}

// console.log(mergeSort([4,3,67,7,8,4,3,2,9]));

function subsets(array) {
  if (array.length < 1) {
    return [[]];
  }

  var subs = subsets(array.slice(0,array.length-1));
  return subs.concat(subs.map(function(el) { return el.concat([array[array.length-1]]); }));
}

// console.log(subsets([1,2,3]));
