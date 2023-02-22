import React, { useState } from "react";

const api = {
  key: "384740a90cbceaac44e7f4eeff55d4bc",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState([]);
  const [changetempvalue, setchangetempvalue] = useState("true");
  const [degree, setdegree] = useState("F");
  

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setquery("");
          console.log(result);
        });
    }
  };
  const background_images = (detail) => {
    if (detail === "Clouds" || detail === "Rain"|| detail==="Thunderstorm")
      return "app-rain";
    else if (detail === "Hot")
      return "app-hot"
    else if (detail === "Snow" || detail === "Cold")
      return "app-cold"
    else if (detail === "Clear")
      return "app-clear"
    else if (detail === "Fog" || detail === "Dust" || detail === "Ash")
      return "app-fog"
    else 
      return "app-clear"
  }
  const changetemp = () => {
    if (changetempvalue === "true") {
      setchangetempvalue("false");

    
      setdegree("F");
    } else {
      setchangetempvalue("true");
      
      setdegree("C");
    }
  };
  const emoji = (detail) => {
    if (detail === "Clouds" || detail === "Rain"|| detail==="Thunderstorm") {
      return "⛅"; 
    } else if (detail === "Haze" || detail === "Clear" || detail === "Mist") {
      return "☀️";
    } else if (detail === "Rainy") {
      return "☔";
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? background_images(weather.weather[0].main)
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date"> {dateBuilder(new Date())}  </div>
            </div>
            <div className="weather-box">
              <div
                className="temp"
                onMouseEnter={() => changetemp()}
                onMouseLeave={()=> changetemp()}
              >
                {changetempvalue === "true"
                  ? Math.round(weather.main.temp)
                  : Math.round(weather.main.temp * 1.8 + 32)}
                °{degree}{" "}
              </div>
              <div className="weather">
                
                {emoji(weather.weather[0].main)}
                {weather.weather[0].main}
              </div>
            </div>
            <div className="weather-box">
              <div className="description">
                {weather.main.humidity}%
                ❄️Humidity
              </div>
              
            </div>
            <div className="weather-box">
              <div className="description">
                 
                {weather.wind.speed} MPH
                💨Wind speed
              </div>
              
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
export default App;
