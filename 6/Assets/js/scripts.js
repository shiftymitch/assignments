$(document).ready(function() {
    var apiKey = "e4743f50eae9eb0a5f18bf3950527b9a"
    var zipCode = "84014";
    var cityName = prompt("City Name");
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID="+apiKey+""

    //AJAX API Call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var temp = (response.main.temp - 273.15) * (9/5) + 32;

        $(".cityName").text(response.name);
        $(".temp").text("Temp: " + temp.toFixed());
        console.log(response);
    })

    //function to display results
    

})

