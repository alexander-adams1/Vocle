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
import { resultMap } from '../resultMap';
import { MultiTimer } from '../timer/timer';
export const TEXT_Submit_button = "Submit-button"

function AddSongMultiplayer() {
  var [service, setService] = useState<{ song: string, keyStroke: string, isCorrect: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [guess, setGuess] = useState(true);
  const [q, setq] = useState(true)
  const [m, setm] = useState(true)
  const [z, setz] = useState(true)
  const [p, setp] = useState(true)
  const [timer, setTimer] = useState(true)
  const [key, setKey] = useState('none');

  let array = new Map<string, string>()
  array.set('p', 'User2(p)')
  array.set('q', 'User1(q)')
  array.set('z', 'User3(z)')
  array.set('m', 'User4(m)')

  setInterval(() => {
    checkTimer();
  }, 1000);

  const checkTimer = () => {
    const text: Element | null = document.getElementById('timeremaining')
    if (text == null) {
    } else if (!(text instanceof HTMLDivElement)) {
        console.log(`Found element ${text}, but it wasn't an input`)
    } else {
        if(text.textContent?.includes('Remaining: 0 seconds'))
        {
          console.log("yessir")
          setGameOver(true)
        }
    }
}


  useEffect(() => {
    const handleKeyPress: EventListener = (event: KeyboardEventInit) => {
      if (event.key !== undefined && array.get(event.key) !== undefined) {
        if (guess) {
          console.log("Yes")
          if (event.key === 'q' && q) {
            setKey('q')
            setq(false)
            setTimer(false)       
          }
          else if (event.key === 'p' && p) {
            setKey('p')
            setp(false)
            setTimer(false)
          }
          else if (event.key === 'm' && m) {
            setKey('m')
            setm(false)
            setTimer(false)
            
          }
          else if (event.key === 'z' && z) {
            setKey('z')
            setz(false)
            setTimer(false)
          }
          setGuess(false)
          console.log(timer)
        }
      }
    };
    

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, m,  p, q, z, guess, timer]);
  

  const handleServiceAdd = () => {
    setTimer(false)
    console.log(timer)
    console.log("song called")
    
    setGuess(true)
    // Resets newSong
    let newSong = '';
    // Gets the text from the dropdown
    if (!gameOver) {
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
          if (key !== 'none') {
            console.log(resultMap.get(`Track Answer`))
            console.log(newSong)
            if (newSong === resultMap.get(`Track Answer`)) {
              setGameOver(true);
              setWin(true)
              setService([...service, { song: newSong, keyStroke: key, isCorrect: 1 }]);
              setKey('none')
            }
            else if (service.length < 3) {
              setService([...service, { song: newSong, keyStroke: key, isCorrect: 0 }]);
              console.log(newSong, key)
              setKey('none')
            } else {
              setService([...service, { song: newSong, keyStroke: key, isCorrect: 0 }]);
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


  return (
    <><button className="submit_button_multi" aria-label="Click here to submit your guess" onClick={handleServiceAdd}>
      <div className="submit_button_multi_background">
      </div><span className="submit_button_multi_label" role="Submit" aria-label={TEXT_Submit_button} >SUBMIT</span>
    </button>
      <div className="output" role="output" aria-label="guess added">
        {service.map((item, index) => (
          <ul className="output_list" key={index}>
            <li className={"output_el-" + item.isCorrect} aria-label={item.song} key={index}>{array.get(item.keyStroke) + ": " + item.song}</li>
          </ul>
        ))}
      </div>
      <div className="open-game-over">
        {gameOver && <GameOverScreen win={win} />}
      </div>
      <div><MultiTimer timer={timer}/></div>
    </>)
}

export default AddSongMultiplayer;
