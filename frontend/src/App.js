import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './mainPages/Home';
import React, {useState,  SetStateAction, Component } from 'react'
import Singleplayer from './mainPages/Singleplayer';
import Multiplayer from './mainPages/Multiplayer';
import GameOver from './GameOver';

class App extends Component{
  
  //Gets called from index, showing all the possible paths for all the pages(home, singleplayer, multiplayer, and gameover)
  render() {
    console.log("app")
    // Contains information for which endpoint should render which page

    const resultMapSingleplayer = new Map();

    return (
          <Routes>
            <Route path = "*" element={< Home />} />
            <Route path = "/singleplayer"
              element={<Singleplayer />} />
            <Route path = "/multiplayer"
              element={<Multiplayer />} />
            <Route path = "/gameover" element = {<GameOver />} />
          </Routes>
    )
  }
}

// import React, { useState, useEffect } from 'react';
// import WebPlayback from './WebPlayBack'
// import Login from './Login'
// import './App.css';

// function App() {

//   const [token, setToken] = useState('');

//   useEffect(() => {

//     async function getToken() {
//       const response = await fetch('/auth/token');
//       const json = await response.json();
//       setToken(json.access_token);
//     }

//     getToken();

//   }, []);

//   return (
//     <>
//         { (token === '') ? <Login/> : <WebPlayback token={token} /> }
//     </>
//   );
// }


export default App;