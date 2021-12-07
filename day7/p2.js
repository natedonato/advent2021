const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split(",")
  .map((el) => parseInt(el))
  .sort((a, b) => a - b);


const mem = {};

const fuelMem = (distance) => {
  if(distance === 0){
    return 0;
  }
  if(distance === 1){
    return 1;
  }
  if(mem[distance]){
    return mem[distance];
  }

  const fuel = distance + fuelMem(distance - 1)
  mem[distance] = fuel
  return fuel;
}

const calcFuel = (position) => {
  let fuel = 0;
  input.forEach((el) => (fuel += fuelMem(Math.abs(el - position))));
  return fuel;
};

let min = [-1, Infinity];

for (let i = 0; i < input[input.length - 1]; i++) {
  const fuel = calcFuel(i);
  if (min[1] > fuel) {
    min = [i, fuel];

  }
  console.log(i, fuel);

}

console.log(min)