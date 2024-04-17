export const winnerPositions = [
  // horizontal
  { line: [0, 1, 2], winClass: "row-1" },
  { line: [3, 4, 5], winClass: "row-2" },
  { line: [6, 7, 8], winClass: "row-3" },

  //   vertical
  { line: [0, 3, 6], winClass: "col-1" },
  { line: [1, 4, 7], winClass: "col-2" },
  { line: [2, 5, 8], winClass: "col-3" },

  //   diagonal
  { line: [0, 4, 8], winClass: "d-1" },
  { line: [2, 4, 6], winClass: "d-2" },
];

export const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num) + 1;
};

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

export const findAvailableCeils = (arr) => {
  return [...arr].reduce(function (array, item, index) {
    if (item === null) array.push(index);
    return array;
  }, []);
};
export const checForkWinner = (board) => {
  for (let winnerPosition of winnerPositions) {
    const {line: [a,b,c], winClass} = winnerPosition;
  // for (let [a, b, c] of winnerPositions) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return {
        winner: board[a] === "X" ? "X" : "O",
        strike: winClass
      };
      // return board[a] === "X" ? "X" : "O";
    }
  }
  return null;
};
export const minimax = (newBoard, setValue) => {
  const availCeils = findAvailableCeils(newBoard);

  if (checForkWinner(newBoard) && checForkWinner(newBoard).winner === "X") {
    return { score: -10 };
  } else if (
    checForkWinner(newBoard) &&
    checForkWinner(newBoard).winner === "O"
  ) {
    return { score: 10 };
  } else if (availCeils.length === 0) {
    return { score: 0 };
  } else {
    const moves = [];
    for (let i = 0; i < availCeils.length; i++) {
      const move = {};
      move.index = availCeils[i];
      newBoard[availCeils[i]] = setValue;

      if (setValue === "X") {
        const result = minimax(newBoard, "O");
        move.score = result.score;
      } else {
        const result = minimax(newBoard, "X");
        move.score = result.score;
      }

      newBoard[availCeils[i]] = null;

      moves.push(move);
    }
    let bestMove;
    if (setValue === "O") {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
};
