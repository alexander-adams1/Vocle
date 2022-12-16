import React, { useState, useEffect, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';
import { Timer } from './timer';

export const TEXT_Submit_button = "Submit-button"

class Multiplayer extends Component {
    
    render() {
    function submitSong() 
    {
        const text: Element | null = document.getElementById("greatness")
        if(text == null) {
            console.log("No text in the text box")
        } else if (!(text instanceof HTMLDivElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {

            console.log(text.textContent)
    
        }
        console.log("submit called")
    }
    
        return (
            <div className="v10_61" >
                <Timer />
                <div className="v54_113" >
                <Dropdown />
                    <div className="v54_112" >
                        </div></div>
                    <button className="v71_5">
                    
                        <div className="v71_6">
                        </div><span className="v71_7" role="Submit"  aria-label={TEXT_Submit_button} onClick={submitSong}>SUBMIT</span></button>
                        <div className="v71_11"></div>
                        <div className="v71_39"><div className="v71_34"></div><span className="v71_35" > Points: </span>
                        <div className="v89_3"></div>
                        
                        </div>
                        <div className="v110_11"><div className="v110_12"><div className="v110_13"> </div>
                    
                        <span className="v110_14">Vocle</span><div className="v110_15"></div><div className="v110_16"></div><div className="v110_17"></div></div><div className="v110_18"><div className="v110_19"></div></div></div></div>
                            
        )
    
}
}

export default Multiplayer;