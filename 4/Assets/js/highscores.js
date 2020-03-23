function createEl(varName, elementType, className, idName, text) {
    varName = document.createElement(elementType);
    varName.setAttribute("class", className);
    varName.setAttribute("id", idName);
    varName.setAttribute("style", "margin: 5px");
    varName.innerText = text;
    document.getElementById("highScores").appendChild(varName);
}

function updateHighScores() {
    var highScores = document.getElementById("highScores");
    var hsListItems = localStorage.getItem("Scores");

    if (hsListItems[0] === null) {
        highScores.innerText = "None yet."
    } else {
        var scores = hsListItems.split(" ");
        for (var i = 0; i < scores.length; i++) {
            createEl("score", "p", "score", "score"+i, scores[i]);
        }
    }
}

updateHighScores();
