import mapimg from '../../assets/Blob_Mask.png'
import './Map.css'

function Map (props) {
    return (
        <>
            <div class="mapcontainer">
                <img class="map" src={mapimg}></img>
            </div>
        </>
    )
}
export default Map