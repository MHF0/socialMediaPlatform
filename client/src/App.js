import React from "react";
import "./App.css";
import Navigate from "./Components/Navigate";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

const App = () => {
  return (
    <div className="App">
      {/* <h1>App</h1> */}
      <Navigate />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
