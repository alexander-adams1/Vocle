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

export const TEXT_Submit_button_singleplayer = "Submit-button"

// Adds the song guess to the screen
function Addsong() {
  // Initializes an empty array to keep track of the songs
  var [service, setService] = useState<{ song: string }[]>([]);
  const handleServiceAdd = () => {
    console.log("song called")
    // Resets newSong
    let newSong = '';
    // Gets the text from the dropdown
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
        if (service.length < 6) {
          setService([...service, { song: newSong }]);
          console.log(generateTrack("https://open.spotify.com/playlist/37i9dQZF1DX0kbJZpiYdZl", generateAccessToken()));
        } else {
          service.splice(0, service.length);
          // TODO: Add method for bringing up the modal and ending the round
        }
      }
    }


  };
  const handleNullSongAdd = () => {
    console.log("called")
    // Adds to the list of guesses if it's under 6 (the amount that's in the single player game)
    if (service.length < 6) {
      setService([...service, { song: 'Guess skipped' }]);
    } else { 
      // Otherwise clears the list
      service.splice(0, service.length);
      // TODO: Add method for bringing up the modal and ending the round
    }
  };

  return (
    <>
        <div className="services">
          <div className="first-division">
            <div className="v54_92">
              <button className="v54_91" role="Submit" aria-label={TEXT_Submit_button_singleplayer} onClick={handleServiceAdd} ><span className="v54_90">SUBMIT</span>
              </button>
            </div>
            <div className="v54_93"><button className="v54_94" onClick={handleNullSongAdd}>
              <span className="v54_95">SKIP</span>
            </button></div>
          </div></div>

      <div className="output">
        {service.map((item, index) => (
          <ul className="output_list">
            <li className="output_el" key={index}>{item.song}</li>
          </ul>
        ))}
      </div>

    </>

  )

}

export default Addsong;