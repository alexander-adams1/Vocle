import React  from 'react';
import Singleplayer from './Singleplayer';
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link,
  } from "react-router-dom";
import { render } from '@testing-library/react';

const Question = () => 
{
    const navigate = useNavigate();

    const navigatetoSingleplayer = () => 
    {
        navigate('/singleplayer')
    }
    console.log('calling on my phone')
    return (
        <div className="v54_46">
            <div className="v46_8">
                <div className="v46_9">
                </div>
                <span className="v46_10" onClick={navigatetoSingleplayer}>Use Popular Songs Playlist</span>
        
            </div>
                <div className="v46_7">
            <div className="v46_6"></div>
            <span className="v10_65">Upload Your Own Playlist</span>
            </div>
        </div>
            
    )
};

export default Question