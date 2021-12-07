const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').split(',').map(el => parseInt(el)).sort((a,b) => a-b);


const calcFuel = (position) => {
  let fuel = 0;
  input.forEach(el => fuel += Math.abs(el - position));
  return fuel;
}

let min = [-1, Infinity];

for(let i = 0; i < input[input.length - 1]; i++){
  const fuel = calcFuel(i)
  if(min[1] > fuel ){
    min = [i, fuel]

    console.log(min);
  }


}