var today = moment();

$(document).ready(function() {

$("#currentDay").text(today.format("dddd, MMMM Mo, YYYY")).css("font-weight", "bold");

//create time blocks 
for (var i = 1; i < 10; i++) {
    var newRow = $("<div>").addClass("row time-block block"+i);
    var hourCol = $("<div>").addClass("col-3 hour hour"+i);
    var tasks = $("<div>").addClass("col-6 tasks task"+i);
    var button = $("<div>").addClass("col-3 btn btn-secondary saveBtn button"+i);
    var hour = moment().startOf("day").add(7+i, "h");
    var input = $("<textarea>").width("100%").height("100%");
    var hH = parseInt(hour.format("H"));
    var tH = parseInt(today.format("H"));

    $(".container").append(newRow);
    newRow.append(hourCol, tasks, button);
    $(".hour"+i).text(hour.format("h:mmA"));

    //color coded time blocks
    if (hH < tH) { 
        newRow.addClass("past");
    } else if (hH > tH) { 
        newRow.addClass("future");
    } else if (hH = tH) { 
        newRow.addClass("present");
    }

    $(".task"+i).append(input);
    $(".button"+i).text("SAVE");
    $(".button"+i).attr("id", i);
    
    //save tasks to localStorage
    var tasks = [];
    var storedTask = localStorage.getItem("task "+i+"");
    tasks.push(storedTask);
    $(".task"+i)[0].firstChild.value = tasks;
}

//save task input
$(".saveBtn").on("click", function() {
    var btnId = parseInt($(this).attr("id"));
    var tempTask = $(".task"+btnId+"");
    var inputBox = tempTask[0].firstChild;

    //toggle input editable
    var editable = inputBox.readOnly = true;
    localStorage.setItem("task "+btnId+"", inputBox.value)
})

//edit task
$(".tasks").on("click", function(event) {
    var inputVal = event.target;
    var editable = inputVal.readOnly;
    
    if (editable) {
        inputVal.readOnly = !editable;
    }
})

});