import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id == action.payload._id) {
          return action.payload;
        }
        return post;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { addPost, setPost, updatePost, deletePost } = posts.actions;

export default posts.reducer;
