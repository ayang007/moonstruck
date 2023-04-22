import { useState } from "react";

function Onboard (props) {
    const [found, setFound] = useState(false);
    const [partnerName, setPartnerName] = useState("");
    const [browserGeo, setBrowserGeo] = useState([null, null])

    function mergeSubmit(e) {
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

        <h2>Please complete all steps!</h2>
        </>
    )
}

export default Onboard;