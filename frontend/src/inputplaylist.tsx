import {useState}  from 'react';
import Singleplayer from './Singleplayer';
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link,
  } from "react-router-dom";
import { render } from '@testing-library/react';
import Home from './Home';

const Inputplaylist = () =>
{
    const navigate = useNavigate();
    function nice() 
    {
        const text: Element | null = document.getElementById('nice')
        if(text == null) {
            console.log("No text in the text box")
        } else if (!(text instanceof HTMLInputElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {
            console.log(text.value)
        }
        navigate('/singleplayer')
    }
    console.log("its being called")
    return(
        <div className="textBoxUserPlaylist">
            <span className="instructionsText"> Submit the URL of your individual playlist</span>
                <input className="textBox" id="nice" type="text" placeholder="URL Link" ></input>
            <button className="submitUserPlaylist" id="button" onClick={nice}> Submit</button>
            <p className="output" id="output1"></p>
        </div>

    )

    
};

export default Inputplaylist;