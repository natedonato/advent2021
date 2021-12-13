const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split("").map((el2) => parseInt(el2)));

const pprint = () => {
  console.log("\n");
  for (const line of input) {
    console.log(line.join(","));
  }
  console.log("\n");
};

let searching = true;
let steps = 0;

while(searching){
  step(input)
  steps += 1;
}

function step() {
  let flashing = false;
  let num_flashes = 0;

  // increase all by one
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      input[i][j] += 1;
      if (input[i][j] > 9) {
        flashing = true;
      }
    }
  }

  while (flashing) {
    flashing = false;

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] > 9) {
          // console.log(i, j, input[i][j]);
          num_flashes += 1;
          flash(i, j);
          flashing = true;
        }
      }
    }
  }


  pprint();
  if(num_flashes >= 100){
    console.log(steps + 1)
    searching = false;
  }
  
}


function flash(i, j) {
  input[i][j] = 0;
  if (i > 0) {
    if (j > 0) {
      if (input[i - 1][j - 1] !== 0) {
        input[i - 1][j - 1] += 1;
      }
    }
    if (j < input[0].length - 1) {
      if (input[i - 1][j + 1] !== 0) {
        input[i - 1][j + 1] += 1;
      }
    }
    if (input[i - 1][j] !== 0) {
      input[i - 1][j] += 1;
    }
  }

  if (i < input.length - 1) {
    if (j > 0) {
      if (input[i + 1][j - 1] !== 0) {
        input[i + 1][j - 1] += 1;
      }
    }
    if (j < input[0].length - 1) {
      if (input[i + 1][j + 1] !== 0) {
        input[i + 1][j + 1] += 1;
      }
    }
    if (input[i + 1][j] !== 0) {
      input[i + 1][j] += 1;
    }
  }

  if (j > 0) {
    if (input[i][j - 1] !== 0) {
      input[i][j - 1] += 1;
    }
  }
  if (j < input[0].length - 1) {
    if (input[i][j + 1] !== 0) {
      input[i][j + 1] += 1;
    }
  }
}
