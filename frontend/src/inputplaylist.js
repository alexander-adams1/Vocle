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

    const navigatetoSingleplayer = () => 
    {
        navigate('/singleplayer')
    }
    console.log("its being called")
    return(
        <div className="textBoxUserPlaylist">
            <span className="submitUserPlaylist" onClick={navigatetoSingleplayer}> Submit</span>
        </div>
    )
};

export default Inputplaylist;