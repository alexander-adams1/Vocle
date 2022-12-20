/**
 * This function makes a backend call to generate a new access token
 * 
 * @returns A promise of a string representing a new access token
 */
async function generateAccessToken() : Promise<string> {
    return new Promise(async(resolve) => {
        try {
            // Fetches a new token
            const res = await fetch('http://localhost:3232/SpotifyToken')
            const response = await res.json()
            if (response.Result === `Success, got an access token`) {
                // Resolves the AccessToken field of the JSON that gets returned
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

/**
 * This function uses the access token from the previous function and a playlist
 * URL to get data for album URL, track name, track URL for the random song,
 * a list of all tracks and artists
 * 
 * @param playlistURL Playlist URL of the playlist we want to use in our game
 * @returns 
 */
async function generateTrack(playlistURL : string) : Promise<Map<string, any>> {
    // The map of data we'll need
    var dataMap = new Map<string, any>();
    // Generates a new access token for us to use
    const accessToken : string = await generateAccessToken()
    console.log(accessToken)
    const parsePlaylistID = playlistURL.split('?')[0]
    const playlistID = parsePlaylistID.split('/').slice(-1)[0]
    return new Promise(async(resolve) => {
        try {
            const res = await fetch(`http://localhost:3232/GenerateTrack?accessToken=${accessToken}&playlistID=${playlistID}`)
            const response = await res.json()
            console.log(response)
            if (response.Result === `Success`) {
                // Sets all the fields of the hashmap with all the data we need
                dataMap.set(`Response`, response.Result)
                dataMap.set(`AlbumURL`, response.AlbumURL)
                dataMap.set(`Track Answer`, response.Track)
                dataMap.set(`TrackURL`, response.TrackURL)
                dataMap.set(`Tracks and Artists List`, response.TracksandArtistsList)
                dataMap.set(`TrackName`, response.TrackName)
                dataMap.set(`ArtistName`, response.ArtistName)
                dataMap.set(`PlaylistID`, playlistID)
                resolve(dataMap)
            }
            else if (response.Result === `Invalid Playlist`) {
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