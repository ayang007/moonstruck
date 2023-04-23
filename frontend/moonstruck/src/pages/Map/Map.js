import blobmaskimg from '../../assets/Blob_Mask_blackandwhite.svg'
import { AuthContext } from "../../App";
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import L from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import APIRequest from '../../util/APIRequest';

function Map (props) {
    const [browserGeo, setBrowserGeo] = useState([null, null]);
    const auth = useContext(AuthContext);
    const [locData, setLocData] = useState({
        "Latitude": 51.505,
        "Longitude": -0.09,
        "LastUpdated": 1682183801 // UNIX timstamp
    })
    const myIcon = L.icon({
        iconUrl: require('../../assets/beatingheart2.gif'),
        iconSize: [64,64],
        iconAnchor: [32, 32],
        popupAnchor: [0, -32],
        shadowUrl: [0, 0],
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
    });

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

    useEffect(() => {
        if(browserGeo[0] && browserGeo[1]) {
            sendLocation();
        }
    }, [browserGeo]);

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

    async function getPartnerLocation() {
        try {
            const response = await APIRequest('GET', 'loc/' + auth, {});
            if(response.Latitude && response.Longitude && response.LastUpdated) {
                setLocData(response)
            }
        }
        catch(error) {
            // fail silently
        }
    }

    useEffect(() => {
        getPartnerLocation();
    }, [])

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }

    return (
        <>
            <div class="mapcontainer">
                <span class="highlighttext">Last Updated: {time2TimeAgo(locData.LastUpdated)}</span>
                    <div id="mapbackground">
                        <MapContainer className="map" center={[locData.Latitude, locData.Longitude]} zoom={5} scrollWheelZoom={false}>
                        <ChangeView center={[locData.Latitude, locData.Longitude]} zoom={5} /> 
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={myIcon} position={[locData.Latitude, locData.Longitude]}>
                                <Popup>
                                    <span>{locData.Latitude + ", " + locData.Longitude}</span>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
               <span class="highlighttext">Are you in a new place? Update your own location! 
                <button onClick={grabUser}>&#128147;&#128205;</button>
                (Location given: {browserGeo[0] + ", " + browserGeo[1]})
                </span>
            </div>
        </>
    )
    // <img class="map" src={mapimg}></img>
}

function time2TimeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    var seconds = nowTs-Math.floor(ts);

    // more that two days
    if (seconds > 2*24*3600) {
       return "A few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "Yesterday";
    }

    if (seconds > 3600) {
       return "A few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    else {
        return "Just now";
    }
}
export default Map