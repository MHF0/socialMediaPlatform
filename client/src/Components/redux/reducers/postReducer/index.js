import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      console.log("====================================");
      console.log(action.payload);
      console.log("====================================");
      state.posts = [action.payload, ...state.posts];
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
