const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n");

let h = 0;
let d = 0;

for(const item of input){
  let [direction, value] = item.split(" ");
  value = parseInt(value);

  if(direction === "forward"){
    h += value;
  }else if (direction === "down"){
    d += value;
  }else{
    d -= value;
  }

}

console.log("horizontal distance: ", h, "\ndepth: ", d, "\nproduct: ", d* h)