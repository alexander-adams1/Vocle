import React, {useState,  SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import Question from './Questions'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Singleplayer from './Singleplayer';
import LoginModal from './loginmodal';

class Home extends Component{

state = {
       displayQuestions: false,
       displayModal: false
}


displayQuestion = () => {
  console.log('called')
   this.setState({
      displayQuestions: !this.state.displayQuestions
  })
}

displayModal = () =>
{
  this.setState({
    displayModal: !this.state.displayModal
  })
}

render() {

    console.log('nice')
    let questions = null
    let modals = null

    if(this.state.displayModal)
    {
      modals = (
        <div>
          <LoginModal/>
        </div>
      )
    }
    if(this.state.displayQuestions ) {
      questions = (
      <div>
          <Question/>
      </div>
      )
  }
    return (
        <div className="v1_3">
          <div className="v122_910">
            <div className="v10_67"></div>
          </div>
          <div className="v122_909">
          <button className="v122_912" onClick={this.displayQuestion}><span className="v10_7">Singleplayer
          </span></button>
            {questions}
          </div>

          <div className="v122_913">
            <div className="v45_3"></div>
          </div>
          <div className="v71_26">
            <div className="v71_31"></div>
            <div className="v71_29"></div><span className="v71_28">Vocle</span>
            <div className="v71_30"></div>
            <div className="v71_33"></div>
          </div>
          <div className="v122_999">
          <button className="v122_915" onClick={this.displayModal}><span className="v10_8">Multiplayer
          </span>
          </button>
            {modals}
          </div>
        </div>
    )

}
}


export default Home;