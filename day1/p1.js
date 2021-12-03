const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => parseInt(el));

let last = input[0];
let increases = 0;
for(let i = 1; i < input.length; i++){
  let current = input[i];
  if(current > last){
    ++increases;
  } 
  last = current;
}

console.log(increases);