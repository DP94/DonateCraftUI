import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./pages/home/Home";
import Players from "./pages/players/Players";
import Charities from "./pages/Charities/Charities";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
      <Router>
          <Navbar/>
          <App/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/players" element={<Players/>} />
              <Route path="/charities" element={<Charities/>} />
          </Routes>
      </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
