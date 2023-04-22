import './Countdown.css'

function Countdown (props) {
    return (
        <div class="countdownouter">
            <div class="countdowncontainer">
                <h1 class="countdown-h1" id="headline">Countdown to the next time we meet</h1>
                <div id="countdown">
                    <ul>
                        <li class="countdown-li"><span class="countdown-li-span" id="months">11</span>months</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="days">217</span>days</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="hours">13</span>hours</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="minutes">42</span>minutes</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="seconds">09</span>seconds</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Countdown