const fs = require("fs");
let input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split("").map((el2) => parseInt(el2)));

let flashes = 0;

const pprint = () => {
  console.log("\n");
  for (const line of input) {
    console.log(line.join(","));
  }
  console.log("\n");
};

for(let i = 0; i < 100; i++){
  step(input);
}

pprint();

function step() {
  let flashing = false;

  // increase all by one
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      input[i][j] += 1;
      if (input[i][j] > 9) {
        flashing = true;
      }
    }
  }

  pprint();

  while (flashing) {
    flashing = false;

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] > 9) {
          // console.log(i, j, input[i][j]);

          flash(i, j);
          flashing = true;
        }
      }
    }
    pprint();
  }

  console.log("not flashing");

  pprint();
}

console.log(flashes)

function flash(i, j) {
  flashes += 1;
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
