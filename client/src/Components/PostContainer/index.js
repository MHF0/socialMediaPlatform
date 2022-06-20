import React from "react";
import "./style.css";

const PostContainer = () => {
  return (
    <div className="writePostContainer">
      <div className="photo">
        <img
          alt="ProfileImage"
          src="https://pbs.twimg.com/profile_images/1445093373325492226/Asw0nZmX_400x400.jpg"
        />
      </div>
      <div className="writePost">
        <input type="text" placeholder="What's happening?" />
      </div>
      <div clssName="postButton">
        <button className="btn">Tweet</button>
      </div>
    </div>
  );
};

export default PostContainer;
