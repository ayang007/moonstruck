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
        setShowWiz(false);
    }
    return (
        <>
            <div class="fridge-container">
                <img onClick={()=>{setShowWiz(!showWiz)}} class="fridge" src={fridgeimg}></img>
                <div class="fridge-inline">
                { showWiz &&
                <form class="glass" onSubmit={noteSubmit}>
                    <div>
                        <label>Message </label>
                        <input type="text" onChange={(e)=>{setNoteText(e.target.value)}} required />
                    </div>
                    <div>
                        <label>Color </label>
                        <table class="color-selector">
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                        <input type="color" onChange={(e)=>{setColor(e.target.value)}} required />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                }
                </div>
                
            </div>
            <PostIts mx="20" my="50" mc="aqua" mr="10" message="efjoij"/>
            <PostIts mx="20" my="20" mc="red" mr="-10" message="easjifoeafeasefaej"/>
        </>
    )
}

export default Fridge