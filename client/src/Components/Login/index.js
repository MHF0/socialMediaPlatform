import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./style.css";
import { login } from "../redux/reducers/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/login`,
        {
          email,
          password,
        }
      );
      if (response) {
        dispatch(login(response.data.token));
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form-group">
        <h2 className="login-h2">Login</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login" onClick={handelLogin}>
        {" "}
        Login{" "}
      </button>
    </div>
  );
};

export default Login;
