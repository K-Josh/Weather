/* eslint-disable no-undef */

import { useState } from 'react';
import './Weather.css'
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Weather = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // const API_KEY=process.env.WEATHER_KEY


  const handleSearch = async () => {
    if(name !== '') {
      setIsLoading(true)
      setError(null)
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.WEATHER_KEY}&units=metric`;
        
        const res = await axios.get(apiUrl);
        setData({...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
        });
      
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='weather'>
     <div className='weather__topbar'>
        {/* {open ? } */}
        <input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Search City...' className='weather__topbar__input'/>
        <button type='submit' className='weather__topbar__button'>
         <IoSearchOutline onClick={handleSearch} className='weather__topbar__icon' />
         </button>
     </div>
     <div className='weather__error'>
     {isLoading && <p>Loading weather data...</p>}
     {error && <p>Error fetching weather data: {error.message}</p>}
     {data && (navigate(`/weather/${name}`) )} 
     </div> 
    </div>
  )
}

export default Weather 