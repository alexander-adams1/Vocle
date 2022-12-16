import React, {useState,  SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from './listComponent';

import Addsong from './addGuess';

import playAudio from './AudioPlayer';


export const TEXT_Submit_button_singleplayer = "Submit-button"
class Singleplayer extends Component{
    state =  {
        displayAnswer: false
      }
    
       displayAnswerSingle = () => {
        console.log('called')
        this.setState({
          displayAnswer: !this.state.displayAnswer
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
                    
                        {/* </div><div className="v10_56"></div>
                        <div className="v54_89"></div>
                        <span className="v54_106" >All I Want For Christmas </span>
                        <div className="v10_57"></div><div className="v10_58"></div>
                        <div className="v10_59"></div> */}
                            <Addsong />
                        
                           <div className="v54_108"><div className="v54_101"></div><div className="v54_100"></div></div>

                            <div className="dropdown_bar" ><Dropdown />
                            {/* <div className="v54_109"></div><span className="v54_110">Know it? Search for the artist/title</span> */}
                            {/* <div className="v54_111"></div> */}
                            </div>
                            <div className="v71_15"><span className="v71_13">Time Elapsed: 2 Seconds</span></div><div className="header"><div className="header_div"><div className="header_background"></div>
                            <span className="vocle_label">Vocle</span><div className="information"></div><div className="stats"></div><div className="spotify"></div></div><div className="login"><div className="login_icon"></div></div></div></div>
                )
    }
}

export default Singleplayer;