import magpiepng from '../../assets/Magpie_Notes.png'
import './Magpie.css'

function Magpie (props) {
    return (
        <>
            <div class="magpiecontainer">
                <img class="magpie" src={magpiepng}></img>
            </div>
        </>
    )
}
export default Magpie