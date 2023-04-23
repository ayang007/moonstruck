import { useContext, useEffect, useState } from 'react';
import postitimg from '../../assets/postit1.png'
import './PostIts.css'
import { AuthContext } from "../../App";
import APIRequest from '../../util/APIRequest';


function PostIts (props) {
    const auth = useContext(AuthContext);

    // <div class="colorcontainer">
    // </div>
    const [posX, setPosX] = useState((props.mx/100.0)*window.screen.width);
    const [posY, setPosY] = useState((props.my/100.0)*window.screen.height);
    const [percentageX, setPercentageX] = useState(0);
    const [percentageY, setPercentageY] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const [mouseActivity, setMouseActivity] = useState(false);

    const [delPending, setDelPending] = useState(false);

    useEffect(() => {
        console.log("WOHOO")
        setPosX((props.mx/100.0)*window.screen.width);
        setPosY((props.my/100.0)*window.screen.height);
    }, [props.mx, props.my])

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
    
        useEffect(
          () => {
            const handler = setTimeout(() => {
              setDebouncedValue(value);
            }, delay);
            return () => {
              clearTimeout(handler);
            };
          },
          [value, delay] 
        );
    
        return debouncedValue;
      }

    useEffect(
        () => {
            setPercentageX((posX / window.screen.width) * 100);
            setPercentageY((posY / window.screen.height) * 100);
        }, [posX, posY]
    );



    const debouncedPX = useDebounce(percentageX, 1500);
    const debouncedPY = useDebounce(percentageY, 1500);

    async function patchMove() {
        // dont trust the first render!! dont update when mouse down 
        if (firstRender || mouseActivity) {
            setFirstRender(false);
            return;
        }
        console.log("original x: " + props.mx + " now x: " + debouncedPX);
        if(Math.abs((props.mx - debouncedPX)) > 1 || Math.abs((props.my - debouncedPY)) > 1) {
            console.log("PATCH POST IT CALLED: " + props.message);
            try {
                const response = await APIRequest('PATCH', 'bb', {
                    JWT: auth,
                    NoteID: props.mi, // 0-indexed integer
                    PosX: debouncedPX, // position in % from left hand side 
                    PosY: debouncedPY, // position in % from right hand side
                    Rotation: props.mr, // 0 degrees = upright
                    Color: props.mc,
                    Type: "text", // "text" or "image"
                    Content: props.message, 
                })
            }
            catch(error) {
                // silently fail
            }
        }        
    }

    async function delBB() {
        try {
            const response = await APIRequest('DELETE', 'bb', {
                JWT: auth,
                NoteID: props.mi
            })
            setDelPending(true);
        }
        catch(error) {
            alert("Error: Post it was not deleted")
        }
    }

    useEffect(
        () => {
            patchMove();
        }, [debouncedPX, debouncedPY]
    )


    useEffect(
        () => {
            //console.log([debouncedPX, debouncedPY]);
        }, [debouncedPX, debouncedPY]
    );

    function dragMouseDown(e) {
        setMouseActivity(true);
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        if (e.clientX < window.screen.width && e.clientX >= 0)
            setPosX(e.clientX-20);
        if (e.clientY >= 0)
            setPosY(e.clientY-20);
    }
    
    function closeDragElement() {
        setMouseActivity(false);
        document.onmouseup = null;
        document.onmousemove = null;
    }

    if(delPending) return (<></>);

    return (
        <>
            <div class="postitscontainer" 
            style={{ top: `${posY}px`, left: `${posX}px`, background: props.mc,
            transform: "rotate(" + props.mr + "deg)" }}
      onMouseDown={dragMouseDown}>
                
                    <p class="postitmessage">&#12288;&#12288;&#12288;&#12288;
                        <span class="postit-x" onClick={delBB}>
                        X</span>
                    <br/>{props.message}</p>
            </div>
        </>
    )
}
export default PostIts