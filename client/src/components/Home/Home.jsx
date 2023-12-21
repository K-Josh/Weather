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
    celcius: 10,
    name: 'Yaounde',
    humidity: 10,
    speed: 2
  })
  useEffect(()=> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5dbc8974e4f7c97578a206c760e4d50f&units=metric`
    axios.post(apiUrl)
    .then(res => {
      setData({...data, 
        celcius:res.data.main.temp,
         name:res.data.name, 
         humidity:res.data.main.humidity,
         speed:res.data.wind.speed
      })
      .catch(err => console.log(err))
    })
  }, [])
  return (
    <div className='home'>
      <div className='home-back'>
      <a to='/'>
       <FaCircleArrowLeft className='home__header__left__icon'/>
       </a>
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
           <img src='/Images/sun cloudy.png' className='home__main__image'/>
          </div>
          <div className='home__main__utilities'>
           <div className='home__main__utilities__date'>
            <p>{new Date().toUTCString()}</p>
          </div>
          <div className='home__main__utilities__value'>
          <p className='home__main__utilities__value1'>{Math.round(data.celcius)} ℃</p>
          <p className='home__main__utilities__value2'>Cloudy</p>
          </div>
          <div className='home__main__utilities__details'>
            <div className='home__main__utilities__details__windy'>
            <div className='home__main__utilities__details__windy1'>
            <img src='/Images/windy.png' alt='windy'/>
             <p>Wind</p>
             <p>|</p>
            </div>
             <p>{Math.round(data.speed)}km/h</p>
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
            <IoIosArrowUp className='home__header__left__icon'/>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Home