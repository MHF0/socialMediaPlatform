import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createComment } from "../redux/reducers/postReducer";
import "./style.css";

const CommentComponent = ({ mainPostId }) => {
  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");
  const [comment, setComment] = useState("");
  const [curentUser, setcurentUser] = useState({});

  const handelCurentUser = async () => {
    try {
      const curentUser = await axios.get(
        `${process.env.REACT_APP_API}/api/user/getUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcurentUser(curentUser.data.user);
      console.log(curentUser.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelCreateComment = async () => {
    try {
      const newComment = await axios.post(
        `${process.env.REACT_APP_API}/api/comment/`,
        {
          text: comment,
          post: mainPostId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(createComment(newComment.data.comment));
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelCurentUser();
  }, []);

  return (
    <div className="commentContainer">
      {posts &&
        posts.map((post) => (
          <>
            {post._id === mainPostId ? (
              <div className="psotContatinerComment">
                <div className="commentBorder">
                  <p className="commentBorderText">
                    Replying to{" "}
                    <Link to={`/profile/${post.user._id}`}>
                      <span>@{post.user.username}</span>
                    </Link>
                  </p>
                </div>

                <div className="postPhotoComment">
                  <img alt="ProfileImageComment" src={post.user.avatar} />
                </div>
                <div className="postComment">
                  <span className="postNameComment">
                    {post.user.firstname} {post.user.lastname}
                  </span>
                  <span className="usernameComment">
                    @{post.user.username}.
                  </span>
                  <span className="postDateComment">
                    {" "}
                    {format(post.createdAt)}
                  </span>
                  <p className="postCaptionComment">{post.caption}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ))}

      <div className="addComment">
        <div className="btn-comment-container">
          <div className="CommentImage">
            <img alt="ProfileImageComment" src={curentUser.avatar} />
          </div>
          <div className="writeComment">
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Tweet your reply  "
            />
            <div className="postButtonComment">
              <button className="btn-comment" onClick={handelCreateComment}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
