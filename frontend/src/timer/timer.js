import { useCallback, useState, useEffect, useRef } from "react";
import { use1Second } from "./useSeconds";
import { resultMap } from "../resultMap";
import AddSongMultiplayer from '../gameComponents/addGuessmultiplayer';

import { isArrowFunction } from "typescript";
import userEvent from "@testing-library/user-event";

// The max length of musical playback
const multiMusicLength = 30

// The implementation for the timing of the singleplayer mode
export const SingleTimer = (singleInterval, gameOver) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);

  // The different intervals in singleplayer
  const [interval, setInterval] = useState([1, 2, 4, 8, 15, 30]);

  // The method for restarting the song after pausing
  const start = () => {
    console.log(resultMap.get(`TrackURL`))
    console.log('play')
    // Resets the time to the beginning of the song
    audioRef.current.currentTime = 0;
    setRunning(true);
    audioRef.current.play()
  }

  // The functionality for pausing in singleplayer
  const pause = () => {
    setRunning(false);
    audioRef.current.pause();
  }

  const reset = () => {
    audioRef.current.currentTime = 0;
    updateCurrentTime();
  }

  // Updates the current time
  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  // Pauses the audio when the currentTime is above the interval
  useEffect(() => {
    if ((currentTime > interval[Object.values(singleInterval)[0]] && running) || currentTime >= audioRef.current.duration) {
      pause();
    }
    
  }, [currentTime]);

  useEffect(() => {
    if(gameOver) {
      console.log('timer reset');
      
    }
  }, [gameOver])

  // Shows the timer on the page
  return (
    <div className="singletimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to toggle play"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className={"button_image-" + running}></button></div> 
      </div>    
    <div className="singlegreenRectangle"> Time Elapsed: {Math.floor(currentTime)} seconds </div>
    </div>
  )
};

// Functionality for multiplayer timer
export const MultiTimer = (timer) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [running, setRunning] = useState(false);
  const [songOver, setSongOver] = useState(false);

  // Functionality for starting the song in multiplayer
  function start() {
    if (!songOver) {
      setRunning(true);
      audioRef.current.play()
    }
  }
  // Pausing in multiplayer
  function pause() {
    setRunning(false);
    audioRef.current.pause();
  }

  // Updates the current time and what the duration of the song is
  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration)
  };

  useEffect(() => {
    // Pauses the song if the clip goes over 30 seconds
    if (currentTime > multiMusicLength && running) {
      pause();
      setSongOver(true);
    }
  }, [currentTime, timer]);

  // Sets the HTML at the beginning vs after the song starts playing
  if (currentTime === 0){
    return (
      <>
        <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to play the song"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className="button_image-false"></button></div> 
      </div>    
    <div className="multigreenRectangle"> Time Remaining: 30 seconds </div>
    </div>
    <div><AddSongMultiplayer start={start} pause={pause}/></div>
    </>
    )
    } else {
      return (
        <>
      <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />  
    <div className="multigreenRectangle" id="timeremaining"> Time Remaining: {Math.floor(duration - currentTime)} seconds </div>
    </div>
    <div><AddSongMultiplayer start={start} pause={pause}/></div>
    </>
      )
    }
};
