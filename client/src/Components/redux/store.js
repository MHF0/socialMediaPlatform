import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import postReducer from "./reducers/postReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
