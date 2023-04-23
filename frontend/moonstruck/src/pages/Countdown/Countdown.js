import { useContext, useEffect, useState } from 'react';
import APIRequest from '../../util/APIRequest';
import { AuthContext } from "../../App";

import './Countdown.css'

function Countdown (props) {
    const [nextTime, setNextTime] = useState(0);

    const [deltaArr, setDeltaArr] = useState([null, null, null, null, null]);

    const auth = useContext(AuthContext);

    function deltaCalc() {
        //console.log("my notion of timestamp is " + nextTime);
        if (nextTime <= 0) return ["00","00","00","00","00"];
        const remainingTime = nextTime - Math.floor(Date.now() / 1000); // calculate remaining time in seconds
        //console.log("time diff: " + remainingTime);
        const months = Math.floor(remainingTime / 2592000); // calculate remaining months
        const days = Math.floor((remainingTime % 2592000) / 86400); // calculate remaining days
        const hours = Math.floor((remainingTime % 86400) / 3600); // calculate remaining hours
        const minutes = Math.floor((remainingTime % 3600) / 60); // calculate remaining minutes
        const seconds = remainingTime % 60; // calculate remaining seconds

        return [months, days, hours, minutes, seconds].map((n) => {return n.toString().padStart(2, "0")});
        
    }

    useEffect(() => {

        const interval = setInterval(() => setDeltaArr(deltaCalc()), 1000);
        return () => {
          clearInterval(interval);
        };
      }, [nextTime]);

    async function getCountdown() {
        try {
            const response = await APIRequest('GET', 'bb/countdown/' + auth, {});
            if(response.Meet) {
                console.log(response.Meet);
                setNextTime(response.Meet);
            }
        }
        catch(error) {
            // silently fail
        }
    }

    useEffect(() => {
        getCountdown();
    }, [nextTime]);

    return (
        <div class="countdownouter">
            <div class="countdowncontainer">
                <h1 class="countdown-h1" id="headline">Countdown to the next time we meet</h1>
                <div id="countdown">
                    <ul>
                        <li class="countdown-li"><span class="countdown-li-span" id="months">{deltaArr[0]}</span>months</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="days">{deltaArr[1]}</span>days</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="hours">{deltaArr[2]}</span>hours</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="minutes">{deltaArr[3]}</span>minutes</li>
                        <li class="countdown-li"><span class="countdown-li-span" id="seconds">{deltaArr[4]}</span>seconds</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Countdown