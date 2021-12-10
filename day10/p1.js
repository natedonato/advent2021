const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(""));

const dict = { "{": "}", "[": "]", "(": ")", '<': '>' };

let illegals = [];

for (const line of input) {
  let stack = [];

  while (line.length > 0) {
    let nextChar = line.shift();

    if ("[{(<".includes(nextChar)) {
      stack.push(nextChar);
    } else {
      let expected = dict[stack.pop()];
      if(expected !== nextChar){
        console.log(`Expected ${expected}, but found ${nextChar}`);
        illegals.push(nextChar);
        break;
      }
    }
  }
}

let scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

let total = 0;
for(const char of illegals){
  total += scores[char] 
}

console.log(total)