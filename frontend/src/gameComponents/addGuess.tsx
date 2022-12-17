import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from '../mainPages/Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';
import { stringify } from 'querystring';
import { generateTrack, generateAccessToken } from '../audioImplementation/GenerateSong';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export const TEXT_Submit_button_singleplayer = "Submit-button"

const correctSong = "How Long - Charlie Puth"

// Adds the song guess to the screen
function Addsong() {
  // Initializes an empty array to keep track of the songs
  var [service, setService] = useState<{ song: string, isCorrect: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [interval, setInterval] = useState([2, 4, 8, 12, 20, 30]);

  const handleServiceAdd = () => {
    console.log("song called")
    // Resets newSong
    let newSong = '';
    // Gets the text from the dropdown
    if (!gameOver) {
      const text: Element | null = document.getElementById('dropdown_class')
      if (text == null) {
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
          if (newSong === correctSong) {
            setGameOver(true); // TODO: Set to false in reset method
            setWin(true); // TODO: Set to false in reset method
            setService([...service, { song: newSong, isCorrect: 1 }]);
            // TODO: Add method for bringing up the modal and ending the round
          } else if (service.length < 5) {
            setService([...service, { song: newSong, isCorrect: 0 }]);
            const newNumbers = interval.slice(1);
            setInterval(newNumbers);
            // generateAccessToken().then(response => console.log(response))
          } else {
            // TODO: add this code into restart game --> service.splice(0, service.length);
            setService([...service, { song: newSong, isCorrect: 0 }]);
            setGameOver(true); // TODO: Set to false in reset method
            // TODO: Add method for bringing up the modal and ending the round
          }
        }
      }
    }


  };
  const handleNullSongAdd = () => {
    if (!gameOver) {
      // Adds to the list of guesses if it's under 6 (the amount that's in the single player game)
      if (service.length < 5) {
        setService([...service, { song: 'Guess skipped', isCorrect: 2 }]);
        const newNumbers = interval.slice(1);
        setInterval(newNumbers);
      } else {
        // Otherwise clears the list
        // TODO: add this code into restart game --> service.splice(0, service.length);
        setService([...service, { song: 'Guess skipped', isCorrect: 2 }]);
        setGameOver(true); // TODO: Set to false in reset method
        // TODO: Add method for bringing up the modal and ending the round
      }
    }
  };

  return (
    <>
      <div className="services">
        <div className="first-division">
          <div className="v54_92">
            <button className="v54_91" onClick={handleServiceAdd} ><span className="v54_90" role="submit">SUBMIT</span>
            </button>
          </div>
          <div className="v54_93"><button className="v54_94" onClick={handleNullSongAdd}>
            <span className="v54_95">SKIP</span>
          </button></div>
        </div></div>

      <div className="output" role="output" aria-label="guess added">
        {service.map((item, index) => (
          <ul className="output_list" >
            <li className={"output_el-" + item.isCorrect} aria-label={item.song} key={index}>{item.song}</li>
          </ul>
        ))}
      </div>

    </>

  )

}

export default Addsong;