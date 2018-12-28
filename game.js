class Game {
  constructor(PlayerOneName, PlayerTwoName) {
    this.turn = 1;
    this.playerOne = PlayerOneName;
    this.playerTwoName = PlayerTwoName;
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
    this.numberOfClicks = 0;
    this.hexaButtonsArray = document.getElementsByClassName("hexa-button");
    this.questionsAndAnswers = [
    {"question": "This method returns the index of the first element in the array that satisfies the provided testing function.",
     "answer": "findIndex"}, 
    {"question": "This method is used to merge two or more arrays. It does not change the existing arrays, but instead returns a new array.", 
      "answer": "concat"}, 
    {"question": "This method creates a new array with all elements that pass the test implemented by the provided function.",
      "answer": "filter"}, 
    {"question": "This method executes a provided function once for each array element.",
     "answer": "forEach"},
    {"question": "This method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.",
      "answer": "join"}, 
    {"question": "This method returns a new Array Iterator object that contains the keys for each index in the array.", 
      "answer": "keys"}, 
    {"question": "This method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.",
      "answer": "lastIndexOf"}, 
    {"question": "This method creates a new array with the results of calling a provided function on every element in the calling array.", 
      "answer": "map"},
    {"question": "This method removes the last element from an array and returns that element. This method changes the length of the array",
      "answer": "pop"}, 
    {"question": "This method adds one or more elements to the end of an array and returns the new length of the array.",
      "answer": "push"}, 
    {"question": "This method executes a reducer function (that you provide) on each member of the array resulting in a single output value.", 
      "answer": "reduce"}, 
    {"question": "This method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.", 
      "answer": "reverse"}, 
    {"question": "This method removes the first element from an array and returns that removed element. This method changes the length of the array.",
      "answer": "shift"}, 
    {"question": "This method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.", 
      "answer": "slice"}, 
    {"question": "This method tests whether at least one element in the array passes the test implemented by the provided function.", 
      "answer": "some"}, 
    {"question": "This method sorts the elements of an array in place and returns the array. The default order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.",
      "answer": "sort"}, 
    {"question": "This method changes the contents of an array by removing or replacing existing elements and/or adding new elements.", 
      "answer": "splice"}, 
    {"question": "This method returns a string representing the specified array and its elements.",
      "answer": "toString"}, 
    {"question": "This method adds one or more elements to the beginning of an array and returns the new length of the array.",
      "answer": "unshift"}, 
    {"question": "This method tests whether all elements in the array pass the test implemented by the provided function.",
      "answer": "every"}, 
    {"question": "This method returns a new Array Iterator object that contains the key/value pairs for each index in the array.", 
      "answer": "entries"}, 
    {"question": "This method fills all the elements of an array from a start index to an end index with a static value. The end index is not included.",
      "answer": "fill"}, 
    {"question": "This method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.", 
      "answer": "find"}, 
    {"question": "This method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.", 
      "answer":"flat"}, 
    {"question": "This method first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map followed by a flat of depth 1.", 
      "answer":"flatMap"}, 
    {"question": "This method determines whether an array includes a certain value among its entries, returning true or false as appropriate.", 
      "answer": "includes"}, 
    {"question": "This method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.", 
      "answer": "reduceRight"},
    {"question": "This method returns a new Array Iterator object that contains the values for each index in the array.", 
      "answer": "values"}
    ]
  }

  shuffleQuestionsAndAnswers() {
    var j, x, i;
    for (i = this.questionsAndAnswers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.questionsAndAnswers[i];
        this.questionsAndAnswers[i] = this.questionsAndAnswers[j];
        this.questionsAndAnswers[j] = x;
    }
    return this.questionsAndAnswers;
  }
  
  handleClickElement(event) {
    let buttonNumber = event.target.innerHTML;
    let questionField = document.getElementById("question-field");
    questionField.innerHTML = this.questionsAndAnswers[buttonNumber].question.toString();
    console.log("Correct answer is" + " " + this.questionsAndAnswers[buttonNumber].answer.toString());
    event.target.style.backgroundColor = "rgb(76, 180, 194)";
    this.numberOfClicks++;
  }

  assignClickToElement() {
    for (let i = 0; i < this.hexaButtonsArray.length; i++){
      this.hexaButtonsArray[i].addEventListener('click', this.handleClickElement.bind(this), this.numberOfClicks);
    }
  }

  /* I don´t like this code and I suppose I should shorten it with CBs, but when I try, I don´t know how to get
  the value of the looped element outside the loop (this.hexaButtonsArray[i])... */
  submitAnswer() {
    let submittedAnswer = document.getElementById("input-answer").value;
    for (let i = 0; i < this.hexaButtonsArray.length; i++) {
      if (this.hexaButtonsArray[i].style.backgroundColor === "rgb(76, 180, 194)") {
        let buttonClickedNumber = this.hexaButtonsArray[i].innerHTML;
        console.log("ButtonClickedNumber" + " " + buttonClickedNumber);
        console.log("Buttons clicked" + " " + this.numberOfClicks + " " + "times");
        if (this.questionsAndAnswers[buttonClickedNumber].answer === submittedAnswer) {
          console.log("Correct Player Number" + " " + this.turn);
          let wellDone = document.getElementById("what-is-next-board");
          wellDone.innerHTML = "Well done! You can continue.";
          document.getElementById("input-answer").value = null;

          /*Create function evaluateAnswer() ?*/
          if (this.turn === 1) {
            this.pointsPlayerOne++;

            /*Create function displayPointsPlayerOne() ?*/
            let displayPointsPlayerOne = document.getElementById("display-points-player-one");
            displayPointsPlayerOne.innerHTML = this.pointsPlayerOne;
            
            /*Create function changeImageToPlayerOne() ?*/ 
            var img = '<img src="images/ironhack_blue.png" height="50" width="45">';
            this.hexaButtonsArray[i].innerHTML = img;
            this.hexaButtonsArray[i].style.backgroundColor = "white"}
          
          else if (this.turn === 2) {
            this.pointsPlayerTwo++;

            /*Create function displayePointsPlayerTwo() ?*/
            let displayPointsPlayerTwo = document.getElementById("display-points-player-two"); 
            displayPointsPlayerTwo.innerHTML = this.pointsPlayerTwo;

            /*Create function changeImageToPlayerTwo() ?*/
            var img = '<img src="images/ironhack_black.png" height="50" width="45">';
            this.hexaButtonsArray[i].innerHTML = img;
            this.hexaButtonsArray[i].style.backgroundColor = "white"; 
          }
        } else {
          document.getElementById("input-answer").value = null;
          this.hexaButtonsArray[i].style.backgroundColor = "rgb(160, 221, 229";
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


  /*At the moment I don´t see how to access changeToWinnerScreen() from here... */
  gameOver() {
    if (this.numberOfClicks === 28) {changeToWinnerScreen()};
  }

}  


