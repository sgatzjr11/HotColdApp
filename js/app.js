
$(document).ready(function(){
	
    /*---Declaring variables---*/
    var randomNumber;
    var guessFlag;
    var guessCount;
    var playerGuess;
    var found = false;
    
    /*--Start new game on page load---*/
    newGame();
    
    /*---Submit guess---*/
    
    $("form").submit(function(event){
        event.preventDefault();

        if(!found){
          playerGuess = $('#userGuess').val();   //sets player guess from input 
          console.log('PlayerGuess:' + playerGuess);
          clearText();     //clear text box with directions
          setFocus();       //focus on text box for user
          guessFlag = checkGuess(playerGuess);       //input from player gets checked in checkGuess function
          if(!guessFlag){
              guessCount++;
              setCount(guessCount);
              $("ul#guessList").append("<li>" + playerGuess + "</li>");
              guessFlag = checkRange(Math.abs(randomNumber - playerGuess));
          };
        }else 
              {
                setFeedback("Nice guess you won the game. Start a new game!!");
              };
        
    });
    
    /*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	})

	/*--- Create a New Game! ---*/
    
	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}
    
  
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	})

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    /*---Generate random number---*/
    function generateNumber(){
        var generateNumber = Math.floor((Math.random()*100)+1);
        console.log("Random number generated " + generateNumber);
        
        return generateNumber;
    }

    /*--- Set focus to the inputbox ---*/
    function setFocus() {
       document.getElementById("userGuess").focus();
    }

    /*--- Clear the text box ---*/
    function clearText(){
      $('#userGuess').val('');
    }

      /*--- Check if the User's Guess meets the rules---*/
    function checkGuess(playerGuess) {
    if (isNaN(playerGuess)) {
      setFeedback("No luck! I accept only numbers.");
      return true;
    } else if (playerGuess < 1 || playerGuess > 100) {
      setFeedback("Oops! Your guess has to be a number between 1 and 100!");
      return true;
    //}else if ($.trim(playerGuess) == '') {
      //setFeedback("Please enter your guess!");
      //return true;
    } else {
      return false;
    }
  };


    //Check range of players guess from random number
    function checkRange(guessDiff){
      if(guessDiff == 0){
        setFeedback("Congrats! You got it!!");
        found = true;
        return false;
      }
      else if(guessDiff <= 5){
        setFeedback("You're on fire!");
        return true;
      }
      else if(guessDiff <= 10){
        setFeedback("You're getting hot!");
        return true;
      }
      else if(guessDiff >=10 && guessDiff <= 20){
        setFeedback("You're getting warmer");
        return true;
      }
      else if(guessDiff >=20 && guessDiff <= 30){
        setFeedback("You're getting cold!");
        return true;
      }
      else if(guessDiff >=30 && guessDiff <= 40){
        setFeedback("You're getting colder!");
        return true;
      }
      else{
        setFeedback("You're as cold as ice!");
        return true;
      }
    };
    
    /*--- Set the guess count ---*/
    function setCount(count){
      $('#count').text(guessCount);
    }
    //---Sets feedback in top box for user to read-----//
    function setFeedback(feedback){     
      $('#feedback').text(feedback);
    }


});


