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

export var resultMap : Map<string, any> = new Map<string, any>();

const Inputplaylistsingle = () =>
{
    const navigate = useNavigate();
    const[invalid, setInvalid] = useState(false);

    async function nice() 
    {
        const text: Element | null = document.getElementById('nice')
        if(text == null) {
            console.log("No text in the text box")
        } else if (!(text instanceof HTMLInputElement)) {
            console.log(`Found element ${text}, but it wasn't an input`)
        } else {
            console.log(text.value)
            resultMap  = await generateTrack(text.value)
            console.log(resultMap.get(`Response`))
            if (resultMap.get(`Response`) === `Success`) {
                setInvalid(false)
                navigate('/singleplayer')
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
                <input className="textBox" id="nice" type="text" placeholder="Spotify Playlist URL" ></input>
            <button className="submitUserPlaylist" id="button" onClick={nice}> Submit</button>
            <p className="output" id="output1"></p>
        </div>

    )

    
};

export default Inputplaylistsingle;