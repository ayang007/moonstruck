import './Countdown.css'

function Countdown (props) {
    return (
        <div class="countdownouter">
            <div class="countdowncontainer">
                <h1 class="countdown-h1" id="headline">Countdown to the next time we meet</h1>
                <div id="countdown">
                    <ul>
                        <li class="countdown-li"><span class="countdown-li-span" id="months"></span>months</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="days"></span>days</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="hours"></span>hours</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="minutes"></span>minutes</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="seconds"></span>seconds</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Countdown