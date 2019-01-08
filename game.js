class Game {
  constructor(PlayerOneName, PlayerTwoName, questions) {
    this.turn = 1;
    this.playerOne = PlayerOneName;
    this.playerTwoName = PlayerTwoName;
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
    this.numberOfClicks = 0;
    this.darkGreenButtons = [];
    this.lightGreenButtons = 28;
    this.hexaButtonsArray = document.getElementsByClassName("hexa-button");
    this.functionsReference = [];
    this.questionsAndAnswers = questions;
  }

  shuffleQuestionsAndAnswers() {
    var j, x, i;
    for (i = this.questionsAndAnswers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.questionsAndAnswers[i];
        this.questionsAndAnswers[i] = this.questionsAndAnswers[j];
        this.questionsAndAnswers[j] = x;
    }
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
    button.style.backgroundColor = "rgb(76, 180, 194)";
  }

  isSameBackGroundColor(button, color) {
    return button.style.backgroundColor === color
  }

  changeBackGroundColor(button, color) {
    button.style.backgroundColor = "rgb(160, 221, 229)"
  }

  addClassDark(button) {
    button.className += " dark";
  }

  removeEventsListener() {
    for (let i = 0; i < this.hexaButtonsArray.length; i++) {
      this.hexaButtonsArray[i].removeEventListener("click", this.functionsReference[i], false)
    }
  }

  handleClickElement(event) {
    // console.log("pushed")
    // this.addClassDark(event.target)
    
    /*Check that the players haven´t used all clicks they have (let´s give them 32) and that there are still light green buttons left */  
    // else
    /*Players did more than 32 clicks without submitting 28 answers correctly.
    TO DO: Change to last section, repeat "Stop playing and study harder!"?*/
    if (this.numberOfClicks < 32 && this.lightGreenButtons != 0) {

      /*Prevent players click more than one button:*/
      /*Check if there is a dark green button cliked:*/
      for (let i = 0; i < this.hexaButtonsArray.length; i++) {
        if (this.isSameBackGroundColor(this.hexaButtonsArray[i], "rgb(76, 180, 194)")) { 
          this.darkGreenButtons.push(this.hexaButtonsArray[i])
          // this.removeEventsListener()
        }
      }
      // console.log(this.darkGreenButtons.length);

      /*if more than one button is clicked:*/
      if (this.darkGreenButtons.length >= 1) {
        let nextOne = document.getElementById("what-is-next-board");
        nextOne.innerHTML = "You can only choose one button.";
        this.darkGreenButtons.splice(0);
        console.log("too many buttons clicked");
        for (let i = 0; i < this.hexaButtonsArray.length; i++) {
          if (this.isSameBackGroundColor(this.hexaButtonsArray[i], "rgb(76, 180, 194)")) { 
            this.changeBackGroundColor(this.hexaButtonsArray[i] , "rgb(160, 221, 229)")
          }
        };

        /*if only one button is clicked:*/
      } else {
        let buttonPressed = event.target
        this.showQuestion(buttonPressed)
        
        this.showAnswer(buttonPressed);
        this.changeButtonColor(buttonPressed);
        this.numberOfClicks++
      };
    } else {
      console.log("Game over")
      let questionField = document.getElementById("question-field");
      questionField.innerHTML = "Stop playig and study harder!";
    }    
  }


  /*startTimer(event) {
   console.log("Turn is" + this.turn) 
   let timeLeft = 30;
   let showSecondsLeft = document.getElementById('timer-panel');
   setInterval(function() {
     timeLeft--;
     if (timeLeft >= 0) {
       showSecondsLeft.innerHTML = timeLeft};
     if (timeLeft === 0) {
       console.log("TIMEOUT");
       showSecondsLeft.innerHTML = "Time Out! Turns to be changed.";
       console.log("Turn is" + this.turn);
     } 
   }, 1000);
  };*/
  /*TO DO:
  - stop timer when button color back to light green (wrong answer submitted) or when white (correct answer submitted);
  - change turns if timeout;
  - stop timer when more buttons are clicked;
  */


  assignClickToElement() {
    for (let i = 0; i < this.hexaButtonsArray.length; i++){
      this.functionsReference[i] = this.handleClickElement.bind(this);
      this.hexaButtonsArray[i].addEventListener('click', this.functionsReference[i] , this.numberOfClicks);
      // this.hexaButtonsArray[i].addEventListener('click', this.startTimer.bind(this));
    } 
  }

  submitAnswer() {
    let submittedAnswer = document.getElementById("input-answer").value;

    /* Search for the clicked button number/index based on clicked button color and the correct answer based on the button number/index within this.hexaButtonsArray. Index/number of the 
    button corresponds to index of the answer: x within this.questionsAndAnswers. */
    for (let i = 0; i < this.hexaButtonsArray.length; i++) {
      if (this.hexaButtonsArray[i].style.backgroundColor === "rgb(76, 180, 194)") {
        let buttonClickedNumber = this.hexaButtonsArray[i].innerHTML;
        console.log("ButtonClickedNumber" + " " + buttonClickedNumber);
        console.log("Buttons clicked" + " " + this.numberOfClicks + " " + "times");

        /* Compare correct and submitted answer: */
        if (this.questionsAndAnswers[buttonClickedNumber].answer === submittedAnswer) {
          console.log("Correct Player Number" + " " + this.turn);
          let wellDone = document.getElementById("what-is-next-board");
          wellDone.innerHTML = "Well done! You can continue.";
          document.getElementById("input-answer").value = null;

          /*If clicked by Player One*/
          if (this.turn === 1) {
            this.pointsPlayerOne++;

            /*Display points Player One*/
            let displayPointsPlayerOne = document.getElementById("display-points-player-one");
            displayPointsPlayerOne.innerHTML = this.pointsPlayerOne;
            
            /*Change image for Player One, check number of green buttons, if none left, we have the winner
            TO DO: Change to last section, show the winner*/ 
            var img = '<img src="images/ironhack_blue.png" height="50" width="45">';
            this.hexaButtonsArray[i].innerHTML = img;
            this.hexaButtonsArray[i].style.backgroundColor = "white";
            /*STOP TIMER HERE?*/
            this.lightGreenButtons--;
            console.log("number of light green" + this.lightGreenButtons)
            if (this.lightGreenButtons === 0) {
              let questionField = document.getElementById("question-field");
              questionField.innerHTML = "I think we have a winner";
              console.log("I think we have a winner");
            }  
          }
          /*If clicked by Player Two*/
          else if (this.turn === 2) {
            this.pointsPlayerTwo++;

            /*Display points Player Two*/
            let displayPointsPlayerTwo = document.getElementById("display-points-player-two"); 
            displayPointsPlayerTwo.innerHTML = this.pointsPlayerTwo;

            /*Change image for Player Two, check number of green buttons, if none left, we have the winner.
            TO DO: Change to last section, show the winner*/
            var img = '<img src="images/ironhack_black.png" height="50" width="45">';
            this.hexaButtonsArray[i].innerHTML = img;
            this.hexaButtonsArray[i].style.backgroundColor = "white";
            /*STOP TIMER HERE?*/
            this.lightGreenButtons--; 
            console.log("number of light green" + this.lightGreenButtons)
            if (this.lightGreenButtons === 0) {
              let questionField = document.getElementById("question-field");
              questionField.innerHTML = "I think we have a winner";
              console.log("I think we have a winner");
            }
          }

        /*If incorrect answer submitted*/  
        } else {
          document.getElementById("input-answer").value = null;
          this.hexaButtonsArray[i].style.backgroundColor = "rgb(160, 221, 229)";
          /*STOP TIMER HERE?
          clearInterval(varSetInterval);*/

          console.log("Next one");
          let nextOne = document.getElementById("what-is-next-board");
          nextOne.innerHTML = "Sorry, time to change turns."
          this.changeTurn()};
      } 
    }
  }
  
  changeTurn () {
    if (this.turn === 1) {
      this.turn = 2
    } else {
      this.turn = 1}
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
  };


}

 


