import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import APIRequest from "../../util/APIRequest";
import {  useNavigate } from "react-router-dom";
import onboardvid from '../../assets/onboardingvid.mp4'
import './Onboard.css'


function Onboard (props) {
    const navigate = useNavigate();
    const [found, setFound] = useState(false);
    const [partnerName, setPartnerName] = useState("");
    const [browserGeo, setBrowserGeo] = useState([null, null]);

    const [meetDate, setMeetDate] = useState(new Date());
    const [dateAcquired, setDateAcquired] = useState(false);

    const auth = useContext(AuthContext);

    function mergeSubmit(e) {
        e.preventDefault();
        mergeRequest();
    }

    function meetSubmit(e) {
        e.preventDefault();
        sendMeet();
    }

    async function sendLocation() {
        try {
            const response = await APIRequest('PUT', 'loc', {
                JWT: auth,
                Latitude: browserGeo[0].toString(),
                Longitude: browserGeo[1].toString()
            })
        }
        catch(error) {
            alert("There was an error sending you location to the server");
        }

    }

    useEffect(() => {
        checkMeet();
        checkPartner();
    }, [])

    useEffect(() => {
        if(browserGeo[0] && browserGeo[1]) {
            sendLocation();
        }
    }, [browserGeo]);

    async function checkPartner() {
        try {
            const response = await APIRequest('GET', 'users/auth/' + auth, {});
            if(response.PartnerID) {
                setFound(true);
                setPartnerName(response.PartnerID);
            }
            else {
                setFound(false);
            }
        }
        catch(error) {
            alert("Error chacking the user for associations")
        }
    }

    async function mergeRequest() {
        try {
            const response = await APIRequest('PATCH', 'users/auth', {
                JWT: auth,
                PartnerID: partnerName
            });
            setFound(true);
        }
        catch (error) {
            alert("Couldn't merge! Are you sure the user exists or wasn't taken?")
        }
    }

    async function sendMeet() {
        console.log("Sendmeet")
        try {
            const response = await APIRequest('POST', 'bb/countdown', {
                JWT: auth,
                Meet: Math.round(meetDate.getTime()/1000)
            });
            checkMeet();
        }
        catch (error) {
            alert("Couldn't send meeting date")
        }
    }

    async function checkMeet() {
        try {
            const response = await APIRequest('GET', 'bb/countdown/' + auth, {})
            if(response.Meet) {
                setDateAcquired(true);
            }
        }
        catch(error) {
            // quiet 
            //alert("Couldn't query server for meeting date. ")
        }
    }

    async function grabUser() {
        await navigator.geolocation.getCurrentPosition(
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
        <video autoPlay muted id="myVideo">
                <source src={onboardvid} type="video/mp4"/>
        </video>
        <div class="backgroundhues"></div>
        <div class="onboardcontainer">
            <h1 class="onboardtext">1. Partner Signup</h1>
                <form class="form1" onSubmit={mergeSubmit}>
                    <div>
                        <label>Find your partner (only one user needs to do this)</label>
                        <input class="textinputonboard" type="text" onChange={(e)=>{setPartnerName(e.target.value)}} required />
                        <input type="submit" />
                    </div>
                    <div>
                        <label>{found? <>Found your partner: {partnerName}</> : 
                        <>You are not matched with anyone yet...</> }</label>
                        <button onClick={checkPartner}>Refresh</button>
                    </div>
                    <div>
                        
                    </div>
                </form>
            <h1 class="onboardtext">2. Location</h1>

            <button onClick={grabUser}>&#128147;&#128205;</button>
                    (Location given: {browserGeo[0] + ", " + browserGeo[1]})

            <h1 class="onboardtext">3. Reunification</h1>

            <form onSubmit={meetSubmit}>
                    <div>
                        <label>Next time you'll see each other (only one user needs to do this)</label>
                        <DatePicker selected={meetDate} onChange={(date) => setMeetDate(date)} />
                        <input type="submit" />
                    </div>
                    <div>
                        <label>{dateAcquired? <>Found a date!</> : 
                        <>No date set yet...</> }</label>
                        <button onClick={checkMeet}>Refresh</button>
                    </div>
                    <div>
                        
                    </div>
                </form>

            <h2 class="onboardtext">Please complete all steps!</h2>
            {found && dateAcquired && <button onClick={()=>navigate('/dashboard')}>Next</button>}
        </div>
        </>
    )
}

export default Onboard;