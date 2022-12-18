import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { resultMapSinglePlayer} from './overlays/inputplaylistsingle';
import "./GameOver.css";

export default function GameOverScreen({win}: {win: boolean}) {
    const [imageURL, setImageURL] = useState(resultMapSinglePlayer.get(`AlbumURL`))
    const [songTitle, setSongTitle] = useState(resultMapSinglePlayer.get(`TrackName`))
    const [artistName, setArtistName] = useState(resultMapSinglePlayer.get(`ArtistName`))

    const [showGameOver, setShowGameOver] = useState(true)
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/', {state:{id:1,name:'default'}})
    }

    const navigateSingleplayer = () => {
        {window.location.reload();}
        console.log('back to singleplayer')
        // setShowGameOver(false)

    }



    //need to set imageURL, songTitle, and artistName thru API calls to the backend.
    
    return (
        <div>
        {showGameOver && (<div className="game-over-screen" id = "game-over-screen" aria-label = "game over screen">
            {/* album cover will be retrieved from API call */}
            <img className="album-cover" id = "album-cover" src = {imageURL}></img>
            {/* song name and artist will be retrieved from API call */}
            <p className="song-name">{songTitle}</p>
            <p className="artist-name">{artistName}</p>
            <div className="return-home-class" onClick={navigateHome}>
                <div className="return-home-button" ></div>
                <span className="home-button-label" aria-label="home button">Home</span></div>
                <div className="play-again-class" aria-label="play again button" onClick={navigateSingleplayer}>
                    <div className="play-again-button" id = "play again button"></div>
                    <span className="play-again-label" id = "play again label">Play Again</span></div>
                {/* <div className="share-button-class">
                        <div className="share-button"></div>
                        <span className="share-button-label">Share</span>
                        </div> */}
                    {!win && <div className="end-game-class"><div className="v182_74"></div><span className="end-game-label">You didn't get this Vocle. Better luck next time!</span></div>}
                    {win && <div className="end-game-class"><div className="v182_74"></div><span className="end-game-label">You win!</span></div>}
        </div>)}
        </div>           
    )
    
}
