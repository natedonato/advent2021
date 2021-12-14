const fs = require("fs");
let [dots, folds] = fs.readFileSync("input.txt", "utf8").split("\n\n");

dots = dots.split("\n").map((el) => el.split(",").map((el) => parseInt(el)));
folds = folds.split("\n").map((el) => el.slice(11));

let maxRows = 0;
let maxCols = 0;

for (const dot of dots) {
  let [y, x] = dot;
  if (x > maxRows) {
    maxRows = x;
  }
  if (y > maxCols) {
    maxCols = y;
  }
}

let grid = new Array(maxRows + 1)
  .fill(0)
  .map((el) => new Array(maxCols + 1).fill("."));

const pprint = () => {
  console.log("\n");
  for (const line of grid) {
    console.log(line.join(""));
  }
  console.log("\n");
};

for (const dot of dots) {
  let [y, x] = dot;
  grid[x][y] = "#";
}

const fold = (instruction) => {
  let [dir, val] = instruction.split("=");
  val = parseInt(val);

  if (dir === "y") {
    for (let i = val + 1; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "#") {
          grid[val - (i - val)][j] = "#";
        }
      }
    }
    grid = grid.slice(0, val);
  }

  if (dir === "x") {
    for (let i = 0; i < grid.length; i++) {
      for (let j = val + 1; j < grid[0].length; j++) {
        if (grid[i][j] === "#") {
          grid[i][val - (j - val)] = "#";
        }
      }
    }

    grid = grid.map((el) => el.slice(0, val));
  }
};

for (const inst of folds){
  fold(inst)
}

pprint()