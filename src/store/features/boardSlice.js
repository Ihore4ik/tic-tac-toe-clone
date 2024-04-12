import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomNumber, wait } from "../../assets/helpers/functions";

const initialState = {
  board: Array(9).fill(null),
  isX: true,
  isDraw: false,
  winner: null,
  playerX: "X",
  playerO: "O",
  winnerPositions: [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //   vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //   diagonal
    [0, 4, 8],
    [2, 4, 6],
  ],
};

export const aiSetValueToBoard = createAsyncThunk(
  "data/aiSetValueToBoard",
  async () => {
    await wait(getRandomNumber(3) * 1000);
  }
);

export const boardSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    playerSetValueToBoard: (state, action) => {
      if (state.board[action.payload] !== null) return;
      if (state.isX) {
        const newState = state.board.map((el, index) => {
          if (index === action.payload) {
            return state.isX ? state.playerX : state.playerO;
          }
          return el;
        });
        state.board = newState;
        state.isX = !state.isX;
        boardSlice.caseReducers.checkWinner(state);
        boardSlice.caseReducers.checkIsDraw(state);
      }
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.isX = true;
      state.isDraw = false;
      state.winner = null;
    },
    checkIsDraw: (state) => {
      if (state.winner === null && !state.board.includes(null)) {
        state.isDraw = true;
      }
    },
    checkWinner: (state) => {
      for (let [a, b, c] of state.winnerPositions) {
        if (
          state.board[a] &&
          state.board[a] === state.board[b] &&
          state.board[b] === state.board[c]
        ) {
          state.winner = state.board[a] === "X" ? "YOU" : "AI";
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(aiSetValueToBoard.fulfilled, (state) => {
      if (!state.winner) {
        const arr = [...state.board].reduce(function (array, item, index) {
          if (item === null) array.push(index);
          return array;
        }, []);
        const newArr = [...state.board];
        newArr[arr[Math.floor(Math.random() * arr.length)]] = state.playerO;
        state.board = newArr;
        state.isX = !state.isX;
        boardSlice.caseReducers.checkWinner(state);
        boardSlice.caseReducers.checkIsDraw(state);
      }
    });
  },
});

export const { playerSetValueToBoard, resetBoard, checkIsDraw } =
  boardSlice.actions;
export default boardSlice.reducer;
