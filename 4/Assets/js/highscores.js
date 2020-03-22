function updateHighScores() {
    var highScores = document.getElementById("highScores");
    var hsListItems = JSON.parse(localStorage.getItem("Scores"));

    if (hsListItems[0] === null) {
        highScores.innerText = "None yet."
    } else 
    for (var i = 0; i < hsListItems.length; i++) {
        highScores.innerText = hsListItems[i-1] + ": " +  hsListItems[i];
    }
    console.log(hsListItems);
}

updateHighScores();
