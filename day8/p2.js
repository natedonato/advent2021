const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf8").split("\n");


let sum = 0; 

input.forEach((line) => {


  let [first, second] =  line.split(" | ")
  let nums = first.split(" ").map(el => el.split('').join("")).sort((a,b) => a.length - b.length);
  nums.unshift('')
  


  const key = {1: nums[1], [nums[1]]: 1, 4: nums[3], [nums[3]]: 4, 7: nums[2], [nums[2]]: 7, 8: nums[10], [nums[10]]: 8}
  
  for(let i = 7; i <= 9; i++){

    let currentNum = nums[i]
    if(!contains(currentNum, key[1])){
      key[6] = currentNum;
      key[currentNum] = 6;
    }else if(contains(currentNum, key[4])){
      key[9] = currentNum;
      key[currentNum] = 9;
    }else{
      key[0] = currentNum;
      key[currentNum] = 0;
    }
  }

  for(let i = 4; i <= 6; i++){
    let currentNum = nums[i]

    if(contains(currentNum, key[1])){
      key[3] = currentNum;
      key[currentNum] = 3
    }else if(contains(key[9], currentNum)){
      key[5] = currentNum;
      key[currentNum] = 5
    }else{
      key[2] = currentNum;
      key[currentNum] = 2
    }
  }



  let decoder = {};

  Object.keys(key).forEach(k => {
    let sorted = String(k).split('').sort().join('')
    decoder[sorted] = key[k]
  })

  second = second.split(" ").map((el) => String(el).split("").sort().join(""));
  let num = ""

  for(let digit of second){
    num += decoder[digit]
  }

  sum += parseInt(num)
});

console.log(sum)

function contains(big, small){
  for(const char of small.split('')){
    if(!big.includes(char)){
      return false;
    }
  }
  return true;
}
