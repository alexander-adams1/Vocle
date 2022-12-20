import { useState } from 'react'
import 'react/jsx-runtime'
import GameOverScreen from '../GameOver';
import { SingleTimer } from '../timer/timer';
import { resultMap } from '../resultMap';

export const TEXT_Submit_button_singleplayer = "Submit-button"

// Adds the song guess to the screen
function Addsong() {
  console.log(resultMap.get(`Track Answer`))
  // Initializes an empty array to keep track of the songs
  var [service, setService] = useState<{ song: string, isCorrect: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [interval, setInterval] = useState(0);

  const handleServiceAdd = () => {
    console.log("song called")
    // Resets newSong
    let newSong = '';
    // Gets the text from the dropdown
    if (!gameOver) {
      const text: Element | null = document.getElementById('dropdown_class')
      if (text == null) {
        console.log("No text in the text box")

      } else if (!(text instanceof HTMLDivElement)) {
        console.log(`Found element ${text}, but it wasn't an input`)
      } else {
        // Checks that the text is of type string before storing its value
        if (typeof text.textContent === 'string') {
          newSong = text.textContent
        }
        // If the input text isn't simply the placeholder text
        if (newSong !== 'Know the song? Search for the artist/title') {
          if (newSong === resultMap.get(`Track Answer`)) {
            setGameOver(true);
            setWin(true);
            setService([...service, { song: newSong, isCorrect: 1 }]);
          } else if (service.length < 5) {
            setService([...service, { song: newSong, isCorrect: 0 }]);
            setInterval(interval + 1);
          } else {
            setService([...service, { song: newSong, isCorrect: 0 }]);
            setGameOver(true);
          }
        }
      }
    }
  };
  const handleNullSongAdd = () => {
    if (!gameOver) {
      // Adds to the list of guesses if it's under 6 (the amount that's in the single player game)
      if (service.length < 5) {
        setService([...service, { song: 'Guess skipped', isCorrect: 2 }]);
        setInterval(interval + 1);
      } else {
        // Otherwise clears the list
        // TODO: add this code into restart game --> service.splice(0, service.length);
        setService([...service, { song: 'Guess skipped', isCorrect: 2 }]);
        setGameOver(true); // TODO: Set to false in reset method
        // TODO: Add method for bringing up the modal and ending the round
      }
    }
  };

  /**
   * Resets the game on close
   */
  function onGameOverClose() {
    
    service.splice(0, service.length)
    setGameOver(false)
    setWin(false)
    setInterval(0)
  }
  

  return (
    <>
      <div className="services">
        <div className="first-division">
          <div className="v54_92">
            <button className="v54_91" onClick={handleServiceAdd} aria-label="submit guess"><span className="v54_90" role="submit">Submit</span>
            </button>
          </div>
          <div className="v54_93"><button className="v54_94" onClick={handleNullSongAdd} aria-label="skip guess">
            <span className="v54_95">Skip</span>
          </button></div>
        </div></div>

      <div className="output1" role="output" aria-label="guess added">
        {service.map((item, index) => (
          <ul className="output_list" >
            <li className={"output_el-" + item.isCorrect} aria-label={item.song} key={index}>{item.song}</li>
          </ul>
        ))}
      </div>
      <div className="open-game-over">
        {gameOver && <GameOverScreen win={win} onGameOverClose={onGameOverClose} showSingleplayer={true} winner={''}/>}
      </div>
      <div><SingleTimer singleInterval={interval} gameOver = {gameOver}/></div>
    </>

  )

}

export default Addsong;