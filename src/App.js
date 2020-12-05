import React, { useState } from 'react'

const App = () => {
  const api = {
    key: 'b3601570ed68feff1dfc217f9af9fde3',
  }
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const [weatherClass, setWeatherClass] = useState('')

  const changeWeatherClass = () => {
    if (typeof weather.main != 'undefined') {
      if (weather.weather[0].main === 'fog') {
        setWeatherClass('fog')
      } else if (weather.weather[0].main === 'hazy') {
        setWeatherClass('hazy')
      } else if (weather.weather[0].main === 'rain') {
        setWeatherClass('rain')
      } else if (weather.weather[0].main === 'snow') {
        setWeatherClass('snow')
      } else if (
        weather.main.temp > 16 &&
        weather.weather[0].main === 'clouds'
      ) {
        setWeatherClass('hotCloudy')
      } else if (
        weather.main.temp > 16 &&
        weather.weather[0].main === 'clear'
      ) {
        setWeatherClass('hotClear')
      } else if (
        weather.main.temp < 16 &&
        weather.weather[0].main === 'clouds'
      ) {
        setWeatherClass('coldCloudy')
      }
      if (weather.main.temp > 16 && weather.weather[0].main === 'clear') {
        setWeatherClass('coldClear')
      }
      console.log(weatherClass)
    }
  }

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          changeWeatherClass()
          console.log(weatherClass)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={weatherClass}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.main.temp}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
