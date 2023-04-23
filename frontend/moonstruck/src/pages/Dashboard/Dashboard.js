import Timezone from "../Timezone/Timezone";
import Fridge from "../Fridge/Fridge";
import Countdown from "../Countdown/Countdown";
import Magpie from "../Magpie/Magpie";
import Map from "../Map/Map";
import PeriodCalendar from "../Period/Period";
import Weather from "../Weather/Weather";
import { AuthContext } from "../../App";
import gearimg from '../../assets/gear-onboard.png';


import './Dashboard.css'
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

function Dashboard (props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        }
    }, []);
    
 
    return (
        <>
        <img class="dashboard-onb" onClick={()=>navigate('/onboard')} width="50" height="50" src={gearimg} />
            <div class="toppanel">
                <Magpie/>
                <Countdown/>
            </div>
            <div class="dashboardrow">
                <div class="dashboardblock">
                    <div class="subdiv">
                        <Timezone/>
                    </div>
                    <div class="subdiv">
                        <Map/>
                    </div>
                </div>
                <div class="block">
                    <Fridge/>
                </div>
                
                <div class="block">
                    <div class="subdiv">
                        <Weather/>
                    </div>
                    <div class="subdiv">
                        <PeriodCalendar/>
                    </div>
                </div>
            </div>
            

        </>
    )

}

export default Dashboard;