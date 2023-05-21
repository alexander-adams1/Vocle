import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './mainPages/Home';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Singleplayer from './mainPages/Singleplayer';
import Home from './mainPages/Home';

//Calls the App in order to render the site

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
