import { useCallback, useState, useEffect, useRef } from "react";
import { use1Second } from "./useSeconds";
import { resultMap } from "../resultMap";
import AddSongMultiplayer from '../gameComponents/addGuessmultiplayer';

import { isArrowFunction } from "typescript";
import userEvent from "@testing-library/user-event";


const multiMusicLength = 30

export const SingleTimer = (singleInterval, gameOver) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [interval, setInterval] = useState([1, 2, 4, 8, 15, 30]);

  const start = () => {
    console.log(resultMap.get(`TrackURL`))
    console.log('play')
    audioRef.current.currentTime = 0;
    setRunning(true);
    audioRef.current.play()
  }
  const pause = () => {
    setRunning(false);
    audioRef.current.pause();
  }

  const reset = () => {
    audioRef.current.currentTime = 0;
    updateCurrentTime();
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
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

  return (
    <div className="singletimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to toggle play"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className={"button_image-" + running}></button></div> 
      </div>    
    <div className="singlegreenRectangle"> Time Elapsed: {Math.floor(currentTime)} seconds </div>
    </div>
  )
};

export const MultiTimer = (timer) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [songOver, setSongOver] = useState(false);

  function start() {
    if (!songOver) {
      setRunning(true);
      audioRef.current.play()
    }
  }
  function pause() {
    setRunning(false);
    audioRef.current.pause();
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    // if(!timer)
    // {
    //   pause();
    // }
    if (currentTime > multiMusicLength && running) {
      pause();
      setSongOver(true);
    }
  }, [currentTime, timer]);

  if (currentTime === 0){
    return (
      <>
        <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to play the song"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className="button_image-false"></button></div> 
      </div>    
    <div className="multigreenRectangle"> Time Remaining: {Math.floor(currentTime)} seconds </div>
    </div>
    <div><AddSongMultiplayer start={start} pause={pause}/></div>
    </>
    )
    } else {
      return (
        <>
      <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMap.get(`TrackURL`)} />  
    <div className="multigreenRectangle" id="timeremaining"> Time Remaining: {Math.floor(audioRef.current.duration - currentTime)} seconds </div>
    </div>
    <div><AddSongMultiplayer start={start} pause={pause}/></div>
    </>
      )
    }
};

// CHANGE RETURN STATEMENT TO THIS WHEN FIGURE OUT HOW TO PAUSE AUDIO:

// if (running){
//   return (
//     <div className="multitimerclass">
//     <div className="multigreenRectangle"> Time Elapsed: {seconds} seconds </div>
//     </div>
//   )
//   } else {
//     return (
//       <div className="multitimerclass">
//         <div className="PlayButton" aria-label="click to play the song"> <div onClick={start}> <div className="v54_101"></div><button className="v54_100"></button></div> 
//         </div>    
//       <div className="multigreenRectangle"> Time Elapsed: {seconds} seconds </div>
//       </div>
//     )
//   }

// const Timer = () => {
//         const [counter, setCounter] = useState(0);
//             const [startTimer, setStartTimer] = useState(false);
//             const [timerId, setTimerId] = useState(0);
        
//             useEffect(()=> {
//                 let intervalId = null;
//                 if(startTimer)
//                 {
//                     intervalId = setInterval(() => {
//                         setTimerId(prev => prev +=1 )
//                     }, 500)
//                 setTimerId(intervalId);
//                 }
//                 else{
//                     clearInterval(timerId)
//                 }
//             }, [setStartTimer]) 

//             return (
//                     <div className="v71_40">
//                     <div className="v71_41"></div><span className="v71_42">Points:</span>
//                     <div className="v89_4"></div></div><span className="v71_47">Time Elapsed: Seconds</span>
//             )
//         }
