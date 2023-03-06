import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  newTitle: '',
  newBody: '',
  editTitle: '',
  editBody: '',
};

export const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.search = action.payload;
    },
    setNewTitle: (state, action) => {
      state.newTitle = action.payload;
    },
    setNewBody: (state, action) => {
      state.newBody = action.payload;
    },
    setEditTitle: (state, action) => {
      state.editTitle = action.payload;
    },
    setEditBody: (state, action) => {
      state.editBody = action.payload;
    },
  },
});

export const {
  setSearchInput,
  setNewTitle,
  setNewBody,
  setEditTitle,
  setEditBody,
} = inputsSlice.actions;
export default inputsSlice.reducer;
