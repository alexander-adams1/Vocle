import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { resultMap, setResultMap } from './resultMap';
import {generateTrack} from './audioImplementation/GenerateSong';
import "./GameOver.css";

//Called from Singleplayer and Multiplayer 

interface GameOverProps{
    win: boolean;
    onGameOverClose: Function;
    showSingleplayer: boolean;
    winner: string;
}
export default function GameOverScreen({win, onGameOverClose, showSingleplayer, winner}: GameOverProps) {
    const [imageURL, setImageURL] = useState(resultMap.get(`AlbumURL`))
    const [songTitle, setSongTitle] = useState(resultMap.get(`TrackName`))
    const [artistName, setArtistName] = useState(resultMap.get(`ArtistName`))

    const [showGameOver, setShowGameOver] = useState(true)
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/', {state:{id:1,name:'default'}})
        setResultMap(new Map<string, any>);
    }

    const navigateSingleplayer = () => {
        {window.location.reload();}
        //
    }

    async function getNewSong() {
        onGameOverClose();
        setShowGameOver(false)
        setResultMap(await generateTrack(resultMap.get(`PlaylistID`)));
        console.log(resultMap)

        if (showSingleplayer) {
            navigate(`/singleplayer`);
            console.log('back to singleplayer');
        }  
        else {
            navigate(`/multiplayer`);
            console.log('multiplayer')
        }      
        // setShowGameOver(false)
    }

   


    //need to set imageURL, songTitle, and artistName thru API calls to the backend.
    
    return (
        <div>
        (<div className="game-over-screen" id = "game-over-screen" aria-label = "game over screen">
            {/* album cover will be retrieved from API call */}
            <img className="album-cover" id = "album-cover" src = {imageURL}></img>
            {/* song name and artist will be retrieved from API call */}
            <p className="song-name">{songTitle}</p>
            <p className="artist-name">{artistName}</p>
            <div className="return-home-class" onClick={navigateHome}>
                <div className="return-home-button" ></div>
                <span className="home-button-label" aria-label="home button">Home</span></div>
                <div className="play-again-class" aria-label="play again button" onClick={getNewSong}>
                    <div className="play-again-button" id = "play again button"></div>
                    <span className="play-again-label" id = "play again label">Play Again</span></div>
                {/* <div className="share-button-class">
                        <div className="share-button"></div>
                        <span className="share-button-label">Share</span>
                        </div> */}
                    {!win && <div className="end-game-class"><div className="v182_74"></div><span className="end-game-label">You didn't get this Vocle. Better luck next time!</span></div>}
                    {win && showSingleplayer && <div className="end-game-class"><div className="v182_74"></div><span className="end-game-label">You win!</span></div>}
                    {win && !showSingleplayer && <div className="end-game-class"><div className="v182_74"></div><span className="end-game-label">{"User " + winner + " wins!"}</span></div>}
        </div>)
        </div>           
    )
    
}
