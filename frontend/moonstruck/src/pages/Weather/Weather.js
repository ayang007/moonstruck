import weatherimg from '../../assets/Weather_Mask.png'
import './Weather.css'

function Map (props) {
    return (
        <>
            <div class="weathercontainer">
                <img class="weather" src={weatherimg}></img>
            </div>
        </>
    )
}
export default Map