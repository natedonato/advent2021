const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

let gamma = ""
let epsilon = ""



for(let i = 0; i < input[0].length; i++){
  let zerocount = 0;
  let onecount = 0;
  for(let j = 0; j < input.length; j++){
    if(input[j][i] === "0"){
      zerocount += 1;
    }else{
      onecount += 1;
    }
  }
  if(zerocount > onecount){
    gamma += "0"
    epsilon += "1"
  }else{
    gamma += "1"
    epsilon += "0"
  }

}

console.log("gamma", gamma);
console.log("eps", epsilon)

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))