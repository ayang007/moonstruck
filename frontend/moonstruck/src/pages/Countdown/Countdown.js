import './Countdown.css'

function Countdown (props) {
    return (
        <div class="container">
            <h1 id="headline">Countdown to the next time we meet</h1>
            <div id="countdown">
                <ul>
                    <li><span id="months"></span>months</li>
                    <li><span id="days"></span>days</li>
                    <li><span id="hours"></span>hours</li>
                    <li><span id="minutes"></span>minutes</li>
                    <li><span id="seconds"></span>seconds</li>
                </ul>
            </div>
        </div>
    )
}

export default Countdown