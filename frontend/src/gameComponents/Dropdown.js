import AsyncSelect from "react-select/async";

const Dropdown = () => {
    // mocking data taken from backend API request.
    const mockOptions = [
        {value: "22 - Taylor Swift", label: "22 - Taylor Swift"}, 
        {value: "Can't Hold Us (feat. Ray Dalton) - Macklemore & Ryan Lewis, Macklemore, Ryan Lewis, Ray Dalton", label: "Can't Hold Us (feat. Ray Dalton) - Macklemore & Ryan Lewis, Macklemore, Ryan Lewis, Ray Dalton"},
        {value: "Antidode - Travis Scott", label: "Antidote - Travis Scott"}
    ]
     
    const handleChange = (selectedOption) => {
       console.log("handleChange", selectedOption.value); 
       return selectedOption.value
    };


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

    return <AsyncSelect className="dropdown_class" id="dropdown_class" placeholder={<div>Know the song? Search for the artist/title</div>} loadOptions={loadOptions} onChange={handleChange} />
   
}

export default Dropdown;