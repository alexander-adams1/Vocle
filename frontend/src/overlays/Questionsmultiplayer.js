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
import Inputplaylistmulti from './inputplaylistmulti';
import Multiplayer from '../mainPages/Multiplayer';
import { resultMap, setResultMap } from '../resultMap';
import { generateTrack } from '../audioImplementation/GenerateSong';

/**
 * This function returns the modal for asking the user which playlist they want to use
 */
const Questionmulti = () => 
{
    const navigate = useNavigate();

    // If the user wants to use the default playlist, the below playlist is the one that will be used
    const navigatetoMultiplayer = async () => 
    {
        setResultMap(await generateTrack(`https://open.spotify.com/playlist/37i9dQZEVXbLRQDuF5jeBp`))
        navigate('/multiplayer', {state:{id:1,name:'default'}})
    }

    const[custom, setCustom] = useState(false);
    let customPlaylist = null;
    let modals = null;

    function changeCustom()
    {
        setCustom(true)
    }

    // Otherwise, the modal for asking for a user's input on playlist will pop up
    if (custom) {
        console.log("im being called");
        return(
            <div>
                <Inputplaylistmulti />
            </div>
        )
        customPlaylist = null;
        
    }

    console.log('calling on my phone')
    // Only shows up if the input playlist multiplayer doesn't
    if(!custom)
    {
    return (
        <div className="v54_46">
            <div className="v46_8">
                <button className="v46_9">
                <span className="v46_10" onClick={navigatetoMultiplayer}>Use Default Playlist</span>
                </button>
            </div>
                <div className="v46_7">
            <button className="v46_6">
            <span className="v10_65" onClick={changeCustom}>Upload Your Own Playlist</span>
            </button>
            </div>
        </div>
    )
    }
    
};

export default Questionmulti;