import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import AboutPage from "./pages/AboutPage";
import RoomsPage from "./pages/RoomsPage";
import Competitions from "./pages/CompetitionsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/competitions" element={<Competitions />} />
      </Routes>
    </Router>
  );
}

export default App;
