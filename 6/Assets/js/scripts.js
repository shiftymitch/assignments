$(document).ready(function() {

    //get input
    $("#getWeather").on("click", function(event) {
        event.preventDefault();
        var apiKey = "e4743f50eae9eb0a5f18bf3950527b9a"
        var cityName = $("#cityNameInput").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID="+apiKey+""

        //AJAX API Call
        if (cityName) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                var temp = (response.main.temp - 273.15) * (9/5) + 32;
                var iconId = response.weather[0].icon;
                $(".temp").text(temp.toFixed()+"°");
                $(".icon").attr("src", "http://openweathermap.org/img/wn/"+iconId+"@2x.png");
                $(".iconDetail").text(response.weather[0].description);
            })
        } else if (!cityName) {
            alert("Please enter a city.");
        }
    });
})

