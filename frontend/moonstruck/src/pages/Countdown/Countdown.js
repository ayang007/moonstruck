import './Countdown.css'

function Countdown (props) {
    return (
        <div class="countdowncontainer">
        <h1 id="headline">Countdown to the next time we meet</h1>
        <div id="countdown">
            <ul>
            <li><span id="Month"></span>days</li>
            <li><span id="hours"></span>Hours</li>
            <li><span id="minutes"></span>Minutes</li>
            <li><span id="seconds"></span>Seconds</li>
            </ul>
        </div>
        </div>
    )
}

export default Countdown