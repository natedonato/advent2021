const fs = require ('fs');
let input = fs.readFileSync('input.txt','utf8').split('\n');

let graph = { 
  'start': [],
  'end': [] 
};

function addGraph(a,b){
  if(graph[a] === undefined){
    graph[a] = []
  }
  if(graph[b] === undefined){
    graph[b] = [];
  }
  graph[a].push(b)
  graph[b].push(a)
}

function isBig(planet){
  if(planet === planet.toUpperCase()){
    return true;
  }
  return false;
}

for(const line of input){
  let [a,b] = line.split('-');
  addGraph(a,b);
}

let paths = [];
let queue = [['start','start']];
while(queue.length > 0){
  let [node, path] = queue.shift();

  // console.log("node", node)
  // console.log("path", path)

  if(node === 'end'){
    paths.push(path);
  }else{
    let nextPlanets = graph[node];

    // console.log('Nextplanets: ', nextPlanets);

    nextPlanets.forEach(nextPlanet => {

      if(isBig(nextPlanet)){
        queue.push([nextPlanet, path + "," + nextPlanet]);
      }else{
        let previouslyVisited = path.split(',');
        
        if(!previouslyVisited.includes(nextPlanet)){
          queue.push([nextPlanet, path + "," + nextPlanet]);
        }

      }


      // console.log('queue', queue)
    })


  }
}

console.log(paths)

console.log(paths.length)