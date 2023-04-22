import Timezone from "../Timezone/Timezone";
import Fridge from "../Fridge/Fridge";
import Countdown from "../Countdown/Countdown";
import Magpie from "../Magpie/Magpie";
import PostIts from "../PostIts/PostIts";
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
            <div class="row">
                <div class="block">
                    <Timezone/>
                    <Map/>
                </div>
                <div class="block">
                    <Fridge/>
                </div>
                
                <div class="block">
                    <Weather/>
                    <PeriodCalendar/>
                </div>
            </div>
            
            <PostIts/>
        </>
    )
}

export default Dashboard;