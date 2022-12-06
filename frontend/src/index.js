import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Home';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Singleplayer from './Singleplayer';
import Home from './Home';

const root = ReactDOM.createRoot(
  document.getElementById('App')
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
