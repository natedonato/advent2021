const fs = require("fs");
let hex = fs.readFileSync("input.txt", "utf8");

let input = "";

const hex2bin = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

for (const char of hex.split("")) {
  input += hex2bin[char];
}

let versions = [];


console.log(input);

parsePacket();



function parsePacket() {
  // let trailing = true;
  // for(let i = 0; i < input.length; i++){
  //   if(input[i] !== 0){
  //     trailing = false;
  //     i = input.length;
  //   }
  // }
  console.log(input)
  let version = parseInt(input.slice(0, 3), 2);
  input = input.slice(3);
  versions.push(version);

  let typeId = parseInt(input.slice(0, 3), 2);
  input = input.slice(3);
  
  let totalLength = 6;

  console.log("version", version,"type", typeId);

  if (typeId === 4) {
    //literal packet
    console.log('literal packet');
    
    let literal = ""
    while(input[0] !== '0'){
      literal += input.slice(1,5)
      input = input.slice(5)
      totalLength += 5;
    }
    literal += input.slice(1, 5);
    input = input.slice(5);

    totalLength += 5;

    let value = parseInt(literal, 2)
    console.log('literal value: ')
    console.log(value);
    return totalLength;
  }else{
    console.log('operator packet')
    // operator packet
    let lengthId = input[0];
    input = input.slice(1)
    totalLength += 1;

    if(lengthId === '0'){

      //next 15 bits are total length of subpackets contained
      let subLength = parseInt(input.slice(0,15),2);
      input = input.slice(15);

      totalLength += 15;
      console.log("sub length")
      console.log(subLength)
      let currentLength = 0;

      while(currentLength < subLength){
        currentLength += parsePacket();
      }

      totalLength += subLength;
      return totalLength;
      console.log("packet parsed")
    }else{
      //next 11 bits are num of subpackets contained
      let numSubs = parseInt(input.slice(0, 11), 2);
      input = input.slice(11);
      totalLength += 11;
      
      let numPackets = 0;

      console.log("num subpackets:", numSubs)
      while(numPackets < numSubs){
        totalLength += parsePacket();
        numPackets += 1;
      }
      return totalLength;
      console.log('packet parsed')
    }
  }
}

console.log("version sum:", versions.reduce((a,b) => a+b))