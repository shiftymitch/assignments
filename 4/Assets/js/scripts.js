//----VARS----//
var webAPIs = document.getElementById("webAPIs");
var replaceEl = document.getElementById("replace");
var startButton = document.getElementById("start");
var seconds = 30;
var endgame = false;
var elements = [];

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
    //create question text & buttons
    question1();
})


//----START TIMER----//
function timerUpdater() {
    var timerInterval = setInterval( 
        function() { 
        seconds--;
        document.getElementById("timerCount").innerText = seconds + " seconds";
        
        if (seconds === 0) {
            gameOver();
            clearInterval(timerInterval);
        } else if (endgame === true) {
            clearInterval(timerInterval);
        }

        },
    //↓ interval milliseconds ↓
    1000
    );
}


    

//----QUESTION 1----//
function question1() {
    createEl("question1", "p", "card-text text-center", "question1", "Commonly used datatypes DO NOT include:");
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
    createEl("question2", "p", "card-text text-center", "question2", "The condition in an if/else statement is enclosed within _____.");
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
    createEl("question3", "p", "card-text text-center", "question3", "Arrays in JavaScript can be used to store _____.");
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
    createEl("question4", "p", "card-text text-center", "question4", "String values must be enclosed within _____ when being assigned to variables.");
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
    elements.forEach(displayNone);
    createEl("gameover", "h2", "gameover text-center", "gameover", "Game Over");
    gameover.style = "color:red";
}

//----WINNER----//
function winner() {
    elements.forEach(displayNone);
    removeEl("timeRemaining");
    removeEl("timerCount");
    createEl("winner", "h2", "winner text-center", "winner", "Congratulations, you won!");
    createEl("score", "h3", "score text-center", "score", "Your score: "+seconds);
    var userScore = seconds;
    var highScoreName = prompt("Enter your name for high score ranking:");
    var highScores = [];
    highScores.push(
        localStorage.setItem("Name", JSON.stringify(highScoreName)),
        localStorage.setItem("Score", JSON.stringify(userScore))
    );

}



// WHEN I answer a question
// THEN I am presented with another question


// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock


// WHEN all questions are answered or the timer reaches 0
// THEN the game is over


// WHEN the game is over
// THEN I can save my initials and score

