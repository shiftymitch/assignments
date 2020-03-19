//----VARS----//
var webAPIs = document.getElementById("webAPIs");
var replaceEl = document.getElementById("replace");
var parentEl = replaceEl.parentElement;
var startButton = document.getElementById("start");
var seconds = 30;

//----FUNCTIONS----//
//element creator
function createEl(varName, elType, className, idName, innerText) {
    varName = document.createElement(elType);
    varName.setAttribute("class", className);
    varName.setAttribute("id", idName);
    varName.setAttribute("style", "margin: 5px");
    varName.innerText = innerText;
    parentEl.appendChild(varName);
}


//----START QUIZ----//
startButton.addEventListener("click", function() {
    //hide 1st div
    replaceEl.style = "display: none";
    webAPIs.style = "display: none";
    //create timer text
    createEl("timeRemaining", "p", "timerText text-center", "timerText", "Time Remaining:");
    createEl("timerCount", "h2", "timerCount text-center", "timerCount", seconds + " seconds");
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
    createEl("button1", "button", "btn btn-secondary", "Answer 1", "strings");
    createEl("button2", "button", "btn btn-secondary", "Answer 2", "booleans");
    createEl("button3", "button", "btn btn-secondary", "Answer 3", "alert");
    createEl("button4", "button", "btn btn-secondary", "Answer 4", "numbers");
}

// WHEN I answer a question
// THEN I am presented with another question


// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock


// WHEN all questions are answered or the timer reaches 0
// THEN the game is over


// WHEN the game is over
// THEN I can save my initials and score

