VOCLE

Collaborators: N/A

Overview: Vocle is a song-guessing game inspired by Heardle, with multiplayer and singleplayer options, that will play a snippet of a song either from our default playlist(the most popular current songs) or by importing a Spotify playlist by copying the url. The multiplayer game can be played by up to 4 players on the same laptop using the keys q, m, p, and z. Additionally, the singleplayer game allows up to 6 tries to guess the right answer, including a skip button if the user wants to skip to the next guess. For singleplayer, the time increment of the snippet increases for every guess, while in multiplayer the song plays for 30 seconds. 

Design Choices:

Frontend:

All files were imported from Figma to HTML and CSS, using the react libraries of useNavigate and setState to be able to open overlays and navigate between the main pages of Home, Singleplayer, and Multiplayer. We decided to create overlays because it was uneccessary to create an entirely new page for a new command input, allowing the user to backtrack his steps easily if necessary, creating a simple user interface. 

To be able to access information between classes, along with inputting information into the several exportable functions created, such as AddGuessMultiplayer, Timer, and the About modals, we nested classes within the singleplayer, home, and multiplayer to create easy accessibility and connection between the classes. Additionally, for the information that was hard to access using this method, we added Ids to certain css elements to be able to call them and access their text content, which became useful in accessing the dropdown data when the submit button was clicked, along with bringing the user to the game over screen when the timer reached 0 seconds. Additionally, we decided to use a combination of js and ts files, depending on if we needed to know the types of certain elements. This was especially useful for accessing the textContent through an css Id element. On top of that, to avoid confusion between classes, we created separate classes for single player and multiplayer elements including timer and overlays since the inputs or functionality differed, while keeping elements such as the dropdown menu, and submit buttons the same. Additionally, to avoid any confusion in multiplayer for which user clicked the key first and should input their guess, a key input of either q,p,m, or z will create a message to appear on the screen indicating which user should input their guess based off of which key was clicked first. For multiplayer, no user should be able to pause the song while it is playing, so we decided to remove the play/pause button when clicked at the beginning to avoid this occurrence. For both the singleplayer and multiplayer, incorrect guesses show up red and skips show up white to inform the user the result of their input. For a correct guess, the game over page is shown. Also on the game over page, the user is able to play again or return home to input a new playlist of their choosing or play with the default playlist, removing the need to refresh the page or having to self navigate to another page on the screen. 

In addition, we limited the user interface to avoid scrollability, creating a webpage which looks much nicer and avoids the added trouble of needing to scroll up or down to access different elements.

Backend:



Errors/Bugs: N/A


Tests:

Frontend: the frontend tests written test if the site, the singleplayer and multiplayer along with all additional components appear in the HTML document when rendering the site. The submit button is tested as well to ensure that the submit button is rendered correctly when accessing the drop down menu information and displaying the guess component onto the screen.

Backend:


How to run tests:

Navigat to the frontend directory of the project by using the command cd frontend and then running the command npm test

How to run the program:

Open the backend in Intellij and run Server while in VSCode, navigate to your frontend using cd frontend and running the command npm start. 


