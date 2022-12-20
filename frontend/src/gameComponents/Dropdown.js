import { useState } from "react";
import AsyncSelect from "react-select/async";
import { resultMapSinglePlayer } from "../overlays/inputplaylistsingle";
import { resultMapMultiPlayer } from "../overlays/inputplaylistmulti";
import { resultMap } from "../resultMap";


const Dropdown = () => {
    const songOptions = []

    // Gets the list of tracks in artists in a given playlist
    resultMap.get(`Tracks and Artists List`).forEach((item, index) => {
        console.log(item)
        const trackDictionary = {};
        trackDictionary.value = item
        trackDictionary.label = item
        songOptions.push(trackDictionary)
    })
     
    // dictates which option in the list is to be returned (based on which was selected)
    const handleChange = (selectedOption) => {
       console.log("handleChange", selectedOption.value); 
       return selectedOption.value
    };

    // loads the options from the mock options list based on what's being typed in the bar
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = songOptions.filter((option) => 
            option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            console.log("loadOptions", searchValue, filteredOptions);
            callback(filteredOptions);
        }, 2000);
    };

    return <AsyncSelect className="dropdown_class" role="submit" aria-label="dropdown" id="dropdown_class" menuPlacement="auto" placeholder={<div>Know the song? Search for the artist/title</div>} loadOptions={loadOptions} onChange={handleChange} />
   
}

export default Dropdown;