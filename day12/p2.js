const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf8").split("\n");

let graph = {
  start: [],
  end: [],
};

function count(array, item) {
  return array.reduce((total,x) => (x===item ? total+1 : total), 0)
}

function addGraph(a, b) {
  if (graph[a] === undefined) {
    graph[a] = [];
  }
  if (graph[b] === undefined) {
    graph[b] = [];
  }
  graph[a].push(b);
  graph[b].push(a);
}

function isBig(planet) {
  if (planet === planet.toUpperCase()) {
    return true;
  }
  return false;
}

for (const line of input) {
  let [a, b] = line.split("-");
  addGraph(a, b);
}

let paths = [];
let queue = [["start", "start", false]];
while (queue.length > 0) {
  let [node, path, doubled] = queue.shift();

  // console.log("node", node)
  // console.log("path", path)

  if (node === "end") {
    paths.push(path);
  } else {
    let nextPlanets = graph[node];

    // console.log('Nextplanets: ', nextPlanets);

    nextPlanets.forEach((nextPlanet) => {
      if (isBig(nextPlanet)) {
        queue.push([nextPlanet, path + "," + nextPlanet, doubled]);
      } else {
        let previouslyVisited = count(path.split(","), nextPlanet);

        if (nextPlanet !== 'start'){
          if(previouslyVisited < 1){
            queue.push([nextPlanet, path + "," + nextPlanet, doubled]);
          }else if(previouslyVisited === 1 && doubled === false) {
            queue.push([nextPlanet, path + "," + nextPlanet, true]);
          }
        }
      }
    });
  }

  console.log(paths.length)
}


// paths = paths.filter((v, i, a) => a.indexOf(v) === i).sort();

console.log(paths.length);
