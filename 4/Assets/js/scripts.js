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
    //wrong answer clicked
    document.getElementById("answer1").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer2").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer4").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    //correct answer clicked
    document.getElementById("answer3").addEventListener("click", function() {
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
    //wrong answer, -5 seconds clicked
    document.getElementById("answer6").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer7").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer8").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
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
    //wrong answer, -5 seconds clicked
    document.getElementById("answer9").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer10").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer11").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
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
    //wrong answer, -5 seconds clicked
    document.getElementById("answer13").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer14").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
    document.getElementById("answer16").addEventListener("click", function() {
        alert("wrong answer, -5 seconds");
        seconds-=5;
    })
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
    tryAgain();
}

//----WINNER----//
function winner() {
    //remove elements
    elements.forEach(displayNone);
    removeEl("timeRemaining");
    removeEl("timerCount");
    //add winner text & score
    createEl("winner", "h2", "winner text-center", "winner", "Finished!");
    createEl("score", "h3", "score text-center", "score", "Your score: "+seconds);
    //winner score = time left
    var userScore = seconds;
    var highScoreName = prompt("Enter your name for high score ranking:");
    //verify name input
    while (highScoreName === "") {
        alert("Must enter a name!")
        highScoreName = prompt("Enter your name for high score ranking:");
    }
    //write score to localStorage
    highScores.push(highScoreName, userScore);
    localStorage.setItem("Scores", JSON.stringify(highScores));
    //try again option
    tryAgain();
}

//try again
function tryAgain() {
    createEl("tryAgain", "button", "btn btn-secondary", "tryAgain", "Try Again?")
    document.getElementById("tryAgain").addEventListener("click", function() {
        location.reload();
    })
}

