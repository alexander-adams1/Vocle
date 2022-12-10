import React, { useState, SetStateAction, Component } from 'react'
import 'react/jsx-runtime'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Question from './Questionssingleplayer';
import Dropdown from './Dropdown';
import Home from './Home';

class Multiplayer extends Component {
    render() {
        return (
            <div class="v10_61">
                <div class="v54_113">
                    <div class="v54_114"></div>
                    <div class="v54_116">
                        <Dropdown />
                    </div>
                    </div><div class="v71_5"><div class="v71_6">
                        </div><span class="v71_7">SUBMIT</span></div>
                        <div class="v71_11"></div><span class="v71_12">User3232: All I Want For Christams is You</span>
                        <div class="v71_39"><div class="v71_34"></div><span class="v71_35">Lobby:</span>
                        <div class="v89_3"></div></div><div class="v71_40"><div class="v71_41"></div><span class="v71_42">Points:</span>
                        <div class="v89_4"></div></div><span class="v71_47">Time Elapsed: 2 Seconds</span><div class="v71_33">
                            <div class="v103_15"><div class="v103_16"></div><span class="v103_17">Vocle</span>
                            <div class="v71_29"></div><div class="v71_30"></div><div class="v71_31"></div></div><div class="v103_21">
                                <div class="v103_22"></div></div></div></div>
        )
    }
}

export default Multiplayer;