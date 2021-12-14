const fs = require('fs')
let input = fs.readFileSync("input.txt", "utf8").split("\n");


let string = input[0];
let map = {};

let alphabet = {};
for(let i = 2; i < input.length; i++){
  let [key, val] = input[i].split(' -> ');
  map[key] = val;

  alphabet[key[0]] = true;
  alphabet[key[1]] = true;
  alphabet[val] = true;
}

console.log(map);

for(let i = 0; i < 10; i++){
  let j = 0;
  while(j < string.length - 1){

    // console.log("string", string)

    let sub = string.slice(j, j+2);

    // console.log('sub', sub)
    // console.log(string.slice(0,j + 1))
    // console.log(map[sub])
    // console.log(string.slice(j+1, string.length));

    string = string.slice(0, j+1) + map[sub] + string.slice(j+1, string.length)

    j += 2;
  }
  // console.log("step", i + 1)
  // console.log("new string", string);
}

function countChar(char){
  let count = 0;
  for(let i = 0; i < string.length; i++){
    if(string[i] === char){
      count += 1;
    }
  }
  return count;
}

let counts = []
for(const char of Object.keys(alphabet)){
  counts.push(countChar(char));
}

counts = counts.sort((a,b) => a - b);

console.log(counts[counts.length - 1] - counts[0])
