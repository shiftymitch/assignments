$(document).ready(function() {

    //get input
    $("#getWeather").on("click", function(event) {
        
        var apiKey = "e4743f50eae9eb0a5f18bf3950527b9a"
        var cityName = $("#cityNameInput").val();
        var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID="+apiKey
        var lon = "";
        var lat = "";

        if (cityName) {
            //1st API Call
            $.ajax({
                url: queryURL1,
                method: "GET"
            }).then(function(response){
                //set lon & lat from 1st API to get 2nd API
                lon = response.coord.lon;
                lat = response.coord.lat;
                var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&APPID="+apiKey              
                //2nd API Call
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function(response2){
                    //API Variables
                    var temp = (response.main.temp - 273.15) * (9/5) + 32;
                    var iconId = response.weather[0].icon;
                    
                    $(".result-header").text(response.name);
                    $(".temp").text(temp.toFixed()+"°");
                    $(".icon").attr("src", "http://openweathermap.org/img/wn/"+iconId+"@2x.png");
                    $(".iconDetail").text(response.weather[0].description);
                    $(".humidity").text(response.main.humidity+"%");
                    $(".wind").text(response.wind.speed);
                    $(".date-pulled").text("Weather Report For:   " + moment().format("MMMM Do, YYYY / h:mm a"));
                    $(".uv-index").text(response2.value);
                })
            }).catch(errors);
        } else if (!cityName) {
            alert("Please enter a city.");
        }
    });
})

