const fs = require("fs");
const { serialize } = require("v8");
let grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(""));

function checkNeighbors(row, col) {
  let val = grid[row][col];

  if (row > 0) {
    if (grid[row - 1][col] <= val) {
      return false;
    }
  }
  if (row < grid.length - 1) {
    if (grid[row + 1][col] <= val) {
      return false;
    }
  }
  if (col > 0) {
    if (grid[row][col - 1] <= val) {
      return false;
    }
  }
  if (col < grid[0].length - 1) {
    if (grid[row][col + 1] <= val) {
      return false;
    }
  }
  return true;
}

let lowPoints = [];

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (checkNeighbors(i, j)) {
      lowPoints.push([i,j]);
    }
  }
}

let basins = [];

lowPoints.forEach(point => {
  let[i,j] = point;
  traverseBasin(i,j)

})

function traverseBasin(row,col){
  let visited = {};
  let size = 0;

  let queue = [[row,col]];


  while(queue.length > 0){
    let [i,j] = queue.shift();

    if(visited[`${i},${j}`] !== true && grid[i][j] !== '9'){
      size += 1;
      visited[`${i},${j}`] = true;
      if(i > 0){
        queue.push([i-1, j])
      }
      if(i < grid.length - 1){
        queue.push([i+1, j])
      }
      if(j > 0){
        queue.push([i, j-1])
      }
      if(j < grid[0].length - 1){
        queue.push([i, j+1])
      }
    }
  }
  basins.push(size)
}

basins = basins.sort((a, b) => b-a)

console.log(basins)

console.log(basins[0] * basins[1] * basins [2])
