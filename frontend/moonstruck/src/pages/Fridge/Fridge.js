import { useState } from 'react';
import fridgeimg from '../../assets/Fridge.png'
import PostIts from '../PostIts/PostIts'
import './Fridge.css'

function Fridge (props) {

    const [noteText, setNoteText] = useState("");
    const [color, setColor] = useState("#00ffff");
    const [showWiz, setShowWiz] = useState(false);

    function noteSubmit(e) {
        e.preventDefault();
        alert("Make a new post it");
    }
    return (
        <>
            <div class="fridge-container">
                <img onClick={()=>{setShowWiz(!showWiz)}} class="fridge" src={fridgeimg}></img>
                <div class="fridge-inline">
                { showWiz &&
                <form onSubmit={noteSubmit}>
                    <div>
                        <label>Message </label>
                        <input type="text" onChange={(e)=>{setNoteText(e.target.value)}} required />
                    </div>
                    <div>
                        <label>Color </label>
                        <input type="color" onChange={(e)=>{setColor(e.target.value)}} required />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                }
                </div>
                
            </div>
            <PostIts/>
        </>
    )
}

export default Fridge