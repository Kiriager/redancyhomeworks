import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notesReducer from '../features/note/notesSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
