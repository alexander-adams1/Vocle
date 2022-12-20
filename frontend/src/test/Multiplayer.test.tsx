import React from 'react';
import {render, screen} from '@testing-library/react';
import Dropdown from '../gameComponents/Dropdown';
import userEvent from '@testing-library/user-event';
import Multiplayer from '../mainPages/Multiplayer';
import App from '../App';

beforeEach(() => {
    render(<App />)
})

test('play button test', () => {
    render(<Multiplayer />)
    const playButton = screen.getByRole(/.*/, {name: "start button"});
    userEvent.click(playButton);
    
    expect(playButton).toBeInTheDocument();
})

test('all buttons show up', () => {
    render(<Multiplayer />);
    const aboutButton = screen.getByRole("button", {name: "information about vocle"});
    const spotifyButton = screen.getByRole("button", {name: "link to spotify.com"});
    const submitButton = screen.getByRole(/.*/, {name: "submit guess"});
    const dropdown = screen.getByRole(/.*/, {name: "guess dropdown"});

    expect(aboutButton).toBeInTheDocument();
    expect(spotifyButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
});

test('losing game over screen executes', () => {
    render(<Multiplayer />);
    const playButton = screen.getByRole(/.*/, {name: "start button"});
    userEvent.click(playButton);
    
    setTimeout(() => {expect(screen.getByRole(/.*/, {name: "game over screen"})).toBeInTheDocument()
    const playAgainButton = screen.getByRole(/.*/, {name: "play again button"});
    const homeButton = screen.getByRole(/.*/, {name: ""})
    expect(playAgainButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
}, 30000);
  
    
})