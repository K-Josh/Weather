
import Weather from "./components/WeatherApp/Weather"
import Home from "./components/Home/Home"
import { BrowserRouter, Routes, Route, } from "react-router-dom";

const App = () => {
 
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather/>} />
        <Route path="/weather/:name" element={<Home />} />
      </Routes> 
     </BrowserRouter>
    </div>
  )
}

export default App