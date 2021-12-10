const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').split("\n")
let count = 0;
input.forEach(line => {

  line.split(" | ")[1].split(' ').forEach(el => {
    let l = el.length;
    if(l === 2 || l === 4 || l === 3 || l === 7){
      count += 1;
    }
  });
})

console.log( count);
