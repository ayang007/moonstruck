import weatherimg from '../../assets/Weather_Mask.png'
import dayimg from '../../assets/day.png'
import nightimg from '../../assets/night.png'
import windowimg from '../../assets/Window.png'
import sunimg from '../../assets/sun.png'
import cloudimg from '../../assets/clouds.png'
import rainimg from '../../assets/rain.png'
import './Weather.css'
import { useState } from 'react'

function Map (props) {
    const [showTip, setShowTip] = useState(false);
    const [wData, setWData] = useState({
        rain: false, // false: no rain, true: rain
        clouds: true, // false: no clouds, true: clouds
        day: true, // false: night, true: day
        description: "scattered clouds", // Short description
        temperature: "55.11" // Temperature in Fahrenheit
    });
    return (
        <>
            {showTip&&<div class="weatherclick">{wData.description}
            <br />{wData.temperature + " F"}</div>}
            <div onClick={()=>{setShowTip(!showTip)}} class="weathercontainer">
                <img src={windowimg} class="window"/>
                {wData.day&&<img src={dayimg} class="sky"/>}
                {!wData.day&&<img src={nightimg} class="sky"/>}
                <img src={sunimg} class="sky"/>
                {wData.clouds&&<img src={cloudimg} class="clouds"/>}
                {wData.rain&&<img src={rainimg} class="rain"/>}
            </div>
        </>
    )
}
export default Map