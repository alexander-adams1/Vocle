import SpotifyPlayer from 'react-spotify-web-playback';

export default function playAudio() {
    var audio = new Audio("https://p.scdn.co/mp3-preview/35c31a982fe1af1128842a73e9a53990d677833f?cid=fbf528e0063e4820b4fd570f750f297d")
    audio.play()
}