import './Countdown.css'

function Countdown (props) {
    return (
        <div class="countdowncontainer">
            <h1>Countdown to the next time we meet</h1>
            <div class="countdown">
                <ul>
                    <li><span>11</span>months</li>
                    <li><span>217</span>days</li>
                    <li><span>13</span>hours</li>
                    <li><span>42</span>minutes</li>
                    <li><span>09</span>seconds</li>
                </ul>
            </div>
        </div>
    )
}

export default Countdown