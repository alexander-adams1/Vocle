import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import React, {useState,  SetStateAction, Component } from 'react'
import Singleplayer from './Singleplayer';
import Multiplayer from './Multiplayer';
import playAudio from './AudioPlayer';

class App extends Component{
  render() {
    console.log("app")
    return (
          <Routes>
            <playAudio/>
            <Route path = "*" element={< Home />} />
            <Route path = "/singleplayer"
              element={< Singleplayer />} />
            <Route path = "/multiplayer"
              element={< Multiplayer />} />
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