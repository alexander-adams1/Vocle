import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, {useState} from "react";
import { Singlemodal } from "./overlays/About";



// Used to link the Vocle header back to home
export const GoHome = () => {
    const [about, setAbout] = useState(false)
    let modal = null
    const spotify = () =>
    {
      window.open('https://www.spotify.com/', '_blank');
  
    }


    
    const navigate = useNavigate();

    const navigatetoHome = () => {
        navigate('/')
    }
    return (
        <div className="header"><div className="header_div"><div className="header_background"> </div>
            <span className="vocle_label" onClick={navigatetoHome}>Vocle</span><button className="information" onClick={about}></button>
            <Singlemodal open={about}/>
            <div className="stats"></div><button className="spotify" onClick={spotify}></button></div><div className="login"><div className="login_icon"></div></div></div>
    )

};

export const GoHomeMulti = () => {
    

    const spotify = () =>
    {
      window.open('https://www.spotify.com/', '_blank');
  
    }
    const navigate = useNavigate();

    

    // const about = () =>
    // {
    //     setAbout(true)
    // }
    const navigatetoHome = () => {
        navigate('/')
    }
    return (
        <div className="header"><div className="header_div"><div className="header_background"> </div>
            <span className="vocle_label" onClick={navigatetoHome}>Vocle</span><button className="information" ></button>
            
            <div className="stats"></div><button className="spotify" onClick={spotify}></button></div><div className="login"><div className="login_icon"></div></div></div>
    )

};