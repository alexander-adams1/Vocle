import React, { useState } from 'react';

async function generateAccessToken() : Promise<string> {
    return new Promise(async(resolve) => {
        try {
            const res = await fetch('http://localhost:3232/SpotifyToken')
            const response = await res.json()
            if (response.Result === `Success, got an access token`) {
                resolve(response.AccessToken)
            }
            else {
                resolve(`An error occured while trying to generate an access token`)
            }
        }
        catch (error) {
            resolve(`Could not connect to API server`)
        }
    })
}

async function generateTrack(playlistURL : string) : Promise<string> {
    const accessToken : string = await generateAccessToken()
    console.log(accessToken)
    const playlistID = playlistURL.split('/').slice(-1)[0]
    return new Promise(async(resolve) => {
        try {
            const res = await fetch(`http://localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
            const response = await res.json()
            if (response.result === `Success`) {
                resolve(response)
            }
            else if (response.result === `Error`) {
                resolve(response.Track)
            }
            else {
                resolve(`An error occured while trying to generate a random song`)
            }
        }
        catch (error) {
            resolve(`Could not connect to API server`)
        }
    })
}

export {generateAccessToken, generateTrack}