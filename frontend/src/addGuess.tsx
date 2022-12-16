import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';
import { stringify } from 'querystring';

function Addsong() {
  var [service, setService] = useState<{ song: string }[]>([]);
  const handleServiceAdd = () => {
    console.log("song called")
    let newSong = '';

    const text: Element | null = document.getElementById('dropdown_class')
    if (text == null) {
      console.log("No text in the text box")

    } else if (!(text instanceof HTMLDivElement)) {
      console.log(`Found element ${text}, but it wasn't an input`)
    } else {
      //this.displayAnswerSingle
      if (typeof text.textContent === 'string') {
        newSong = text.textContent
      }
      if (newSong !== 'Know the song? Search for the artist/title') {
        if (service.length < 6) {
          setService([...service, { song: newSong }]);
        } else {
          service.splice(0, service.length);
          // TODO: Add method for bringing up the modal and ending the round
        }
      }
    }


  };
  const handleNullSongAdd = () => {
    console.log("called")
    if (service.length < 6) {
      setService([...service, { song: 'Guess skipped' }]);
    } else { 
      service.splice(0, service.length);
      // TODO: Add method for bringing up the modal and ending the round
    }
  };

  // Code below is for only allowing button to call helper method when text box isn't empty

  // <button className="v54_91" role="Submit" onClick={() => {
  //   const text: Element | null = document.getElementById('dropdown_class')
  //   if (text != null && !(text instanceof HTMLDivElement) ) {
  //     if (text.textContent?.includes('')) {
  //       handleServiceAdd();
  //     }
  //   }
  // }} >

  return (
    <>
        <div className="services">
          <div className="first-division">
            <div className="v54_92">
              <button className="v54_91" role="Submit" onClick={handleServiceAdd} ><span className="v54_90">SUBMIT</span>
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