import { useState } from "react";
import AsyncSelect from "react-select/async";
import { resultMapSinglePlayer } from "../overlays/inputplaylistsingle";



const Dropdown = () => {
    const mockOptions = []

    resultMapSinglePlayer.get(`Tracks and Artists List`).forEach((item, index) => {
        console.log(item)
        const trackDictionary = {};
        trackDictionary.value = item
        trackDictionary.label = item
        mockOptions.push(trackDictionary)
    })
    console.log(mockOptions)
    // mocking data taken from backend API request.
     
    // dictates which option in the list is to be returned (based on which was selected)
    const handleChange = (selectedOption) => {
       console.log("handleChange", selectedOption.value); 
       return selectedOption.value
    };

    // loads the options from the mock options list based on what's being typed in the bar
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = mockOptions.filter((option) => 
            option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            console.log("loadOptions", searchValue, filteredOptions);
            callback(filteredOptions);
        }, 2000);
    };

    const colorStyles = {
        control: styles => ({...styles, zIndex: 9999}),
        option: (styles, {isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                zIndex: isDisabled ? 0: 9999,
                cursor: isDisabled ? 'not-allowed' : 'default'
            };
        }
    }

    return <AsyncSelect className="dropdown_class" role="submit" aria-label="dropdown" id="dropdown_class" placeholder={<div>Know the song? Search for the artist/title</div>} loadOptions={loadOptions} onChange={handleChange} />
   
}

export default Dropdown;