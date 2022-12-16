import SpotifyPlayer from 'react-spotify-web-playback';

export default function playAudio(audioURL : string) {
    var audio = new Audio(audioURL)
    audio.play()
}