import weatherimg from '../../assets/Weather_Mask.png'
import dayimg from '../../assets/day.png'
import nightimg from '../../assets/night.png'
import windowimg from '../../assets/Window.png'
import sunimg from '../../assets/sun.png'
import moonimg from '../../assets/moon.png'
import cloudimg from '../../assets/clouds.png'
import rainimg from '../../assets/rain.png'
import curtainsimg from '../../assets/curtains.GIF'
import './Weather.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../App";
import APIRequest from '../../util/APIRequest'


function Map (props) {
    const [showTip, setShowTip] = useState(false);
    const auth = useContext(AuthContext);
    const [wData, setWData] = useState({
        rain: false, // false: no rain, true: rain
        clouds: true, // false: no clouds, true: clouds
        day: true, // false: night, true: day
        description: "scattered clouds", // Short description
        temperature: "55.11" // Temperature in Fahrenheit
    });

    useEffect(() => {
        fetchWeather();
    },[])

    async function fetchWeather() {
        try {
            const result = await APIRequest('GET', 'weather/' + auth, {});
            if("rain" in result && "temperature" in result) {
                setWData(result);
            }
        }
        catch(error) {
            // silently ignore 
        }
    }
    return (
        <>
            {showTip&&<div class="weatherclick">{wData.description}
            <br />{wData.temperature + " F"}</div>}
            <div onClick={()=>{setShowTip(!showTip)}} class="weathercontainer">
                <img src={windowimg} class="window" draggable="false"/>
                <img src={curtainsimg} class="curtains" draggable="false"/>
                {wData.day&&<img src={dayimg} class="sky" draggable="false"/>}
                {!wData.day&&<img src={nightimg} class="sky" draggable="false"/>}
                {wData.day&&<img src={sunimg} class="sky" draggable="false"/>}
                {!wData.day&&<img src={moonimg} class="sky" draggable="false" />}
                {wData.clouds&&<img src={cloudimg} class="clouds" draggable="false"/>}
                {wData.rain&&<img src={rainimg} class="rain" draggable="false"/>}
            </div>
        </>
    )
}
export default Map