import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRandomNumber,
  wait,
  findAvailableCeils,
  minimax,
  checForkWinner,
} from "../../assets/helpers/functions";

const initialState = {
  board: Array(9).fill(null),
  isX: true,
  isDraw: false,
  winner: null,
  playerX: "X",
  playerO: "O",
};

export const aiSetValueToBoard = createAsyncThunk(
  "data/aiSetValueToBoard",
  async () => {
    await wait(getRandomNumber(3) * 1000);
  }
);
export const aiProfiSetValueToBoard = createAsyncThunk(
  "data/aiProfiSetValueToBoard",
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
      const winner = checForkWinner(state.board);
      if (winner !== null) {
        state.winner = winner === "X" ? "YOU" : "AI";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(aiSetValueToBoard.fulfilled, (state) => {
      if (!state.winner) {
        const availCeils = findAvailableCeils(state.board);
        const newArr = [...state.board];
        newArr[availCeils[Math.floor(Math.random() * availCeils.length)]] =
          state.playerO;
        state.board = newArr;
        state.isX = !state.isX;
        boardSlice.caseReducers.checkWinner(state);
        boardSlice.caseReducers.checkIsDraw(state);
      }
    });
    builder.addCase(aiProfiSetValueToBoard.fulfilled, (state) => {
      if (!state.winner) {
        const tempState = [...state.board];
        const bestMoveAi = minimax(tempState, "O");
        const newArr = [...state.board];
        newArr[bestMoveAi.index] = state.playerO;
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
