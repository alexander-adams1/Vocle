import React, { useState, useEffect, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Question from '../overlays/Questionssingleplayer';
import Dropdown from '../gameComponents/Dropdown';
import Home from './Home';
import { MultiTimer } from '../timer/timer';
import {GoHomeMulti } from '../navigateHome';
import AddSongMultiplayer from '../gameComponents/addGuessmultiplayer'
import { Multimodal, Singlemodal } from '../overlays/About';

//this class contains the functionality for the multiplayer game to work, containing within it the multiTimer which
//contains addGuessmultiplayer along with the DropDown menu.


function Multiplayer() {

    //since this page does not need to be rendered since it gets called from the home page, we can implement useState 
    //and useNavigate
    const navigate = useNavigate();
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


    //boolean to open the about modal
    if(about)
    {
        console.log(about)
        aboutModal = (
          <div>
            <Multimodal />
          </div>
        )
    }
        // Gets the text from the dropdown bar
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

       
    

    

    // const about = () =>
    // {
    //     setAbout(true)
    // }
    const navigatetoHome = () => {
        navigate('/')
    }
    




        return (
            <div className="multiplayer" aria-label="This is the page for multiplayer Vocle">
                {aboutModal}
                <MultiTimer />
                <div className="dropdown_bar_multi" aria-label="Input your guess here">
                    <Dropdown />
                    <div className="bottom_of_page" >
                    </div></div>
                
                {/* <button className="submit_button_multi" aria-label="Click here to submit your guess">
                    <div className="submit_button_multi_background">
                    </div><span className="submit_button_multi_label" role="Submit" aria-label={TEXT_Submit_button} onClick={submitSong}>SUBMIT</span></button> */}
                
            
                <div className="header"><div className="header_div"><div className="header_background"> </div>
            <span className="vocle_label" onClick={navigatetoHome}>Vocle</span><button className="information" onClick={aboutOpen}></button>
            
            <div className="stats"></div><button className="spotify" onClick={spotify}></button></div><div className="login"><div className="login_icon"></div></div></div>
                </div>

        )

    
}

export default Multiplayer;