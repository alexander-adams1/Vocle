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
import Inputplaylist from './inputplaylist';

const Question = () => 
{
    const navigate = useNavigate();

    const navigatetoSingleplayer = () => 
    {
        navigate('/singleplayer', {state:{id:1,name:'default'}})
    }

    const[custom, setCustom] = useState(false);
    let customPlaylist = null;
    let modals = null;

    function changeCustom()
    {
        setCustom(true)
    }

    if (custom) {
        console.log("im being called");
        // TODO: need to have the input box to get the spotify playlist URL to load in. hide the other div elements
        return(
            <div>
                <Inputplaylist />
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

export default Question;