const fs = require("fs");
let grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split("").map((e) => parseInt(e)));
let dist = new Array(grid.length)
  .fill(0)
  .map(() => new Array(grid[0].length).fill(Infinity));

dist[0][0] = 0;

// x,y,dist
let queue = [[0, 0]];
let finished = false;

while (queue.length > 0 && !finished) {
  queue = queue.sort((p1, p2) => dist[p1[0]][p1[1]] - dist[p2[0]][p2[1]]);

  let node = queue.shift();
  let [x, y] = [node[0], node[1]];
  let nodeDist = dist[x][y];

  if (x > 0) {
    if (dist[x - 1][y] === Infinity) {
      dist[x - 1][y] = nodeDist + grid[x - 1][y];
      queue.push([x - 1, y]);
    }
  }
  if (x < grid.length - 1) {
    if (dist[x + 1][y] === Infinity) {
      dist[x + 1][y] = nodeDist + grid[x + 1][y];
      queue.push([x + 1, y]);
    }
  }
  if (y > 0) {
    if (dist[x][y - 1] === Infinity) {
      dist[x][y - 1] = nodeDist + grid[x][y - 1];
      queue.push([x, y - 1]);
    }
  }
  if (y < grid[0].length - 1) {
    if (dist[x][y + 1] === Infinity) {
      dist[x][y + 1] = nodeDist + grid[x][y + 1];
      queue.push([x, y + 1]);
    }
  }

  // console.log(x, y, nodeDist);
}



console.log(dist.map(el => el.join(',')))