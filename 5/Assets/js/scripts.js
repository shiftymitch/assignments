//global variables
var today = moment();

$(document).ready(function() {
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
$("#currentDay").text(today.format("dddd, MMMM Mo, YYYY")).css("font-weight", "bold");

// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours

//create block divs
for (var i = 1; i < 11; i++) {
    //time block variables
    var clockIn = moment().startOf("day").add(8, "h");
    var newBlock = $("<div>");
    var time = $("<h5>");
    var task = $("<input>").width("100%").height("70%");
    var nextTime = moment(clockIn).add(i-1, "h").format("h:mmA");
    //append new elements
    $(".container").append(newBlock);
    newBlock.addClass("block"+i);
    newBlock.height("120px");
    newBlock.css("border", "2px solid black");
    $(".block"+i).append(time);
    time.text(nextTime);
    time.css("margin", "5px");
    $(".block"+i).append(task);
    //change opacity of time blocks in past
    if (parseInt(nextTime.charAt(0) + nextTime.charAt(1)) < today.format("h") && nextTime.charAt(nextTime.length-2) !== "P") {
        newBlock.css("opacity", "20%");
    }
}




// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future



// WHEN I click into a timeblock
// THEN I can enter an event


// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage


// WHEN I refresh the page
// THEN the saved events persist

});