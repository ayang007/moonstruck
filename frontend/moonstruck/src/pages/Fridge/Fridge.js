import fridgeimg from '../../assets/Fridge.png'
import './Fridge.css'

function Fridge (props) {
    return (
        <>
            <div>
                <img class="fridge" src={fridgeimg}></img>
            </div>
        </>
    )
}

export default Fridge