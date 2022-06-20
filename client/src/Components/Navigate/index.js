import React from "react";
import { useSelector } from "react-redux";
import WelcomeComponent from "../WelcomeComponent";
import Home from "../Home";

const Navigate = () => {
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  return <div>{isLoggedIn ? <Home /> : <WelcomeComponent />}</div>;
};

export default Navigate;
