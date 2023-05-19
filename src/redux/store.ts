import { configureStore } from "@reduxjs/toolkit";
import markerReducer from './features/markerSlice';

export const store = configureStore({
  reducer: {
    markerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
