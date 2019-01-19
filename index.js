
function clickPlayButton() {
  document.getElementById("start-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.getElementById("and-the-winner-is-section").style.display = "none";
}


function changeToWinnerScreen() { 
  document.getElementById("game-section").style.display = "none";
  document.getElementById("and-the-winner-is-section").style.display = "block";
  document.getElementById("start-section").style.display = "none";
}

function changeToStartScreen() {
  document.getElementById("and-the-winner-is-section").style.display = "none";
  document.getElementById("start-section").style.display = "block";
  document.getElementById("game-section").style.display = "none";
  /*!!!!!!!!!!reset everything*/
}


document.getElementById("play-button").addEventListener("click", clickPlayButton);
document.getElementById("play-again-button").addEventListener("click", changeToStartScreen);



const myGame = new Game(questionsAndAnswers, changeToWinnerScreen);
myGame.shuffleQuestionsAndAnswers();
myGame.assignClickToElement();
myGame.assignClickToAskMDN();
myGame.assignNames()




