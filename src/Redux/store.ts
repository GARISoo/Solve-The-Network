import { configureStore } from '@reduxjs/toolkit';
import PipeSlice from './PipeSlice';

const store = configureStore({
  reducer: {
    pipes: PipeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
