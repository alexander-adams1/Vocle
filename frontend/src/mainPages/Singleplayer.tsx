import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from '../gameComponents/Dropdown';
import Home from './Home';
import { render } from '@testing-library/react';
import { ListComponent } from '../gameComponents/listComponent';
import { SingleTimer } from '../timer/timer';

import Addsong, { TEXT_Submit_button_singleplayer } from '../gameComponents/addGuess';
import { Singlemodal } from '../overlays/About';

//contains all the functionality for Singleplayer to work, containing addSong, which contains the singleTimer, and the dropdown menu

function Singleplayer() {
    // displayAnswerSingle = () => {
    //     console.log('called')
    //     this.setState({
    //         displayAnswer: !this.state.displayAnswer
    //     })
    // }

    
    const [about, setAbout] = useState(false)
    let aboutModal = null
    
    //link to spotify
    const spotify = () =>
    {
      window.open('https://www.spotify.com/', '_blank');
  
    }

    const aboutOpen = () =>
    {
        setAbout(!about)
        console.log(about)
    }

    //boolean to open the about information modal
    if(about)
    {
        console.log(about)
        aboutModal = (
          <div>
            <Singlemodal />
          </div>
        )
    }
    
    const navigate = useNavigate();

    const navigatetoHome = () => {
        navigate('/')
    }
        //this is now done within AddGuess since that is where the submit button is contained
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

        return (
            <div className="v10_9" aria-label={TEXT_Submit_button_singleplayer}>
                {aboutModal}
                

                {/* <div className="v10_56"></div>
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
                <div className="header"><div className="header_div"><div className="header_background"> </div>
            <span className="vocle_label" onClick={navigatetoHome}>Vocle</span><button className="information" onClick={aboutOpen}></button>
            
            <div className="stats"></div><button className="spotify" onClick={spotify}></button></div><div className="login"><div className="login_icon"></div></div></div></div>
        )
                    
}

export default Singleplayer;