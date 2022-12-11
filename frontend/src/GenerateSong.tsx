import React from "react";

function generateToken() {
    return new Promise((resolve) => {
        fetch('localhost:3232/SpotifyToken')
        .then(res => res.json())
        .then(response => {
            if (response.result === `Success, got an access token`) {
                resolve(response.access_token)
            }
            else {
                resolve(`An error occured while trying to generate an access token`)
            }
        })
        .catch(e => resolve(`Could not connect to API server`))
    })
}

function generatePlaylist(playlistURL : String, accessToken: string) {
    const playlistID = playlistURL.split('/').slice(-1)[0]
    return new Promise((resolve) => {
        fetch(`localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
        .then(res => res.json())
        .then(response => {
            if (response.result === `Success`) {
                resolve(response.TrackURL)
            }
            else if (response.result === `Error`) {
                resolve(response.Track)
            }
            else {
                resolve(`An error occured while trying to generate a random song`)
            }
        })
        .catch(e => resolve(`Could not connect to API server`))
    })
}