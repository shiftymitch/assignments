$(document).ready(function() {

    //get search history
    var cityList = [];
    if (localStorage.getItem("cities") != null) {
        cityList = JSON.parse(localStorage.getItem("cities"));
    }
    //display search history
    for (var i = 0; i < cityList.length; i++) {
        var searchHistory = $("<p>").text(cityList[i]);
        $("#search-history").append(searchHistory);
    }

    //display last searched on refresh
    

    //get search input
    $("#getWeather").on("click", getResults);
    $("#cityNameInput").on("keyup", function(event) {
        if (event.keyCode === 13) {
            $("#getWeather").click();
        }
    })

    function getResults() {
        
        var apiKey = "e4743f50eae9eb0a5f18bf3950527b9a"
        cityName = $("#cityNameInput").val();
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

                    //feed weather data to HTML
                    $(".result-header").text(response.name);
                    $(".temp").text(temp.toFixed()+"°");
                    $(".icon").attr("src", "http://openweathermap.org/img/wn/"+iconId+"@2x.png");
                    $(".iconDetail").text(response.weather[0].description);
                    $(".humidity").text(response.main.humidity+"%");
                    $(".wind").text(response.wind.speed);
                    $(".date-pulled").text("Weather Report For:   " + moment().format("MMMM Do, YYYY / h:mm a"));
                    $(".uv-index").text(response2.value);
                    //uv severity
                    if (response2.value > 10) {
                        $(".uv-index").css("background-color", "purple");
                    } else if (response2.value > 7) {
                        $(".uv-index").css("background-color", "red");
                    } else if (response2.value > 5) {
                        $(".uv-index").css("background-color", "orange");
                    } else if (response2.value > 2) {
                        $(".uv-index").css("background-color", "yellow");
                    } else {
                        $(".uv-index").css("background-color", "green");
                    }

                    if (cityList.includes(cityName) == false) {
                        var searchHistory = $("<p>").text(cityName);
                        $("#search-history").prepend(searchHistory);
                        cityList.unshift(cityName);
                    }

                    //save data to local storage
                    localStorage.setItem("cities", JSON.stringify(cityList));

                    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&APPID="+apiKey          
                    //3rd API Call
                    $.ajax({
                        url: queryURL3,
                        method: "GET"
                    }).then(function(response3){
                        $("#day1").text(moment().add(1, 'd').format("dddd"));
                        $(".day1").text(response3.list[7].weather[0].description);
                        $(".day1-img").attr("src", "http://openweathermap.org/img/wn/"+response3.list[7].weather[0].icon+"@2x.png");

                        $("#day2").text(moment().add(2, 'd').format("dddd"));
                        $(".day2").text(response3.list[15].weather[0].description);
                        $(".day2-img").attr("src", "http://openweathermap.org/img/wn/"+response3.list[15].weather[0].icon+"@2x.png");

                        $("#day3").text(moment().add(3, 'd').format("dddd"));
                        $(".day3").text(response3.list[23].weather[0].description);
                        $(".day3-img").attr("src", "http://openweathermap.org/img/wn/"+response3.list[23].weather[0].icon+"@2x.png");

                        $("#day4").text(moment().add(4, 'd').format("dddd"));
                        $(".day4").text(response3.list[31].weather[0].description);
                        $(".day4-img").attr("src", "http://openweathermap.org/img/wn/"+response3.list[31].weather[0].icon+"@2x.png");

                        $("#day5").text(moment().add(5, 'd').format("dddd"));
                        $(".day5").text(response3.list[39].weather[0].description);
                        $(".day5-img").attr("src", "http://openweathermap.org/img/wn/"+response3.list[39].weather[0].icon+"@2x.png");
                        
                    })

                    //re-search from search history
                    $("#search-history").on("click", function(event) {
                        var clickedCity = event.target.innerText;
                        getResults();
                        
                    })
                })
            }).catch();
        } else if (!cityName) {
            alert("Please enter a city.");
        }
    }

    //re-search from search history
    $("#search-history").on("click", function(event) {
        var clickedCity = event.target.innerText;
        $("#cityNameInput").val(clickedCity);
        getResults();
    })

})

