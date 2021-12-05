const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const grid = new Array(1000).fill(0).map((el) => new Array(1000).fill(0));

input.forEach((line) => {
  let [pointA, pointB] = line.split(" -> ");

  let [x1, y1] = pointA.split(",");
  let [x2, y2] = pointB.split(",");
  x1 = parseInt(x1);
  x2 = parseInt(x2);
  y1 = parseInt(y1);
  y2 = parseInt(y2);

  //vertical
  if (x1 === x2) {
    const endpoints = [y1, y2].sort((a, b) => a - b);
    for (let i = endpoints[0]; i <= endpoints[1]; i++) {
      grid[x1][i] += 1;
    }
  }
  //horizontal
  else if (y1 === y2) {
    const endpoints = [x1, x2].sort((a, b) => a - b);
    for (let i = endpoints[0]; i <= endpoints[1]; i++) {
      grid[i][y1] += 1;
    }
  } 
  // diagonal
  else {
    let endpoints = [[x1,y1],[x2,y2]].sort((a,b) => a[0] - b[0])
    let j = 0;
    let sign;
    endpoints[0][1] > endpoints [1][1] ? sign = -1 : sign = 1;

    for(let i = endpoints[0][0]; i <= endpoints[1][0]; i++){
      grid[i][endpoints[0][1] + (sign * j)] += 1;
      j += 1;
    }
  }
});

let overlaps = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] > 1) {
      overlaps += 1;
    }
  }
}

console.log(overlaps);
