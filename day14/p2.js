const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf8").split("\n");

let string = input[0];
let map = {};
let pairs = {};

let alphabet = {};
for (let i = 2; i < input.length; i++) {
  let [key, val] = input[i].split(" -> ");

  map[key] = [key[0] + val, val+ key[1], val];
  pairs[key] = 0;

  alphabet[key[0]] = 0;
  alphabet[key[1]] = 0;
  alphabet[val] = 0;
}

console.log(map);

// track num of each character and num of each pair to start

for (let i = 0; i < string.length; i++) {
  alphabet[string[i]] += 1;
}

for (let i = 0; i < string.length - 1; i++) {
  let pair = string[i] + string[i + 1];

  if (pairs[pair] === undefined) {
    pairs[pair] === 1;
  } else {
    pairs[pair] += 1;
  }
}

// console.log(alphabet);
// console.log(pairs)

for(let i = 0; i < 40; i++){
  console.log(pairs)
  let nextSet = {...pairs}


  for(const currentPair of Object.keys(pairs)){

    
    let [next1, next2, nextLetter] = map[currentPair];
    
    let currentCount = pairs[currentPair]; 

    nextSet[currentPair] -= currentCount;
    nextSet[next1] += currentCount;
    nextSet[next2] += currentCount;
    alphabet[nextLetter] += currentCount;

  }

  pairs = nextSet;
}

console.log(pairs)
console.log(alphabet)

let ans = Object.values(alphabet).sort((a,b) => a-b)
console.log(ans[ans.length - 1] - ans[0])