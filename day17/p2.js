let input = "target area: x=277..318, y=-92..-53".slice(15).split(", y=");

let [xMin, xMax] = input[0].split("..").map((el) => parseInt(el));
let [yMin, yMax] = input[1].split("..").map((el) => parseInt(el));

let validX = calcValidX();

function calcValidX() {
  let valids = [];

  for (let i = 1; i <= xMax; i++) {
    let [valid, ticks] = simulateX(i);

    if (valid === true) {
      valids.push([i, ticks]);
    }
  }
  return valids;
}

function simulateX(v) {
  let xPos = 0;
  let searching = true;
  let numTicks = 0;

  while (searching) {
    xPos += v;
    numTicks += 1;
    v -= 1;

    if (xMin <= xPos && xPos <= xMax) {
      //valid velocity
      return [true, numTicks];
    } else if (v <= 0) {
      return [false, null];
    }
  }
}

function calcMaxY(vX) {
  let i = yMin;
  let searching = true;

  let hits = [];

  while (searching) {
    let [outcome, newMax] = simulateThrow(vX, i);

    // console.log(vX, i, outcome, newMax)

    if (i > 1000) {
      searching = false;
    }

    if (outcome === "toolow") {
      i += 1;
    } else if (outcome === "hit") {
      console.log("hit, ", vX, i)
      hits.push([vX, i])

      i += 1;
    } else if (outcome === "toohigh") {
      searching = false;
    }
  }

  return hits;
}

function simulateThrow(vX, vY) {
  let pos = [0, 0];
  let maxY = 0;
  let possible = true;
  let outcome;

  while (possible) {
    pos[0] += vX;
    pos[1] += vY;

    if (pos[1] > maxY) {
      maxY = pos[1];
    }

    if (vX > 0) {
      vX -= 1;
    }
    vY -= 1;

    if (inBounds(pos)) {
      outcome = "hit";
      return [outcome, maxY];
    } else if (pos[1] < yMin) {
      return ["toolow", null];
    } else if (pos[0] > xMax && pos[1] > yMax) {
      return ["toohigh", null];
    }
  }

  return [outcome, maxY];
}

function inBounds(pos) {
  const [x, y] = pos;
  if (xMin <= x && x <= xMax && yMin <= y && y <= yMax) {
    return true;
  }
  return false;
}

let max = yMin;

let count = 0;

for (let item of validX) {
  let hits = calcMaxY(item[0]);

  count += hits.length;
  console.log(hits);
}


console.log(count)
// start tossing at minimum y velocity
// if it hits get the max height
// if the height goes below ymin its a miss and we increase
// if the x goes past xmax its a miss, and if y is still above ymax we hit our limit on height and we stop for this one
