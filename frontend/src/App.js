import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import ShopQR from "./pages/shopQR";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ShopQR />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
