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
import Inputplaylistsingle from './inputplaylistsingle';

// Dictates the functionality for the modal that pops up when single player is clicked
const Questionsingle = () => 
{
    const navigate = useNavigate();

    // Dictates functionality for routing to the singleplayer page (which gets called in onClick below)
    const navigatetoSingleplayer = () => 
    {
        navigate('/singleplayer', {state:{id:1,name:'default'}})
    }

    const[custom, setCustom] = useState(false);
    let customPlaylist = null;
    let modals = null;

    // Gets called when default playlist option is selected
    function changeCustom()
    {
        setCustom(true)
    }
    // Prompts the user to input their default playlist
    if (custom) {
        console.log("im being called");
        // TODO: need to have the input box to get the spotify playlist URL to load in. hide the other div elements
        return(
            <div>
                <Inputplaylistsingle />
            </div>
        )
        customPlaylist = null;
        
    }

    console.log('calling on my phone')
    if(!custom)
    {
    return (
        <div className="v54_46">
            <div className="v46_8">
                <button className="v46_9">
                <span className="v46_10" onClick={navigatetoSingleplayer}>Use Default Playlist</span>
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

export default Questionsingle;