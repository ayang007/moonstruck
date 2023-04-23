import './Timezone.css'
import { AuthContext } from "../../App";
import { useContext, useEffect, useState } from 'react';
import APIRequest from '../../util/APIRequest';


function Timezone (props) {
    const auth = useContext(AuthContext);
    const [diff, setDiff] = useState(0);

    async function getDiff() {
        try {
            const response = await APIRequest('GET', 'tz/' + auth, {});
            if('HourDelta' in response) {
                setDiff(response.HourDelta);
            }
        }
        catch (error) {
            // quietly fail 
        }
    }

    useEffect(() => {
        getDiff();
    }, [])

    function diff2Deg(d) {
        if(d < 0) {
            return Math.round((d + 24) * 15);
        }
        return Math.round(d*15);
    }
    return (
        <>
            <span class="tz-center">Your partner is {diff < 0? (-1*diff) + " hours behind" : diff + " hours ahead"}</span>
            <div class="timezone-out">
                <div class="timezone-in">
                    <div class="pie" style={{"--p":58, "--s":"0deg", "--c": "#ffc8dd"}}> 24h</div>
                    
                </div>
                <div class="timezone-in">
                    <div class="pie" style={{"--p":58, "--s":diff2Deg(diff)+"deg", "--c": "#a2d1ff"}}> </div>
                </div>
                <div class="timezone-in">
                    <div class="pie" id="piebackground" style={{"--p":100, "--s":"10deg", "--c": "#ffffff"}}> </div>
                </div> 
                
            </div>
            
            <span class="tz-center">
                <span style={{color: "#4e2da8"}}>{"None "}&#12288;</span>
                <span style={{color: "#a37fc4"}}>{"You "}&#12288;</span>
                <span style={{color: "#8281d2"}}>{"Partner "}&#12288;</span>
                <span style={{color: "#acabe0"}}>{"Both "}&#12288;</span>
            </span>
        </>
    )
    // #4e2da8 #a37fc4 #8281d2 #acabe0
    /*return (
        <body class="timezonecontainer">
            <div class="skill">
                <div class="outer">
                    <div class="inner"></div>
                </div>
            </div>
        </body>

    )*/
}

export default Timezone;