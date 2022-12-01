import React from 'react'
import { client_id, client_secret } from './private/Client Information'

const express = require('express');
const req = require('request');
const querystring = require('querystring');
const app = express();

var redirect_uri = 'http://localhost:3000';

app.get('/login', function(req, res)) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
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