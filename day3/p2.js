const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

let idx = 0;

let list = input;

while(list.length > 1){
  let ones = 0;
  let zeroes = 0;

  for(const item of list){
    if(item[idx] === "0"){
      zeroes += 1;
    }else{
      ones += 1;
    }
  }

  if(ones >= zeroes){
    list = list.filter(el => el[idx] === '1')
  }else{
    list = list.filter(el => el[idx] === "0")
  }

  idx += 1;
}

const oxygen = list[0];

list = input;
console.log(list);
idx = 0;

while (list.length > 1) {
  let ones = 0;
  let zeroes = 0;

  for (const item of list) {
    if (item[idx] === "0") {
      zeroes += 1;
    } else {
      ones += 1;
    }
  }

  if(zeroes <= ones){
    list = list.filter((el) => el[idx] === "0");
  }else{
    list = list.filter((el) => el[idx] === "1");
  }

  idx += 1;
}

const co2 = list[0];

console.log("oxygen", oxygen);
console.log("co2", co2);

console.log("product: ", parseInt(oxygen, 2)*parseInt(co2, 2));