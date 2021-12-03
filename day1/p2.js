const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => parseInt(el));

let sum = input[0] + input[1] + input[2];
let count = 0;
for(let i = 3; i < input.length; i++){
  let sum2 = sum - input[i-3] + input[i];
  if(sum2 > sum){
    ++count;
  }
  sum = sum2;
}

console.log(count);