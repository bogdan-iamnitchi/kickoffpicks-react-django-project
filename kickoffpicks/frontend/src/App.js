import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import Reset from "./Reset";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
