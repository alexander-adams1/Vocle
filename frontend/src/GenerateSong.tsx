import React from "react";

var accessToken = 'BQCjR6-KYqcD9KA1TXzATF4-CHVNo6zu6axHC5_qfgh_8uRDaQOYtw996uePm7LIa_rykfVissLMgwMiqimyMhzoFm4BeVKWlWHEZosm4iBao-jEtnZpalcwlSQZHTV3LkENnaSlbh8FzLUg7cnHJ3oKyWGGhABz6F7LQgb1OKGzV5rWJ6F9Plnx-Ik8crfA0Sa0'

function generateSong(playlistURL : String) {
    const playlistID = playlistURL.split('/').slice(-1)[0]
    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then((response) => {
            console.log(response.json)
        })
        .then((data) => {
            console.log(data)
        })
}