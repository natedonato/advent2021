const fs = require('fs')
let grid = fs.readFileSync('input.txt', 'utf8').split('\n').map(el => el.split(""));

function checkNeighbors(row, col) {
  let val = grid[row][col]

  if(row > 0){
    if(grid[row-1][col] <= val){
      return false;
    }
  }
  if(row < grid.length - 1){
    if(grid[row+1][col] <= val){
      return false;
    }
  }
  if(col > 0){
    if(grid[row][col-1] <= val){
      return false;
    }
  }
  if(col < grid[0].length - 1){
    if(grid[row][col+1] <= val){
      return false;
    }
  }
  return true;
}

let riskLevel = 0;

for(let i = 0; i < grid.length; i++){
  for(let j = 0; j < grid[0].length; j++){
    if(checkNeighbors(i,j)){
      let val = parseInt(grid[i][j])
      riskLevel += val;
      riskLevel += 1;
      console.log(grid[i][j])
    }
  }
}

console.log(riskLevel)