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

async function generateTrack(playlistURL : string) : Promise<Map<string, string>> {
    var dataArray = new Map<string, string>();
    const accessToken : string = await generateAccessToken()
    console.log(accessToken)
    const playlistID = playlistURL.split('/').slice(-1)[0]
    return new Promise(async(resolve) => {
        try {
            const res = await fetch(`http://localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
            const response = await res.json()
            if (response.Result === `Success`) {
                dataArray.set(`Response`, response.Result)
                dataArray.set(`AlbumURL`, response.AlbumURL)
                dataArray.set(`Track name`, response.Track)
                dataArray.set(`TrackURL`, response.TrackURL)
                dataArray.set(`Track and Artists List`, response.TracksandArtistsList)
                resolve(dataArray)
            }
            else if (response.Result === `Error`) {
                dataArray.set(`Response`, response.Result)
                resolve(dataArray)
            }
            else {
                dataArray.set(`Response`, response.Result)
                resolve(dataArray)
            }
        }
        catch (error) {
            dataArray.set(`Response`, `Invalid playlist`)
            resolve(dataArray)
        }
    })
}

export {generateAccessToken, generateTrack}