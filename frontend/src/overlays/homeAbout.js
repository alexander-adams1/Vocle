import { useState } from 'react';;

/**
 * This is the functionality for the about modal on the home page
 * 
 * @returns 
 */
export const Homemodal = (show) => {
    const [modal, setmodal] = useState(true)
    // Whether or not it's open
    const close = () => {
        setmodal(false)
    }
    console.log(show)
    if (modal) {
        return (<div
            className="v10_22" onClick={close}><span className="v10_27">About
            </span><button className="v35_4"> X </button>
            <span className="v198_7">Welcome to Vocle! This is a song guessing game
                inspired by the popular game Heardle. There are two different modes, Singleplayer and
                Multiplayer(up to 4 players), which can be played by importing your own Spotify playlist
                by copying the playlist url or using our default playlist of the top current songs. </span></div>)
    }
}