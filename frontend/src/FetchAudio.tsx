import React, { Dispatch, SetStateAction, useState } from 'react'
import { client_id, client_secret } from './private/Client Information'


export const TEXT_submit_button_text = 'Submit Guess'

// Defines an interface which specifies the type or argument accepted by the 
// RegisterInput components 
interface RegisterInputProps {
  addCommand: (guess: string) => void,
}

function RegisterInput({addGuess} : RegisterInputProps) {
  const[userInput, setUserInput] = useState<string>('');
  return (
      <div className="Command-Handler">
          <div className="Input">
              <legend>Enter a command</legend>
              <ControlledInput value={userInput} setValue={setUserInput} ariaLabel={''}/>
          </div>
          <div>
              <button className="submitButton" onClick={() => {
                      addGuess(userInput)
                      setUserInput('') // Reset userInput
                  }}>
                  {TEXT_submit_button_text}
              </button>
          </div>
      </div>
  );
}

interface ControlledInputProps {
  value: string, 
  setValue: Dispatch<SetStateAction<string>>,
  ariaLabel: string 
}

function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
  return (
      <input value={value} 
              onChange={(ev) => setValue(ev.target.value)}
              aria-label={ariaLabel}
              placeholder="Input a command">
              </input>
  );
}