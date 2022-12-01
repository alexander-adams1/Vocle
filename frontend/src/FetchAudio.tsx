import React from 'react'
import { client_id, client_secret } from './private/Client Information'

export function getToken() {
var request = require('request')
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error : any, response : any, body : any) {
  if (!error && response.statusCode === 200) {
    let token = body.access_token;
    console.log(body)
    return <p>{token}</p>
  }
});
return <p></p>
}

// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${userAccessToken}`
//   }
// })
// .then(response => response.json())
// .then(({beats}) => {
//   beats.forEach((beat : any , index : any) => {
//     console.log(`Beat ${index} starts at ${beat.start}`);
//   })
// })