import { configureStore } from '@reduxjs/toolkit';
import inputsSlice from '../features/inputs/inputsSlice';
import postSlice from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    inputs: inputsSlice,
    posts: postSlice,
  },
});
