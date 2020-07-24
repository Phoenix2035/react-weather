import React, { useState, useEffect } from 'react'
import getLocation from './utils/geoLocation'
import axios from 'axios'

const appId = '44b1fe8a6c0207544cdd674445971577'

function Weather() {
  const [userLocation, setUserLocation] = useState({
    lat: 37.774929,
    lng: -122.419416
  })

  const [weather, setWeather] = useState({
    country: '',
    city: '',
    status: '',
    icon: '',
    humidity: '',
    temp: ''
  })
  useEffect(() => {
    getLocation().then((location) => {
      setUserLocation(location)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&&appid=${appId}
    `)
      .then(res => {
        setWeather({
          country: res.data.sys.country,
          city: res.data.name,
          status: res.data.weather[0].main,
          icon: res.data.weather[0].icon,
          humidity: res.data.main.humidity,
          temp: res.data.main.temp
        })
      })
  }, [userLocation])

  return (
    <>
      <h2> Weather App</h2>
      <h6>
        status: {weather.status} <br />
    location: {weather.country} - {weather.city} <br />
    temp: {weather.temp} <br />
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} /> <br />
    humadity: {weather.humidity}
      </h6>
    </>
  )
}

export default Weather
