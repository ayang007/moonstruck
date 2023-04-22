import fridgeimg from '../../assets/Fridge.png'
import PostIts from '../PostIts/PostIts'
import './Fridge.css'

function Fridge (props) {
    return (
        <>
            <div>
                <img class="fridge" src={fridgeimg}></img>
                <PostIts/>
            </div>
        </>
    )
}

export default Fridge