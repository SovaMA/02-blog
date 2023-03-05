import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts';
const limit = '?_limit=10';

const initialState = {
  posts: [],
  status: null,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}${limit}`);
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'post/fetchDeletePost',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${URL}/${id}`);
      dispatch(deletePost(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditPost = createAsyncThunk(
  'post/fetchEditPost',
  async (
    { id, editTitle, editBody },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const editedPost = {
        id,
        userId: 1,
        title: editTitle,
        body: editBody,
      };
      const updatedPost = getState().posts.posts.map((post) =>
        post.id === id ? { ...editedPost } : post
      );
      await axios.put(`${URL}/${id}`, updatedPost);
      dispatch(editPost(updatedPost));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAddPost = createAsyncThunk(
  'post/AddPost',
  async ({ newTitle, newBody }, { rejectWithValue, dispatch }) => {
    try {
      const newPost = {
        userId: 1,
        title: newTitle,
        body: newBody,
      };
      const response = await axios.post(`${URL}`, newPost);
      const data = await response.data;
      dispatch(addPost(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    editPost: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
      // console.log('fetchPosts pending');
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.posts = action.payload;
      // console.log('fetchPosts fulfilled');
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      // console.log('fetchPosts rejected');
    },
  },
});

export const { setPosts, addPost, deletePost, editPost } = postSlice.actions;
export default postSlice.reducer;
