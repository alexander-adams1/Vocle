import {useState}  from 'react';
import Singleplayer from '../mainPages/Singleplayer';
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link,
  } from "react-router-dom";
import { render } from '@testing-library/react';
import Home from '../mainPages/Home';
import { generateTrack } from '../audioImplementation/GenerateSong';

export var resultMapMultiPlayer : Map<string, any>;
resultMapMultiPlayer = new Map<string, any>();

const Inputplaylistmulti = () =>
{
    const navigate = useNavigate();
    const[invalid, setInvalid] = useState(false);
    async function getText() 
    {
        const text: Element | null = document.getElementById('textBox')
        if(text == null) {
            console.log("No text in the text box")
        } else if (!(text instanceof HTMLInputElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {
            console.log(text.value)
            resultMapMultiPlayer  = await generateTrack(text.value)
            console.log(resultMapMultiPlayer.get(`Response`))
            if (resultMapMultiPlayer.get(`Response`) === `Success`) {
                setInvalid(false)
                navigate('/multiplayer')
            }
            else {
                text.value = ``
                setInvalid(true)
            }
        }
    }

    console.log("its being called")
    return(
        <div className="textBoxUserPlaylist">
            {!invalid && <span className="instructionsText">Put a link to your playlist here!</span>}
            {invalid && <span className="instructionsText">Invalid playlist. Please try again.</span>}
                <input className="textBox" id="textBox" type="text" placeholder="URL Link" ></input>
            <button className="submitUserPlaylist" id="button" onClick={getText}> Submit</button>
            <p className="output" id="output1"></p>
        </div>

    )

    
};

export default Inputplaylistmulti;