import React, { useState, KeyboardEvent, SetStateAction, Component, useEffect } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from '../mainPages/Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';
import { stringify } from 'querystring';
import { generateTrack, generateAccessToken } from '../audioImplementation/GenerateSong';
import { keyboardKey } from '@testing-library/user-event';
import GameOverScreen from '../GameOver';
import { resultMapMultiPlayer } from '../overlays/inputplaylistmulti';

export const TEXT_Submit_button = "Submit-button"

function AddSongMultiplayer() {
    var [service, setService] = useState<{song: string, key: string, isCorrect: number }[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [p, setp] = useState(true)
    const [q, setq] = useState(true)
    const [z, setz] = useState(true)
    const [m, setm] = useState(true)
    const [key, setKey] = useState('none')
   
    let array = new Map<string, string>()
    array.set('p', 'User2(p)')
    array.set('q', 'User1(q)')
    array.set('z', 'User3(z)')
    array.set('m', 'User4(m)')


    useEffect(() => {
      const handleKeyPress: EventListener = (event: KeyboardEventInit) => {
        console.log(key === 'none')
      if(event.key !== undefined && array.get(event.key) !== undefined)
      {
      if(key === 'none')
      {
        if (event.key === 'q') {
            setKey('q')
            console.log(key)
        }
        if (event.key === 'p') {
          setKey('p')
          console.log(key)
        }
       if (event.key === 'm') {
        setKey('m')
        console.log(key)
       }
        if (event.key === 'z') {
          setKey('z')
        console.log(key)
      }
    }
  }
      };
  
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    const handleServiceAdd = () => {
      console.log("song called")
      console.log(key)
      // Resets newSong
      let newSong = '';
      // Gets the text from the dropdown
      if(!gameOver) {
      const text: Element | null = document.getElementById('dropdown_class')
      if (text === null) {
        console.log("No text in the text box")
  
      } else if (!(text instanceof HTMLDivElement)) {
        console.log(`Found element ${text}, but it wasn't an input`)
      } else {
        // Checks that the text is of type string before storing its value
        if (typeof text.textContent === 'string') {
          newSong = text.textContent
        }
        
        // If the input text isn't simply the placeholder text
        if (newSong !== 'Know the song? Search for the artist/title') {
          if(key !== 'none')
          {
          console.log(resultMapMultiPlayer.get(`Track Answer`))
          console.log(newSong)
          if(newSong === resultMapMultiPlayer.get(`Track Answer`))
          {
            setGameOver(true);
            setWin(true)
            setService([...service, { song: newSong, key, isCorrect: 1}]);
            setKey('none')
          }
          else if (service.length < 3) {
            setService([...service, { song: newSong, key, isCorrect: 0}]);
            console.log(newSong, key)
            setKey('none')
          } else {
            setService([...service, { song: newSong, key, isCorrect: 0}]);
            setGameOver(true);
            console.log('called')
            setKey('none')
            // TODO: Add method for bringing up the modal and ending the round
          }
        }
      }
      }
    }
  };

  
return(
    <><button className="submit_button_multi" aria-label="Click here to submit your guess">
    <div className="submit_button_multi_background">
    </div><span className="submit_button_multi_label" role="Submit" aria-label={TEXT_Submit_button}  onClick={handleServiceAdd}>SUBMIT</span>
  </button><div className="multi_guesses"></div>
  <div className="output" role="output" aria-label="guess added">
        {service.map((item, index) => (
          <ul className="output_list" key={index}>
            <li className={"output_multi-" + item.isCorrect}  aria-label={item.song} key={index}>{array.get(item.key) + ": " + item.song}</li>
          </ul>
        ))}
      </div>
      <div className="open-game-over">
        {gameOver && <GameOverScreen win={win}/>}
      </div>
      </> )
}

export default AddSongMultiplayer;
