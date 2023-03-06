import { configureStore } from '@reduxjs/toolkit';
import inputsSlice from './slices/inputs/inputsSlice';
import postSlice from './slices/posts/postSlice';

export const store = configureStore({
  reducer: {
    inputs: inputsSlice,
    posts: postSlice,
  },
});
