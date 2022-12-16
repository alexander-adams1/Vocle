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

    // return (
    //     <div className = "game-over-screen" id = "game-over-screen" aria-label = "Game Over Screen">
    //         <div className = "song-info" id = "song-info" aria-label = "Song Information">
    //             <img className = "album-cover" src="https://upload.wikimedia.org/wikipedia/en/c/c6/Die_Lit_by_Playboi_Carti.jpg" aria-label = "Album Cover"></img>
    //             <p className="song-title" aria-label = "Song Title">Shoota (feat. Lil Uzi Vert)
    //             </p>
    //             <p className="artist-name" aria-label = "Artist Name">Playboi Carti</p> 
    //         </div>
    //         <div className = "end-game" id = "end-game" aria-label = "End of Game">
    //             <span className = "game-over-label">Unlucky!</span>
    //             <span className = "better-luck-label">"You didn't get today's Vocle."<br>"Better luck next time!"</br></span>
    //         </div>
            
    //     </div>
    // )

    return (
        <div className="game-over-screen" id = "game-over-screen" aria-label = "game over screen">
            <img className="album-cover" id = "album-cover" src = "https://upload.wikimedia.org/wikipedia/en/c/c6/Die_Lit_by_Playboi_Carti.jpg"></img>
            <span className="song-name">Shoota (feat. Lil Uzi Vert) Playboi Carti</span>
            <div className="return-home-class">
                <div className="return-home-button"></div>
                <span className="home-button-label" aria-label="home button">Home</span></div>
                <div className="play-again-class" aria-label="play again button">
                    <div className="play-again-button" id = "play again button"></div>
                    <span className="play-again-label" id = "play again label">Play Again</span></div>
                <div className="share-button-class">
                        <div className="share-button"></div>
                        <span className="share-button-label">Share</span>
                        </div>
                    <div className="better-luck-class"><div className="v182_74"></div><span className="better-luck-label">You didn't get this Vocle. Better luck next time!</span></div>
        </div>
    )

    
}

export default GameOverScreen();