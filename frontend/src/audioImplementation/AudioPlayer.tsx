import { time } from 'console';

// Initializing the audio and timeoutID variables so that we can define them in 
// playAudio function which is called onClick for the play button
var audio : any = undefined;
var timeoutID = setTimeout(() => {}, 1)

export default function playAudio(audioURL : string, interval : number) {
    // If the audio is undefined set it to play the audio at the URL passed in,
    // this is fetched by the backend
    if (audio === undefined) {
        audio = new Audio(audioURL)
    }
    // If the audio is currently paused implying that the function timed out,
    // when this function is called again play it
    if (audio.paused) {
        clearTimeout(timeoutID)
        audio.play()
        
        
    }
    // Otherwise if the audio is being clicked again while it is still playing 
    // reset the time of the audio to 0 and then play it and reset the time on
    // the timeout 
    else {
        audio.currentTime = 0
        audio.pause()
        clearTimeout(timeoutID)
    }
    // Set the timeoutID to timeout after the interval amount in seconds passes 
    // by. After the timeout interval passes pause the audio and reset the 
    // timer of the audio.
    timeoutID = setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
    }, interval * 1000)
}