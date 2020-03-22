//----VARS----//
var webAPIs = document.getElementById("webAPIs");
var replaceEl = document.getElementById("replace");
var startButton = document.getElementById("start");
var seconds = 30;
var endgame = false;
var elements = [];
var highScores = [];

//----FUNCTIONS----//
//element creator
function createEl(varName, elementType, className, idName, text) {
    varName = document.createElement(elementType);
    varName.setAttribute("class", className);
    varName.setAttribute("id", idName);
    varName.setAttribute("style", "margin: 5px");
    varName.innerText = text;
    replaceEl.appendChild(varName);
    elements.push(varName);
}
//remove original elements 
function removeEl(idName) {
    document.getElementById(idName).style = "display: none";
}
//remove all new elements
function displayNone(element) {
    if (element.style !== "display:none") {
        element.style = "display:none";
    }
}



//----START QUIZ----//
startButton.addEventListener("click", function() {
    //hide 1st div
    removeEl("webAPIs");
    removeEl("quizTitle");
    removeEl("quizText");
    removeEl("start");
    //create timer text
    var timeRemaining = document.createElement("p");
    timeRemaining.setAttribute("id", "timeRemaining");
    timeRemaining.innerText = "Time Remaining:";
    replaceEl.appendChild(timeRemaining);
    var timerCount = document.createElement("h2");
    timerCount.setAttribute("id", "timerCount");
    timerCount.innerText = seconds + " seconds";
    replaceEl.appendChild(timerCount);
    // createEl("timeRemaining", "p", "timerText text-center", "timerText", "Time Remaining:");
    // createEl("timerCount", "h2", "timerCount text-center", "timerCount", seconds + " seconds");
    //start timer
    timerUpdater();
    //create question1 text & buttons
    question1();
})


//----START TIMER----//
function timerUpdater() {
    //set interval
    var timerInterval = setInterval( 
        function() { 
        seconds--;
        //update counter seconds left
        document.getElementById("timerCount").innerText = seconds + " seconds";
        //if timer ends game over
        if (seconds === 0) {
            gameOver();
            clearInterval(timerInterval);
        } 
        //if endgame reached end pause timer
        else if (endgame === true) {
            clearInterval(timerInterval);
        }

        },
    //↓ interval milliseconds ↓
    1000
    );
}


    

//----QUESTION 1----//
function question1() {
    //question text
    createEl("question1", "p", "card-text text-center", "question1", "Commonly used datatypes DO NOT include:");
    //answer buttons
    createEl("button1", "button", "btn btn-secondary", "answer1", "strings");
    createEl("button2", "button", "btn btn-secondary", "answer2", "booleans");
    createEl("button3", "button", "btn btn-secondary", "answer3", "alert");
    createEl("button4", "button", "btn btn-secondary", "answer4", "numbers");
    //correct answer clicked
    document.getElementById("answer3").addEventListener("click", function(event) {
        elements.forEach(displayNone);
        question2();
    })
}


//----QUESTION 2----//
function question2() {
    //question text
    createEl("question2", "p", "card-text text-center", "question2", "The condition in an if/else statement is enclosed within _____.");
    //answer buttons
    createEl("button1", "button", "btn btn-secondary", "answer5", "parentheses");
    createEl("button2", "button", "btn btn-secondary", "answer6", "curly brackets");
    createEl("button3", "button", "btn btn-secondary", "answer7", "quotes");
    createEl("button4", "button", "btn btn-secondary", "answer8", "square brackets");
    
    //correct answer clicked
    document.getElementById("answer5").addEventListener("click", function() {
        elements.forEach(displayNone);
        question3();
    })
}


//----QUESTION 3----//
function question3() {
    //question text
    createEl("question3", "p", "card-text text-center", "question3", "Arrays in JavaScript can be used to store _____.");
    //answer buttons
    createEl("button1", "button", "btn btn-secondary", "answer9", "numbers and strings");
    createEl("button2", "button", "btn btn-secondary", "answer10", "other arrays");
    createEl("button3", "button", "btn btn-secondary", "answer11", "booleans");
    createEl("button4", "button", "btn btn-secondary", "answer12", "all of the above");
    //correct answer clicked
    document.getElementById("answer12").addEventListener("click", function() {
        elements.forEach(displayNone);
        question4();
    })
}

//----QUESTION 4----//
function question4() {
    //question text
    createEl("question4", "p", "card-text text-center", "question4", "String values must be enclosed within _____ when being assigned to variables.");
    //answer buttons
    createEl("button1", "button", "btn btn-secondary", "answer13", "commas");
    createEl("button2", "button", "btn btn-secondary", "answer14", "curly brackets");
    createEl("button3", "button", "btn btn-secondary", "answer15", "quotes");
    createEl("button4", "button", "btn btn-secondary", "answer16", "parentheses");
    //correct answer clicked
    document.getElementById("answer15").addEventListener("click", function() {
        elements.forEach(displayNone);
        endgame = true;
        winner();
    })
}

//gameover
function gameOver() {
    //remove elements
    elements.forEach(displayNone);
    //show game over text
    createEl("gameover", "h2", "gameover text-center", "gameover", "Game Over");
    gameover.style = "color:red";
}

//----WINNER----//
function winner() {
    //remove elements
    elements.forEach(displayNone);
    removeEl("timeRemaining");
    removeEl("timerCount");
    //add winner text & score
    createEl("winner", "h2", "winner text-center", "winner", "Congratulations, you won!");
    createEl("score", "h3", "score text-center", "score", "Your score: "+seconds);
    //winner score = time left
    var userScore = seconds;
    var highScoreName = prompt("Enter your name for high score ranking:");
    //add score data to localstorage & push to array
        // highScores.push(
        //     localStorage.setItem("Name", JSON.stringify(highScoreName)),
        //     localStorage.setItem("Score", JSON.stringify(userScore))
        // );
    highScores.push(highScoreName, userScore);
    localStorage.setItem("Scores", JSON.stringify(highScores));
}



// WHEN I answer a question
// THEN I am presented with another question


// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock


// WHEN all questions are answered or the timer reaches 0
// THEN the game is over


// WHEN the game is over
// THEN I can save my initials and score

