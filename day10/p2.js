const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(""));

const dict = { "{": "}", "[": "]", "(": ")", "<": ">" };

const scores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

let scoreCollection = [];

for (const line of input) {
  let stack = [];
  let invalid = false;

  while (line.length > 0) {
    let nextChar = line.shift();

    if ("[{(<".includes(nextChar)) {
      stack.push(nextChar);
    } else {
      let expected = dict[stack.pop()];
      if (expected !== nextChar) {
        invalid = true;
        break;
      }
    }
  }

  let complete = [];
  if(!invalid){
    stack.reverse().forEach(char => {
      complete.push(dict[char])
    })

    let score = 0;
    complete.forEach(char => {
      score = score * 5 + scores[char]
    })

    scoreCollection.push(score);
  }
}

scoreCollection = scoreCollection.sort((a,b) => a-b)

console.log(scoreCollection[Math.floor(scoreCollection.length / 2)])
