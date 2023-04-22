import Timezone from "../Timezone/Timezone";
import Fridge from "../Fridge/Fridge";
import Countdown from "../Countdown/Countdown";
import Magpie from "../Magpie/Magpie";
import Map from "../Map/Map";
import PeriodCalendar from "../Period/Period";
import Weather from "../Weather/Weather";

import './Dashboard.css'

function Dashboard (props) {
    return (
        <>
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