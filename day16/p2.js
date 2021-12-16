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

let operators = {
  0: (arr) => arr.reduce((a,b) => a+b),
  1: (arr) => arr.reduce((a,b) => a*b, 1),
  2: (arr) => Math.min(...arr),
  3: (arr) => Math.max(...arr),
  5: (arr) => arr[0] > arr[1] ? 1 : 0,
  6: (arr) => arr[0] < arr[1] ? 1 : 0,
  7: (arr) => arr[0] === arr[1] ? 1 : 0
}

for (const char of hex.split("")) {
  input += hex2bin[char];
}


parsePacket();

function parsePacket() {
  console.log(input)
  let version = parseInt(input.slice(0, 3), 2);
  input = input.slice(3);

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
    return [totalLength, value];
  }else{
    console.log('operator packet')
    console.log('type', typeId, operators[typeId])
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
      let values = [];

      while(currentLength < subLength){
        let [l, val] = parsePacket()

        currentLength += l;
        values.push(val)
      }

      let value = operators[typeId](values);

      totalLength += subLength;
      
      console.log("packet parsed, val=", value)
      return [totalLength, value];
    }else{
      //next 11 bits are num of subpackets contained
      let numSubs = parseInt(input.slice(0, 11), 2);
      input = input.slice(11);
      totalLength += 11;
      
      let numPackets = 0;

      console.log("num subpackets:", numSubs)
      let values = [];

      while(numPackets < numSubs){
        let [l, val] = parsePacket();
        values.push(val);
        totalLength += l;
        numPackets += 1;
      }
      
      console.log("values", values)
      let value = operators[typeId](values);

      console.log('packet parsed, val= ', value )
      return [totalLength, value];
    }
  }
}

