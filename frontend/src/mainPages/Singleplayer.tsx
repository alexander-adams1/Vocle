import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from '../gameComponents/Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from '../gameComponents/listComponent';
import { SingleTimer } from '../timer/timer';
import GoHome from '../navigateHome';

import Addsong, { TEXT_Submit_button_singleplayer } from '../gameComponents/addGuess';

import playAudio from '../audioImplementation/AudioPlayer';



class Singleplayer extends Component {
    state = {
        displayAnswer: false
    }

    displayAnswerSingle = () => {
        console.log('called')
        this.setState({
            displayAnswer: !this.state.displayAnswer
        })
    }


    render() {
        

        // if (this.state.displayAnswer) {
        //     <div className="addGuess"> Skipped Guess</div>
        // }

        const submitSong = () => {
            const text: Element | null = document.getElementById('greatness')
            if (text == null) {
                console.log("No text in the text box")
            } else if (!(text instanceof HTMLDivElement)) {
                console.log(`Found element ${text}, but it wasn't an input`)
            } else {
                console.log(text.textContent)
                return (
                    <div className="addGuess"> {text.textContent}
                    </div>)
            }
            console.log("submit called")
        }

        // const skipSong = () => {
        //     console.log("song skipped")

        //     return (
        //         <div className="addGuess"> Skipped Song
        //         </div>
        //     )
        // }

        return (
            <div className="v10_9" aria-label={TEXT_Submit_button_singleplayer}>
                <SingleTimer />

                {/* </div><div className="v10_56"></div>
                        <div className="v54_89"></div>
                        <span className="v54_106" >All I Want For Christmas </span>
                        <div className="v10_57"></div><div className="v10_58"></div>
                        <div className="v10_59"></div> */}
                <Addsong />

                {/* THIS IS THE OLD BUTTON, I DON'T THINK WE'LL NEED: <div className="v54_108"><div className="v54_101"></div><div className="v54_100"></div></div> */}

                <div className="dropdown_bar" ><Dropdown />
                    {/* <div className="v54_109"></div><span className="v54_110">Know it? Search for the artist/title</span> */}
                    {/* <div className="v54_111"></div> */}
                </div>
                <div className="v71_15"><span className="v71_13">Time Elapsed: 2 Seconds</span></div><div><GoHome /> </div></div>
        )
    }
}

export default Singleplayer;