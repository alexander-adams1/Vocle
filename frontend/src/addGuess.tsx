import React, {useState,  SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';

function Addsong(){
    const [service, setService] = useState([{song: ''}])
    const handleServiceAdd = () => {
        console.log("song called")
        let newSong = '';
        console.log(newSong)
        const text: Element | null = document.getElementById('dropdown_class')
        if(text == null) {
            console.log("No text in the text box")

        } else if (!(text instanceof HTMLDivElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {
            console.log("submit called")
            console.log(text.textContent)
            //this.displayAnswerSingle
            if(text.textContent === 'string')
            {
                newSong=text.textContent
            }
        }
        setService([...service, {song: newSong}]);
    
      };
      const handleNullSongAdd = () => {
          console.log("called")
        setService([...service, {song: 'Guess skipped'}]);
      };


        return(
           <> 
        {service.map((singleService, index) => (
        <div key={index}className="services"> 
        <div className="first-division">
        <div className="v54_92">
                   <button className="v54_91" role="Submit" onClick={handleServiceAdd} ><span className="v54_90">SUBMIT</span>
                   </button></div>
            <div className="v54_93"><button className="v54_94" onClick={handleNullSongAdd}>
                       <span className="v54_95">SKIP</span>
                   </button></div>
                   </div></div>))}

                   <div className="output">
        <h2>Output</h2>
        {service &&
          service.map((singleService, index) => (
            <ul key={index}>
              {singleService.song && <li>{singleService.song}</li>}
            </ul>
          ))}
      </div>
                   
            </>
            
    )
    
}

export default Addsong;