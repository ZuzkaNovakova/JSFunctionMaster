class Game {
  constructor(questions) {
    this.turn = "player1";
    this.playerOneName = "";
    this.playerTwoName = "";
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
    this.numberOfClicks = 0;
    this.darkGreenButtons = [];
    this.lightGreenButtons = 28;
    this.hexaButtonsArray = document.getElementsByClassName("hexa-button");
    this.functionsReference = [];
    this.questionsAndAnswers = questions;
    this.changeToWinnerScreen = changeToWinnerScreen;
    this.totalClicks = 0;
    this.buttonColors = 
      {"primary" : "rgb(160, 221, 229)",
      "clicked": "rgb(76, 180, 194)" };
    this.playerNameColor = 
      {"primary" : "rgb(214, 237, 240)",
      "yourTurn": "rgb(229, 245, 3)"}  
  }

  /*$ console logs*/

  shuffleQuestionsAndAnswers() {
    let j, x, i;
    for (i = this.questionsAndAnswers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.questionsAndAnswers[i];
        this.questionsAndAnswers[i] = this.questionsAndAnswers[j];
        this.questionsAndAnswers[j] = x;
    }
  }

  getNameOne() {
    this.playerOneName = document.getElementById("input-one-name").value;
    let playerOne = document.getElementById("player-one");
    playerOne.innerHTML = this.playerOneName;
  }

  getNameTwo() {
    this.playerTwoName = document.getElementById("input-two-name").value;
    let playerTwo = document.getElementById("player-two");
    playerTwo.innerHTML = this.playerTwoName;
  }

  assignNames() {
    document.getElementById("button-submit-one-name").addEventListener('click', this.getNameOne.bind(this), this.playerOneName);
    document.getElementById("button-submit-two-name").addEventListener('click', this.getNameTwo.bind(this), this.playerTwoName);
  }

  showQuestion(button) {
    let indexButton = button.innerHTML;
    let questionField = document.getElementById("question-field");
    questionField.innerHTML = this.questionsAndAnswers[indexButton].question.toString();
    let nextOne = document.getElementById("what-is-next-board");
    nextOne.innerHTML = "Submit your answer, please.";
  }

  showAnswer(button) {
    let indexButton = button.innerHTML;
    console.log("Correct answer is" + " " + this.questionsAndAnswers[indexButton].answer.toString());
  }

  changeButtonColor(button) {
    button.style.backgroundColor = this.buttonColors.clicked;
  }

  isSameBackGroundColor(button, color) {
    return button.style.backgroundColor === color
  }

  changeBackGroundColor(button, color) {
    button.style.backgroundColor = this.buttonColors.primary;
  }

  addClassDark(button) {
    button.className += " dark";
  }
  
  removeClassDark(button) {
    button.className = "hexa-button";
  }

  removeEventsListener(id) {
    this.hexaButtonsArray[id].removeEventListener("click", this.functionsReference[id], false)
  }

  amIinMiddleOfTurn() {
    const darkerElements = document.getElementsByClassName('dark');
    return !!darkerElements.length  ;
  }

  assignSubmitButton() {
    const buttonAnswer = document.getElementById('button-submit-answer')
    buttonAnswer.addEventListener('click', this.checkAnswer.bind(this));
  }

  cleanInput() {
    document.getElementById("input-answer").value = null;
  }

  displayPointsPlayerOne () {
    let displayPointsPlayerOne = document.getElementById("display-points-player-one");
    displayPointsPlayerOne.innerHTML = this.pointsPlayerOne;
  }

  displayPointsPlayerTwo () {
    let displayPointsPlayerTwo = document.getElementById("display-points-player-two");
    displayPointsPlayerTwo.innerHTML = this.pointsPlayerTwo;
  }

  doTheTurnCleanUp() {
    this.removeClassDark(this.buttonPressed);
    this.removeEventsListener(this.buttonPressed.id);
    this.cleanInput();
  }

  wellDoneMessage() {
    let wellDone = document.getElementById("what-is-next-board");
    wellDone.innerHTML = "Well done! You can continue.";
  }

  correctAnswerSubmitted() {
    this.doTheTurnCleanUp();
    this.lightGreenButtons--;
    this.checkLightGreenButtons();
    this.wellDoneMessage();
    if (this.turn === "player1") {
      var img = '<img src="/images/ironhack_blue.png" height="50" width="45">';
      this.hexaButtonsArray[this.buttonPressed.id].innerHTML = img;
      this.hexaButtonsArray[this.buttonPressed.id].style.backgroundColor = "white";
      this.pointsPlayerOne++;
      this.displayPointsPlayerOne();
    }
    if (this.turn === "player2") {
      let image =  document.createElement("img")
      
      var img = '<img src="/images/ironhack_black.png" height="50" width="45">';
      this.hexaButtonsArray[this.buttonPressed.id].innerHTML = img;
      this.hexaButtonsArray[this.buttonPressed.id].style.backgroundColor = "white";
      this.pointsPlayerTwo++;
      this.displayPointsPlayerTwo();
    }
    this.stopTimer();
  }

  changeColor(player, color) {
    let originalNameColor = document.getElementById(player);
    originalNameColor.style.color = color;
  }

  changeNameTurnColor () {
    if (this.turn === "player1") {
      this.changeColor("player-one", this.playerNameColor.primary)
      this.changeColor("player-two", this.playerNameColor.yourTurn)  
    }
    if (this.turn === "player2") {
      this.changeColor("player-two", this.playerNameColor.primary)
      this.changeColor("player-one", this.playerNameColor.yourTurn)
    }
  }

  timeToChangeTurnsMessage() {
    let nextOne = document.getElementById("what-is-next-board");
    nextOne.innerHTML = "Sorry, time to change turns.";
  }

  incorrectAnswerSubmitted() {
    this.doTheTurnCleanUp();
    this.hexaButtonsArray[this.buttonPressed.id].style.backgroundColor = this.buttonColors.primary;
    this.timeToChangeTurnsMessage();
    this.changeNameTurnColor();
    this.changeTurn();
    this.stopTimer();
  }

  checkAnswer(event) {
    let submittedAnswer = document.getElementById("input-answer").value;
    if (submittedAnswer === this.questionsAndAnswers[this.buttonPressed.id].answer.toString()) {
      this.correctAnswerSubmitted();
    } else { 
      this.incorrectAnswerSubmitted();
    }
  }

  removeEventsListener() {
    for (let i = 0; i < this.hexaButtonsArray.length; i++) {
      if (this.hexaButtonsArray[i].style.backgroundColor === this.buttonColors.clicked){
      this.hexaButtonsArray[i].removeEventListener("click", this.functionsReference[i], false)}
    }
  }

  checkTotalClicks(button) {
    if(this.totalClicks >= 3) {
      let result = document.getElementById("result-panel");
      result.innerHTML = "Stop playing and study harder!";
      this.changeToWinnerScreen();
    }
  }

  displayWinner () {
    if (this.pointsPlayerOne > this.pointsPlayerTwo) {
      let winner = document.getElementById("winner-name");
      winner.innerHTML = this.playerOneName;
    }
    if (this.pointsPlayerOne < this.pointsPlayerTwo) {
      let winner = document.getElementById("winner-name");
      winner.innerHTML = this.playerTwoName;
    }
  }

  checkLightGreenButtons(button) {
    if (this.lightGreenButtons === 0) {
      let result = document.getElementById("result-panel");
      result.innerHTML = "And the winner is:"
      this.displayWinner();
      this.changeToWinnerScreen();
    }
  }

  handleClickElement(event) {
    console.log(event.target);
    if(!this.amIinMiddleOfTurn()) {
      const buttonPressed = event.target
      this.buttonPressed = buttonPressed;
      this.addClassDark(event.target);
      this.showQuestion(buttonPressed);
      this.showAnswer(buttonPressed);
      this.totalClicks++;
      this.checkTotalClicks(buttonPressed);
      this.checkLightGreenButtons(buttonPressed);
    }
  }

  startTimer(event) {
   let timeLeft = 30;
   let showSecondsLeft = document.getElementById('timer-panel');
   let that = this;
   this.timerId = setInterval(function() {
     timeLeft--;
     if (timeLeft >= 0) {
       showSecondsLeft.innerHTML = timeLeft};
     if (timeLeft === 0) {
       that.incorrectAnswerSubmitted();
       showSecondsLeft.innerHTML = "Time Out!";
     }
   }, 1000);
  }

  cleanTimerField() {
    let showSecondsLeft = document.getElementById('timer-panel');
    showSecondsLeft.innerHTML = "30";
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.cleanTimerField();
  }

  assignClickToElement() {
    for (let i = 0; i < this.hexaButtonsArray.length; i++){
      this.functionsReference[i] = this.handleClickElement.bind(this);
      this.hexaButtonsArray[i].addEventListener('click', this.functionsReference[i] , this.numberOfClicks);
      this.hexaButtonsArray[i].addEventListener('click', this.startTimer.bind(this));
    }
    this.assignSubmitButton()
  }
  
  changeTurn () {
    if (this.turn === "player1") {
      this.turn = "player2";
    } else {
      this.turn = "player1";
    }
  } 

  handleAskedMDN(e) {
    let MDNasked = e.target;
    return MDNasked.style.backgroundColor = 'transparent';
  };

  assignClickToAskMDN() {
    let arrayMDNAsked = document.getElementsByClassName('ask-mdn');
    for (let i=0; i < arrayMDNAsked.length; i++) {
      arrayMDNAsked[i].addEventListener('click', this.handleAskedMDN.bind(this))
    }
  }
}

 


