import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import Questionsingle from './Questionssingleplayer'
import Questionmulti from './Questionsmultiplayer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Singleplayer from './Singleplayer';
import LoginModal from './loginmodal';

class Home extends Component {

  state = {
    displayQuestionsingle: false,
    displayQuestionmulti: false,
    displayModal: false
  }


   displayQuestionSingle = () => {
    console.log('called')
    this.setState({
      displayQuestionsingle: !this.state.displayQuestionsingle,
      displayModal: false
    })
  }

  displayQuestionMulti = () =>
  {
    this.setState({
      displayQuestionmulti: !this.state.displayQuestionmulti,
      displayModal:false
    })
  }


  displayModal = () => {
    this.setState({
      displayModal: !this.state.displayModal,
      displayQuestionsingle: false
    })
  }

  // prepareSingleplayerButtonPress = () => {
  //   singleplayerButton = document.getElementByID('singleplayer-button')
    
  //   if (singleplayerButton == null) {
  //     console.log('could not find button')
  //   }

  //   else if (!(singleplayerButton instanceof Button)) {
  //     console.log('singleplayerButton found, but not instance of button')
  //   }
  //   else {
  //     singleplayerButton.addEventListener("click", this.displayQuestionSingle)
  //   }
  // }

  // prepareMultiplayerButtonPress = () => {
  //   multiplayerButton = document.getElementById('multiplayer-button')

  //   if (multiplayerButton == null) {
  //     console.log('could not find button')
  //   }

  //   else if (!(multiplayerButton instanceof Button)) {
  //     console.log('multiplayerButton found, but not instance of button')
  //   }
  //   else {
  //     multiplayerButton.addEventListener("click")
  //   }
    
  // }

  render() {

    console.log('nice')
    let singlequestions = null
    let multiquestions = null
    let modals = null

    if (this.state.displayModal) {
      modals = (
        <div>
          <LoginModal />
        </div>
      )
    }
    if (this.state.displayQuestionsingle) {
      singlequestions = (
        <div>
          <Questionsingle />
        </div>
      )
    }

    if(this.state.displayQuestionmulti)
    {
      multiquestions = (
        <div>
          <Questionmulti />
        </div>
      )
    }

    return (
      <div className="v1_3">
        <div className="v122_910">
          <div className="v10_67"></div>
        </div>
        <div className="v122_909">
          <button id="singleplayer-button" className="v122_912" onClick = {this.displayQuestionSingle}><span className="v10_7">Singleplayer
          </span></button>
          {singlequestions}
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
          <button id="multiplayer-button" className="v122_915" onClick={this.displayQuestionMulti}><span className="v10_8">Multiplayer
          </span>
          </button>
          {multiquestions}
        </div>
      </div>
    )

  }
}




export default Home;