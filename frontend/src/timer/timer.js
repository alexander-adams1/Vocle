import { useCallback, useState } from "react";
import { use1Second } from "./useSeconds";
import playAudio from '../audioImplementation/AudioPlayer';

export const SingleTimer = (
    {
    
  seconds: initialSeconds = 0,
  running: initiallyRunning = false
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);
  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );
  const start = () => {
    setRunning(true);
    playAudio(`https://p.scdn.co/mp3-preview/2e3c2595984f1beef0c621672469359157e98d3c?cid=fbf528e0063e4820b4fd570f750f297d`, 4)
  }
  const pause = () => {
    setRunning(false);
    playAudio(`https://p.scdn.co/mp3-preview/2e3c2595984f1beef0c621672469359157e98d3c?cid=fbf528e0063e4820b4fd570f750f297d`, 4)
  }
  const reset = () => setSeconds(0);
  const stop = () => {
    pause();
    reset();
  };
  console.log('timer')
  use1Second(tick);
  return (
    <div className="singletimerclass">
      <div className="PlayButton" aria-label="click to play the song"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className="v54_100"></button></div> 
      </div>    
    <div className="greenRectangle"> {seconds} seconds </div>
    </div>
  )
};

export const MultiTimer = (
  {
  
seconds: initialSeconds = 0,
running: initiallyRunning = false
} = {}) => {
const [seconds, setSeconds] = useState(initialSeconds);
const [running, setRunning] = useState(initiallyRunning);
const tick = useCallback(
  () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
  [running]
);
const start = () => {
  setRunning(true);
  playAudio(`https://p.scdn.co/mp3-preview/2e3c2595984f1beef0c621672469359157e98d3c?cid=fbf528e0063e4820b4fd570f750f297d`, 4)
}
const pause = () => {
  setRunning(false);
  playAudio(`https://p.scdn.co/mp3-preview/2e3c2595984f1beef0c621672469359157e98d3c?cid=fbf528e0063e4820b4fd570f750f297d`, 4)
}
const reset = () => setSeconds(0);
const stop = () => {
  pause();
  reset();
};
console.log('timer')
use1Second(tick);
return (
  <div className="multitimerclass">
    <div className="PlayButton" aria-label="click to play the song"> <div onClick={running ? pause : start}> <div className="v54_101"></div><button className="v54_100"></button></div> 
    </div>    
  <div className="greenRectangle"> {seconds} seconds </div>
  </div>
)
};

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
