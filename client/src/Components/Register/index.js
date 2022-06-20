import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./style.css";
import { login } from "../redux/reducers/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/register`,
        {
          firstname,
          lastname,
          username,
          email,
          password,
        }
      );
      if (response) {
        dispatch(login(response.data.token));
         navigate("/"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form-group">
        <h2 className="register-h2">Create your account</h2>

        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
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

      <button className="register" onClick={handelRegister}>
        {" "}
        Register{" "}
      </button>
    </div>
  );
};

export default Register;
