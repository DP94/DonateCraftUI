import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import Navbar from "./navbar/Navbar";
import Players from "./pages/players/Players";
import Home from "./pages/home/Home";
import Charities from "./pages/Charities/Charities";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/players" element={<Players/>} />
            <Route path="/charities" element={<Charities/>} />
        </Routes>
    </div>
  );
}

export default App;
