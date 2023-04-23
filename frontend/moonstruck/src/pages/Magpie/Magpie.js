import magpiepng from '../../assets/Magpie_Notes.png'
import magpiefriendpng from '../../assets/magpiefriend.gif'
import './Magpie.css'

function Magpie (props) {
    return (
        <>
            <div class="magpiecontainer">
                <img class="magpie2" src={magpiefriendpng} draggable="false"/>
                <img class="magpie1" src={magpiepng} draggable="false"/>
            </div>
        </>
    )
}
export default Magpie