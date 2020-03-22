function updateHighScores() {
    var highScores = document.getElementById("highScores");
    var hsListItems = []
    hsListItems.push(
        JSON.parse(localStorage.getItem("Name")), 
        JSON.parse(localStorage.getItem("Score"))
        );

    if (hsListItems[0] === null) {
        highScores.innerText = "None yet."
    } else 
    for (var i = 0; i < hsListItems.length; i++) {
        highScores.innerText = hsListItems[i - 1] + ": " +  hsListItems[i];
    }
}

updateHighScores();