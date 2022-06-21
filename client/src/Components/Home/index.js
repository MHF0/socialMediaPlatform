import React from "react";
import WritePostContainer from "../WritePostContainer";
import PostContainer from "../PostContainer";
import "./style.css";
const Home = () => {
  return (
    <div className="main">
      <p>Home</p>
      <WritePostContainer />
      <PostContainer />
    </div>
  );
};

export default Home;
