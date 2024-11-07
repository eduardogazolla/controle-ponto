// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ControlePonto from "./pages/ControlePonto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/controle-ponto" element={<ControlePonto />} />
      </Routes>
    </Router>
  );
}

export default App;
