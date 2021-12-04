const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

let bingoCalls = input.shift();
input.shift();

// console.log(input)
let boards = [];
let markings = [];

const ingestBoard = (input) => {
  let newBoard = { sum: 0 };
  for (let i = 0; i < 5; i++) {
    let row = input.shift();
    for (let j = 0; j < 5; j++) {
      let nextTerm = parseInt(row[0].concat(row[1]));
      newBoard[nextTerm] = `${i},${j}`;
      newBoard["sum"] = newBoard["sum"] + nextTerm;
      row = row.substr(3);
    }
  }
  input.shift();
  boards.push(newBoard);

  let newMarking = new Array(5).fill(0).map((el) => new Array(5).fill(0));
  markings.push(newMarking);
};

const checkRow = (board, row) => {
  row = parseInt(row);

  for (let x = 0; x < 5; x++) {
    if (board[row][x] !== 1) {
      return false;
    }
  }
  return true;
};

const checkCol = (board, col) => {
  col = parseInt(col);

  for (let x = 0; x < 5; x++) {
    if (board[x][col] !== 1) {
      return false;
    } else {
    }
  }
  return true;
};

const checkBoard = (board, idx) => {
  if (checkRow(board, idx[0]) === true || checkCol(board, idx[2]) === true) {
    return true;
  }
  return false;
};

const markBoard = (boardNumber, idx, currentNumber) => {
  markings[boardNumber][idx[0]][idx[2]] = 1;

  if (checkBoard(markings[boardNumber], idx) === true) {
    console.log("board", boardNumber, "is the winner!");
    console.log("score: ", boards[boardNumber]["sum"] * currentNumber);
    return true;
  }
  return false;
};

while (input.length > 0) {
  ingestBoard(input);
}

bingoCalls = bingoCalls.split(",").map((el) => parseInt(el));
let dones = new Array(boards.length).fill(0);


for (const currentNumber of bingoCalls) {
  for (let i = 0; i < boards.length; i++) {
    let idx = boards[i][currentNumber];
    if (idx !== undefined) {
      boards[i]["sum"] = boards[i]["sum"] - currentNumber;
      let finished = markBoard(i, idx, currentNumber);
      if (finished === true) {
        dones[i] = 1;
        if(dones.reduce((a,el) => a + el) === dones.length){
          console.log("last board", i);
          errorout
        }
      }
    }
  }
}
