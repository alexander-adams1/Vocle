import React from "react";

function generateAccessToken() {
    fetch('localhost:3232/SpotifyToken')
    .then(res => res.json())
    .then(response => {
        if (response.result === `Success, got an access token`) {
            return response.access_token
        }
        else {
            return `An error occured while trying to generate an access token`
        }
    })
    .catch(e => {
        return `Could not connect to API server`
    })
}

function generateTrack(playlistURL : String, accessToken: string) {
    const playlistID = playlistURL.split('/').slice(-1)[0]
    fetch(`localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
    .then(res => res.json())
    .then(response => {
        if (response.result === `Success`) {
            return response
        }
        else if (response.result === `Error`) {
            return response.Track
        }
        else {
            return `An error occured while trying to generate a random song`
        }
    })
    .catch(e => {
        return `Could not connect to API server`
    })
}

export {generateAccessToken, generateTrack}