import weatherimg from '../../assets/Weather_Mask.png'
import dayimg from '../../assets/day.png'
import nightimg from '../../assets/night.png'
import windowimg from '../../assets/Window.png'
import sunimg from '../../assets/sun.png'
import cloudimg from '../../assets/clouds.png'
import rainimg from '../../assets/Rain.png'
import './Weather.css'

function Map (props) {
    return (
        <>
            <div class="weathercontainer">
                <img src={windowimg} class="window"/>
                <img src={dayimg} class="sky"/>
                <img src={sunimg} class="sky"/>
                <img src={cloudimg} class="clouds"/>
                <img src={rainimg} class="rain"/>
            </div>
        </>
    )
}
export default Map