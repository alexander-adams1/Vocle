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
    var dataMap = new Map<string, string>();
    const accessToken : string = await generateAccessToken()
    console.log(accessToken)
    const playlistID = playlistURL.split('/').slice(-1)[0]
    return new Promise(async(resolve) => {
        try {
            const res = await fetch(`http://localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
            const response = await res.json()
            if (response.Result === `Success`) {
                dataMap.set(`Response`, response.Result)
                dataMap.set(`AlbumURL`, response.AlbumURL)
                dataMap.set(`Track Answer`, response.Track)
                dataMap.set(`TrackURL`, response.TrackURL)
                dataMap.set(`Track and Artists List`, response.TracksandArtistsList)
                dataMap.set(`TrackName`, response.TrackName)
                dataMap.set(`ArtistName`, response.ArtistName)
                resolve(dataMap)
            }
            else if (response.Result === `Error`) {
                dataMap.set(`Response`, response.Result)
                resolve(dataMap)
            }
            else {
                dataMap.set(`Response`, response.Result)
                resolve(dataMap)
            }
        }
        catch (error) {
            dataMap.set(`Response`, `Invalid playlist`)
            resolve(dataMap)
        }
    })
}

export {generateAccessToken, generateTrack}