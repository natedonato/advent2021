const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

let aim = 0;
let horizontalDistance = 0;
let depth = 0;

for (const item of input) {
  let [direction, value] = item.split(" ");
  value = parseInt(value);

  if (direction === "down") {
    aim += value;
  } else if (direction === "up") {
    aim -= value;
  } else {
    horizontalDistance += value;
    depth += aim * value;
  }
}

console.log("horizontal distance: ", horizontalDistance, "\ndepth: ", depth, "\nproduct: ", depth * horizontalDistance);