/* eslint-disable no-undef */
import { IoLocationOutline } from 'react-icons/io5'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { FaCircleArrowLeft, FaRegBell} from 'react-icons/fa6'
import './Home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Home = () => {
  const {name} = useParams()
  const [data, setData] = useState({
    celcius: null,
    name: '',
    humidity: null,
    speed: null,
    description: null,
    image: null
  })

  const getImagePath = (mainWeather) => {
  
      const iconMap = {
        '01d': '/Images/sun.png',
        '01n': '/Images/sun.png',
        '02d': '/Images/cloudy.png',
        '02n': '/Images/cloudy.png',
        '03d': '/Images/rain.png',
        '03n': '/Images/rain.png',
        '04d': '/Images/sun cloudy.png', // Adjust if needed based on API documentation
        '04n': '/Images/sun cloudy.png', // Adjust if needed based on API documentation
        '09d': '/Images/thunder.png',
        '09n': '/Images/thunder.png',
        '10d': '/Images/rain.png',
        '10n': '/Images/thunder.png',
        '13d': '/Images/snow.png',
        '13n': '/Images/snow.png',
      };
      return iconMap[mainWeather] || '/Images/sun cloudy.png'; 
    
  };
  
  useEffect(()=> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.WEATHER_KEY}&units=metric`
    axios.get(apiUrl)
    .then((res) => {
      setData({...data, 
        celcius:res.data.main.temp,
         name:res.data.name, 
         humidity:res.data.main.humidity, description:res.data.weather[0].description,
         speed:res.data.wind.speed, image: getImagePath(res.data.weather[0].icon)
      });
     
      console.log(res.data);
    })
    .catch((err) => console.log(err))
    
  }, [data])
  
  
  
 // const getImagePath = (mainWeather) => {
    // Implement image path mapping here
 // };
  
  return (
    <div className='home'>
      <div className='home__back'>
      <a href='/'>
       <FaCircleArrowLeft className='home__header__left__icon'/>
       </a>
       <p>Back</p>
      </div>
        <div className='home__header'>
         <div className='home__header__left'>
          <div><IoLocationOutline className='home__header__left__icon'/></div>
          <div><p>{data.name}</p></div>
          <div><IoIosArrowDown className='home__header__left__icon'/></div>
         </div>
          <div><FaRegBell className='home__header__left__icon'/></div>
        </div>
        <div className='home__main'>
          <div>
           <img src={data.image} className='home__main__image'/>
          </div>
          <div className='home__main__utilities'>
           <div className='home__main__utilities__date'>
            <p>{new Date().toUTCString()}</p>
          </div>
          <div className='home__main__utilities__value'>
          <p className='home__main__utilities__value1'>{Math.round(data.celcius)} ℃</p>
          <p className='home__main__utilities__value2'>{data.description}</p>
          </div>
          <div className='home__main__utilities__details'>
            <div className='home__main__utilities__details__windy'>
            <div className='home__main__utilities__details__windy1'>
            <img src='/Images/windy.png' alt='windy'/>
             <p>Wind</p>
             <p>|</p>
            </div>
             <p>{Math.round(data.speed)} km/h</p>
            </div>
            <div className='home__main__utilities__details__humid'>
            <div className='home__main__utilities__details__humid1'>
             <img src='/Images/hum.png' alt='humid'/>
             <p>Humid</p>
             <p>|</p>
            </div>
             <p>{Math.round(data.humidity)} %</p>
            </div>
          </div>
          </div>
          <div className='home__main__btn'>
            <button>
            <p className='home__main__btn__p'>Forecast Report</p>
            <IoIosArrowUp />
            </button>
          </div>
        </div>
    </div>
  )
}

export default Home