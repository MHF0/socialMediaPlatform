import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../redux/reducers/postReducer";
import { format } from "timeago.js";
import "./style.css";
import LikeComponent from "../LikeComponent";
const PostContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const username = localStorage.getItem("username");

  const [isHovover, setIsHovered] = useState(false);

  const [postId, setPostId] = useState(null);

  const handleMouseOver = (postId) => {
    setIsHovered(true);
    setPostId(postId);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const getPosts = async () => {
    try {
      const posts = await axios.get(`${process.env.REACT_APP_API}/api/post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (posts) {
        const reversePost = posts.data.posts.reverse();
        dispatch(setPost(reversePost));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="psotContatiner">
            <div className="postPhoto">
              <img alt="ProfileImage" src={post.user.avatar} />
            </div>
            <div className="post">
              <span className="postName">
                {post.user.firstname} {post.user.lastname}
              </span>
              <span className="username">@{post.user.username}.</span>
              <span className="postDate"> {format(post.createdAt)}</span>
              <p className="postCaption">{post.caption}</p>
              <div>
                <div
                  onMouseOver={() => handleMouseOver(post._id)}
                  onMouseOut={handleMouseOut}
                  className={
                    post._id === postId && isHovover
                      ? " commentSVG commentSVGBefor commentSVGHover"
                      : "commentSVG"
                  }
                >
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                  </svg>
                </div>
                <span
                  className={
                    post._id === postId && isHovover
                      ? "numberOfCommentHover numberOfComment "
                      : "numberOfComment"
                  }
                >
                  {post.comments && post.comments.length}
                </span>
              </div>
              {post.likes.length > 0 &&
              post.likes.filter((element) => {
                return element.username === username;
              }).length ? (
                <LikeComponent
                  postId={post._id}
                  numberOfLike={post.likes.length}
                  username={true}
                />
              ) : (
                <LikeComponent
                  postId={post._id}
                  numberOfLike={post.likes.length}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostContainer;
