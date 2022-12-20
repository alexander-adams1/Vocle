import {useState}  from 'react';;

//contains the modals for both singleplayer and multiplayer, both taking in a show parameter which decides if the about modal 
//should be displayed or not

export const Singlemodal = (show) =>
{
    const[modal, setmodal] = useState(true)

    //closes the modal
    const close = () =>
    {
        setmodal(false)
    }
console.log(show)

if(show && modal)
{
    //shows the information necessary to play the singleplayer game
    return(<div 
    className="v10_21" onClick={close}><span className="v10_27">About 
</span><button className="v35_4"> X </button>
<span className="v198_11">Singleplayer Vocle features a clip from a random song from a playlist of your choosing (or the default playlist). For every guess, time is added to the length of the song clip for you to guess.
 Guess in as few tries as possible(6 guess max), using Submit to submit your song guess or Skip if you do not have a guess. Good luck!</span></div>)
}
else{
    return(
        <></>
    )
}
}

export const Multimodal = (show) =>
{
    const[modal, setmodal] = useState(true)

    //closes the modal
    const close = () =>
    {
        setmodal(false)
    }
console.log(show)
if(show && modal)
{
    //shows the information necessary to play the multiplayer game
    return(<div 
    className="v10_21" onClick={close}><span className="v10_27">About 
</span><button className="v35_4"> X </button>
<span className="v198_11">Singleplayer Vocle features a clip from a random song from a playlist of your choosing (or the default playlist). For every guess, time is added to the length of the song clip for you to guess.
 Guess in as few tries as possible(6 guess max), using Submit to submit your song guess or Skip if you do not have a guess. Good luck!</span></div>)
}
else{
    return(
        <></>
    )
}
}