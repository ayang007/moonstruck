import mapimg from '../../assets/Blob_Mask.png'
import heartgif from '../../assets/beatingheart2.gif'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'

function Map (props) {
    const locData = {
        "Latitude": 51.505,
        "Longitude": -0.09,
        "LastUpdated": 1682183801 // UNIX timstamp
    }
    return (
        <>
            <div class="mapcontainer">
            <MapContainer className="map" center={[locData.Latitude, locData.Longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[locData.Latitude, locData.Longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
               
            </div>
        </>
    )
    // <img class="map" src={mapimg}></img>
}
export default Map