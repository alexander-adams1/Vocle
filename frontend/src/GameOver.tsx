import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const GameOverScreen = () => {
    const [imageURL, setImageURL] = useState('')
    const [songTitle, setSongTitle] = useState('')
    const [artistName, setArtistName] = useState('')

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('*', {state:{id:1,name:'default'}})
    }

    //need to set imageURL, songTitle, and artistName thru API calls to the backend.

    return (
        <div className = "game-over-screen" id = "game-over-screen" aria-label = "Game Over Screen">
            <div className = "song-info" id = "song-info" aria-label = "Song Information">
                <img className = "album-cover" src={imageURL} aria-label = "Album Cover"></img>
                <p className="song-title" aria-label = "Song Title">Shoota (feat. Lil Uzi Vert)
                </p>
                <p className="artist-name" aria-label = "Artist Name">Playboi Carti</p> 
            </div>
            <div className = "end-game" id = "end-game" aria-label = "End of Game">
                <span className = "game-over-label">Unlucky!</span>
                <span className = "better-luck-label">"You didn't get today's Vocle."<br>"Better luck next time!"</br></span>
            </div>
            <div className = "play-again-button" aria-label = "Click here to play the game again">
                <span className = "play-again-inner" onClick={navigateHome}>Play Again</span>
            </div>
        </div>
    )
}