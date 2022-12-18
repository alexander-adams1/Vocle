import { useCallback, useState, useEffect, useRef } from "react";
import { use1Second } from "./useSeconds";
import playAudio from '../audioImplementation/AudioPlayer';
import { resultMapSinglePlayer } from "../overlays/inputplaylistsingle";
import { resultMapMultiPlayer } from "../overlays/inputplaylistmulti";

const multiMusicLength = 15

export const SingleTimer = (singleInterval) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [interval, setInterval] = useState([1, 2, 4, 8, 15, 30]);

  const start = () => {
    console.log(resultMapSinglePlayer.get(`TrackURL`))
    audioRef.current.currentTime = 0;
    setRunning(true);
    audioRef.current.play()
  }
  const pause = () => {
    setRunning(false);
    audioRef.current.pause();
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  useEffect(() => {
    if ((currentTime > interval[Object.values(singleInterval)[0]] && running) || currentTime >= audioRef.current.duration) {
      pause();
    }
  }, [currentTime]);
  return (
    <div className="singletimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMapSinglePlayer.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to toggle play"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className={"button_image-" + running}></button></div> 
      </div>    
    <div className="singlegreenRectangle"> Time Elapsed: {Math.floor(currentTime)} seconds </div>
    </div>
  )
};

export const MultiTimer = () => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [songOver, setSongOver] = useState(false);

  const start = () => {
    if (!songOver) {
      setRunning(true);
      audioRef.current.play()
    }
  }
  const pause = () => {
    setRunning(false);
    audioRef.current.pause();
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (currentTime > multiMusicLength && running) {
      pause();
      setSongOver(true);
    }
  }, [currentTime]);

  if (running || songOver){
    return (
      <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMapMultiPlayer.get(`TrackURL`)} />  
    <div className="multigreenRectangle"> Time Elapsed: {Math.floor(currentTime)} seconds </div>
    </div>
    )
    } else {
      return (
        <div className="multitimerclass">
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} src={resultMapMultiPlayer.get(`TrackURL`)} />
      <div className="PlayButton" aria-label="click to play the song"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className="button_image-false"></button></div> 
      </div>    
    <div className="multigreenRectangle"> Time Elapsed: {Math.floor(currentTime)} seconds </div>
    </div>
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
