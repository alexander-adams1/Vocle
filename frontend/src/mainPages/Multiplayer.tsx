import React, { useState, useEffect, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from '../gameComponents/Dropdown';
import Home from './Home';
import { MultiTimer } from '../timer/timer';

export const TEXT_Submit_button = "Submit-button"

class Multiplayer extends Component {

    render() {
        function submitSong() {
            const text: Element | null = document.getElementById("dropdown_class")
            if (text == null) {
                console.log("No text in the text box")
            } else if (!(text instanceof HTMLDivElement)) {
                console.log(`Found element ${text}, but it wasn't an input`)
            } else {

                console.log(text.textContent)

            }
            console.log("submit called")
        }



        return (
            <div className="multiplayer" aria-label="This is the page for multiplayer Vocle">
                <MultiTimer />
                <div className="dropdown_bar" aria-label="Input your guess here">
                    <Dropdown />
                    <div className="bottom_of_page" >
                    </div></div>
                <button className="submit_button_multi" aria-label="Click here to submit your guess">

                    <div className="submit_button_multi_background">
                    </div><span className="submit_button_multi_label" role="Submit" aria-label={TEXT_Submit_button} onClick={submitSong}>SUBMIT</span></button>
                <div className="multi_guesses"></div>
                <div className="points" aria-label='Here is the points leaderboard'><div className="points_background"></div><span className="points_label" > Points: </span>
                    <div className="points_line"></div>

                </div>
                <div className="header"><div className="header_div"><div className="header_background"> </div>

                    <span className="vocle_label">Vocle</span><div className="information"></div><div className="stats"></div><div className="spotify"></div></div><div className="login"><div className="login_icon"></div></div></div></div>

        )

    }
}

export default Multiplayer;