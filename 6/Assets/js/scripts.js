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

    //display last searched
    function loadLastSearched() {
        $("#cityNameInput").val(cityList[0]);
        getResults();
    }
    loadLastSearched();

    //get search input
    $("#getWeather").on("click", getResults);
    $("#cityNameInput").on("keyup", function(event) {
        if (event.keyCode === 13) {
            $("#getWeather").click();
        }
    })

    //re-search from search history
    $("#search-history").on("click", function(event) {
        var clickedCity = event.target.innerText;
        $("#cityNameInput").val(clickedCity);
        getResults();
    })

    //call apis to get data
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
                    var uvIndex = response2.value;

                    //feed current weather to HTML
                    $(".result-header").text(response.name);
                    $(".temp").text(temp.toFixed()+"°");
                    $(".icon").attr("src", "http://openweathermap.org/img/wn/"+iconId+"@2x.png");
                    $(".iconDetail").text(response.weather[0].description);
                    $(".humidity").text(response.main.humidity+"%");
                    $(".wind").text(response.wind.speed);
                    $(".date-pulled").text("Weather Report For:   " + moment().format("dddd MMMM Do, YYYY / h:mm a"));
                    $(".uv-index").text(uvIndex);

                    //uv severity
                    function changeColor(color) {
                        var cssUpdate = $(".uv-index").css("background-color", color);
                    }
                    if (uvIndex > 10) {
                        changeColor("purple");
                    } else if (uvIndex > 7) {
                        changeColor("red");
                    } else if (uvIndex > 5) {
                        changeColor("orange");
                    } else if (uvIndex > 2) {
                        changeColor("yellow");
                    } else {
                        changeColor("green");
                    }

                    //save & display search history
                    if (cityList.includes(cityName) == false) {
                        var searchHistory = $("<p>").text(cityName);
                        $("#search-history").prepend(searchHistory);
                        cityList.unshift(cityName);
                    }

                    //save city to local storage
                    localStorage.setItem("cities", JSON.stringify(cityList));

                    //3rd API Call
                    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&APPID="+apiKey          
                    
                    $.ajax({
                        url: queryURL3,
                        method: "GET"
                    }).then(function(response3){
                        
                        //populate forcast data to 5-day
                        function forcastDay(day, index) {
                            var imgURL = "http://openweathermap.org/img/wn/"+response3.list[index].weather[0].icon+"@2x.png"
                            $("#day"+day).text(moment().add(day, 'd').format("dddd MMMM Do"));
                            $(".day"+day).text(response3.list[index].weather[0].description);
                            $(".day"+day+"-img").attr("src", imgURL);    
                        }
                        forcastDay(1, 7);
                        forcastDay(2, 15);
                        forcastDay(3, 23);
                        forcastDay(4, 31);
                        forcastDay(5, 39);
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

})

