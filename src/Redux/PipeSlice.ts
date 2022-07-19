/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PipeVariationsType } from '../Data/PipeData';

const PipeSlice = createSlice({
  initialState: {
    pipeField: [] as PipeVariationsType[][],
    chosenLevel: '',
    rows: 0,
    columns: 0,
    moves: 0,
    quality: true,
    message: '',
    locked: true,
  },

  name: 'pipes',

  reducers: {
    updatePipeField: (state, action) => {
      state.pipeField = action.payload;
    },
    addOneMove: (state) => {
      state.moves += 1;
    },
    resetMoveCount: (state) => {
      state.moves = 0;
    },
    updateRows: (state, action) => {
      state.rows = action.payload;
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    toggleQuality: (state) => {
      state.quality = !state.quality;
    },
    toggleLock: (state) => {
      state.locked = !state.locked;
    },
    generateLevel: (state, action) => {
      state.chosenLevel = action.payload;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  updatePipeField, addOneMove, resetMoveCount, updateRows, updateColumns,
  toggleQuality, generateLevel, updateMessage, toggleLock,
} = PipeSlice.actions;

export default PipeSlice.reducer;
