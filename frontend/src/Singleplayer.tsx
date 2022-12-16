import React, {useState,  SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';
import playAudio from './AudioPlayer';

export const TEXT_Submit_button_singleplayer = "Submit-button"
class Singleplayer extends Component{
    
    state = {
        displayAnswer: false
      }
    
    
       displayAnswerSingle = () => {
        console.log('called')
        this.setState({
          displayAnswer: !this.state.displayAnswer,
          
        })
      }

      
    render() {
    if(this.state.displayAnswer)
    {
        
            <div className="addGuess"> Skipped Guess</div>
        
    }

    const submitSong = () =>
    {
        const text: Element | null = document.getElementById('greatness')
        if(text == null) {
            console.log("No text in the text box")
        } else if (!(text instanceof HTMLDivElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {
            console.log(text.textContent)
            // this.displayAnswerSingle
            return(
                <div className="addGuess"> {text.textContent}
                </div>)
            
        }
        console.log("submit called")
    }

    const skipSong = () =>
    {
        console.log("song skipped")
        
        return(
            <div className="addGuess"> Skipped Song
            </div>
            )
    }

        return (
                <div className="v10_9">
                    <div className="v10_60">
                        </div><div className="v10_56"></div>
                        <div className="v54_89"></div>
                        <span className="v54_106" >All I Want For Christmas </span>
                        <div className="v10_57"></div><div className="v10_58"></div>
                        <div className="v10_59"></div>
                        <div className="v54_92" >
                            <button className="v54_91" role="Submit"  aria-label={TEXT_Submit_button_singleplayer} onClick={submitSong}><span className="v54_90" >SUBMIT</span>
                            </button></div>
                            <div className="v54_93"><button className="v54_94" onClick={() => playAudio(``)}>
                                <span className="v54_95" >SKIP</span>
                            </button></div><div className="v54_108"><div className="v54_101"></div><div className="v54_100"></div></div>
                            <div className="v54_112" ><Dropdown />
                            {/* <div className="v54_109"></div><span className="v54_110">Know it? Search for the artist/title</span> */}
                            {/* <div className="v54_111"></div> */}
                            </div>
                            <div className="v71_15"><span className="v71_13">Time Elapsed: 2 Seconds</span></div><div className="v110_11"><div className="v110_12"><div className="v110_13"></div>
                            <span className="v110_14">Vocle</span><div className="v110_15"></div><div className="v110_16"></div><div className="v110_17"></div></div><div className="v110_18"><div className="v110_19"></div></div></div></div>
                )
    }
}

export default Singleplayer;