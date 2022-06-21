import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../redux/reducers/postReducer";
import "./style.css";

const PostContainer = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const userId = localStorage.getItem("userId");
  const { token } = useSelector((state) => state.auth);

  const getUserInfo = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API}/api/user/getUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (user) {
        setUserInfo(user.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddPost = async () => {
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_API}/api/post`,
        {
          caption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (post) {
        dispatch(addPost(post.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="writePostContainer">
      <div className="photo">
        <img alt="ProfileImage" src={userInfo.avatar} />
      </div>
      <div className="writePost">
        <input
          type="text"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          placeholder="What's happening?"
        />
      </div>
      <div className="postButton">
        <button onClick={handelAddPost} className="btn">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default PostContainer;
