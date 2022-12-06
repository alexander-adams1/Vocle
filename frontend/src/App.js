import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import React, {useState,  SetStateAction, Component } from 'react'
import Singleplayer from './Singleplayer';

class App extends Component{
  render() {
    return (
          <Routes>
            <Route path = "*" element={<Home />} />
            <Route path = "/singleplayer"
              element={< Singleplayer />} />
          </Routes>
    )
  }
}

export default App;