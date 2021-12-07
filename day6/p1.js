const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf8").split(",").map(el => parseInt(el));


// console.log(input);
for(let d = 0; d < 80; d++){
  let next = [];
  for(let i = 0; i < input.length; i++){
    if(input[i] === 0){
      next.push(8);
      input[i] = 6;
    }else{
      input[i] -= 1;
    }
  }
  input = input.concat(next);
  // console.log(input);
  // console.log(`after ${d+1} days: `, input.join(',') )
}

console.log(input.length )
