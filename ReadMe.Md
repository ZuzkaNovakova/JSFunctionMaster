# Project's name
JSFunctionMaster

## Description
The game is played by two players/teams. It consists of marking a path in a triangle made of buttons (28?) and the winner is the player/team who first connects the three sides of the triangle. In order to gain a button - change the button to the player´s/team´s color -, the player/team has to answer randomly chosen question. As long as the answer is correct, the player/team can continue marking the path. As soon as a question is answered incorrectly, the turns change and the second player/team starts answering the questions. The game is over when all questions are used (total 28?) or when one of the players/teams connects the three sides.


## MVP (DOM - CANVAS)
### Technique:
DOM manipulation and Vanilla JavaScript

### Steps to do:
##### Start Screen
Start Section contains the Title & the Play Button (after clicking on the Play Button, Start Section changes to Display: none and the Game Section from Display: none to Display: block).

##### Game Screen
Game Section contains the Triangle Field, Emerging questions field, ?Answers Field (or incorporate this field into the clicked button), Punctuation. The Triangle Field consists of buttons, after clicking on a button a question appears, if true, button player´s color, if false, button remains grey. Sum the punctuation. At the moment all questions answered (array of questions, all removed), Display: none, AndTheWinnerIs Section Display: block.

##### Game Over Screen/Win Screen
Section AndTheWinnerIs contains the AndTheWinnerIs color field/button and sum the points. Click to Play again button (Section AndTheWinnerIs Section Display:none, Start Section Display: block).



## Backlog

// Each of the players/teams has one option to use Google for help (added in the main screen, after a click on a button, option no longer available).
// To find out whether triangles´ sides have been connected.
// Draw the starter player using a button swapping colors on the Start Screen.
// Creating a chrono to set a timelimit for each question.
// Noises - after a button is gained/lost, after the three sides are connected.
 


## Data structure
Classes and methods definition.


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen


## Task
Task definition in order of priority


## Links


### Trello
https://trello.com/b/s2MI9DxG/tablero-sin-t%C3%ADtulo


### Git
URls for the project repo and deploy
[Link Repo]https://github.com/ZuzkaNovakova/JSFunctionMaster.git
[Link Deploy](http://github.com)


### Slides
https://slides.com/zuzananovakova