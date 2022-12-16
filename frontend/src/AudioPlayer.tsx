import { time } from 'console';
import SpotifyPlayer from 'react-spotify-web-playback';

var audio : any = undefined;
var timeoutID = setTimeout(() => {}, 1)

export default function playAudio(audioURL : string, interval : number) {
    if (audio === undefined) {
        audio = new Audio(audioURL)
    }
    if (audio.paused) {
        audio.play()
    }
    else {
        audio.currentTime = 0
        clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
    }, interval * 1000)
}