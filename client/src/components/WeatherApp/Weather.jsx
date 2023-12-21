import { useState } from 'react';
import './Weather.css'
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Weather = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [data, setData] = useState('')

  const handleSearch = () => {
    if(name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5dbc8974e4f7c97578a206c760e4d50f&units=metric`
      axios.get(apiUrl)
      .then(res => {
        setData({...data, 
          celcius:res.data.main.temp,
           name:res.data.name, 
           humidity:res.data.main.humidity,
           speed:res.data.wind.speed
        })
        .catch(err => console.log(err))
      })
     navigate.push(`/weather/${name}`)
    }
  }
  return (
    <div className='weather' id='/'>
     <div className='weather__topbar'>
        {/* {open ? } */}
        <input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Search City...' className='weather__topbar__input'/>
        <button onClick={handleSearch}>
         <IoSearchOutline className='weather__topbar__icon' />
        </button>
        
     </div>
    </div>
  )
}

export default Weather 