const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split(",")
  .map((el) => parseInt(el));

let count = {};

for(const el of input){
  if(count[el] === undefined){
    count[el] = 0;
  }
  count[el] += 1;
}

for(let i = 0; i <= 8; i++){
  if (count[i] === undefined) {
    count[i] = 0;
  }
}


for (let d = 0; d < 256; d++) {
  let newBorns = count[0];
  for (let i = 1; i <= 8; i++) {
    count[i - 1] = count[i];
  }
  count[6] += newBorns;
  count[8] = newBorns;
  console.log("day", 1 + d);
  console.log(count);
  console.log(Object.values(count).reduce((ac, el) => ac + el));
}


console.log(Object.values(count).reduce((ac, el) => ac + el))