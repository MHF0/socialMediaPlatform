import React from "react";
import "./App.css";
import Navigate from "./Components/Navigate";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import WelcomeComponent from "./Components/WelcomeComponent";
import Home from "./Components/Home";
import LeftSide from "./Components/LiftSide";
import RightSide from "./Components/RightSide";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      {/* <h1>App</h1> */}
      {isLoggedIn ? (
        <>
          <LeftSide />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <RightSide />
        </>
      ) : (
        <WelcomeComponent />
      )}
    </div>
  );
};

export default App;
