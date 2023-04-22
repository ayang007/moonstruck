import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Onboard (props) {
    const [found, setFound] = useState(false);
    const [partnerName, setPartnerName] = useState("");
    const [browserGeo, setBrowserGeo] = useState([null, null]);

    const [meetDate, setMeetDate] = useState(new Date());
    const [dateAcquired, setDateAcquired] = useState(false);

    function mergeSubmit(e) {
        e.preventDefault();
    }

    function meetSubmit(e) {
        e.preventDefault();
    }

    function grabUser() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              setBrowserGeo([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
              console.error(error);
            }
          );
    }

    return(
        <>
        <h1>1. Partner Signup</h1>
            <form onSubmit={mergeSubmit}>
                <div>
                    <label>Find your partner (only one user needs to do this)</label>
                    <input type="text" onChange={(e)=>{setPartnerName(e.target.value)}} required />
                    <input type="submit" />
                </div>
                <div>
                    <label>{found? <>Found your partner: </> : 
                    <>You are not matched with anyone yet...</> }</label>
                    <button onClick={()=>{setFound(!found)}}>Refresh</button>
                </div>
                <div>
                    
                </div>
            </form>
        <h1>2. Location Registration</h1>

        <button onClick={grabUser}>&#128147;&#128205;</button>
                (Location given: {browserGeo[0] + ", " + browserGeo[1]})

        <h1>3. Reunification</h1>

        <form onSubmit={meetSubmit}>
                <div>
                    <label>Next time you'll see each other (only one user needs to do this)</label>
                    <DatePicker selected={meetDate} onChange={(date) => setMeetDate(date)} />
                    <input type="submit" />
                </div>
                <div>
                    <label>{dateAcquired? <>Found a date: </> : 
                    <>No date set yet...</> }</label>
                    <button onClick={()=>{setDateAcquired(!dateAcquired)}}>Refresh</button>
                </div>
                <div>
                    
                </div>
            </form>

        <h2>Please complete all steps!</h2>
        </>
    )
}

export default Onboard;