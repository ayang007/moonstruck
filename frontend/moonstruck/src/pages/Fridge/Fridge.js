import { useContext, useEffect, useState } from 'react';
import fridgeimg from '../../assets/Fridge.png'
import PostIts from '../PostIts/PostIts'
import './Fridge.css'
import { AuthContext } from "../../App";
import APIRequest from '../../util/APIRequest';

function Fridge (props) {
    const auth = useContext(AuthContext);
    const [noteText, setNoteText] = useState("");
    const [color, setColor] = useState("#cdb4db");
    const [showWiz, setShowWiz] = useState(false);
    const [colorCheck, setColorCheck] = useState(0);
    const [bbList, setBbList] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => fetchBB(), 10000);
        return () => {
          clearInterval(interval);
        };
      }, []);

      useEffect(() => {
        fetchBB();
      }, [])

    async function fetchBB() {
        try {
            const response = await APIRequest('GET', 'bb/' + auth, {});
            if('Notes' in response) {
                setBbList([...response.Notes]);
                console.log(response.Notes);
            }
        }
        catch(error) {
            // handle quitely
        }
    }

    async function postBB() {
        try {
            const response = await APIRequest('PUT', 'bb', {
                JWT: auth,
                PosX: 10 + Math.round(Math.random()*10), // position in % from left hand side 
                PosY: 10 + Math.round(Math.random()*10), // position in % from right hand side
                Rotation: Math.random()*20 - 10,
                Color: color,
                Type: "text", // "text" or "image"
                Content: noteText, 
            });
            fetchBB();
        }
        catch(error) {
            alert("We were not able to post your post it! Try again later");
        }
    }

    function noteSubmit(e) {
        e.preventDefault();
        if(noteText.length <= 0) {
            return;
        }
        setShowWiz(false);
        postBB();
    }
    return (
        <>
            <div class="fridge-container">
                <img onClick={()=>{setShowWiz(!showWiz)}} class="fridge" src={fridgeimg} draggable="false"></img>
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
                                <td onClick={()=>{setColor("#cdb4db"); setColorCheck(0);}}>
                                    &nbsp;{colorCheck===0&&<>&#10004;</>}</td>
                                <td onClick={()=>{setColor("#ffc8dd"); setColorCheck(1);}}>
                                &nbsp;{colorCheck===1&&<>&#10004;</>}</td>
                                <td onClick={()=>{setColor("#ffafcc"); setColorCheck(2);}}>
                                    &nbsp;{colorCheck===2&&<>&#10004;</>}</td>
                                <td onClick={()=>{setColor("#bde0fe"); setColorCheck(3);}}>
                                    &nbsp;{colorCheck===3&&<>&#10004;</>}</td>
                                <td onClick={()=>{setColor("#a2d1ff"); setColorCheck(4);}}>
                                    &nbsp;{colorCheck===4&&<>&#10004;</>}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <input class="fridge-sub" type="submit" />
                    </div>
                </form>
                }
                </div>
                
            </div>
            {bbList.map((p) => {
                return (<PostIts mx={p.PosX} my={p.PosY} mc={p.Color}
                    mr={p.Rotation} message={p.Content} mi={p._id} />)
            })}
        </>
    )
}

export default Fridge