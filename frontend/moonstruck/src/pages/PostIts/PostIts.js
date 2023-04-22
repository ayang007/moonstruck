import { useEffect, useState } from 'react';
import postitimg from '../../assets/postit1.png'
import './PostIts.css'

function PostIts (props) {
    // <div class="colorcontainer">
    // </div>
    const [posX, setPosX] = useState((props.mx/100.0)*window.screen.width);
    const [posY, setPosY] = useState((props.my/100.0)*window.screen.height);
    const [percentageX, setPercentageX] = useState(0);
    const [percentageY, setPercentageY] = useState(0);

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


    const debouncedPX = useDebounce(percentageX, 1000);
    const debouncedPY = useDebounce(percentageY, 1000);


    useEffect(
        () => {
            //console.log([debouncedPX, debouncedPY]);
        }, [debouncedPX, debouncedPY]
    );

    function dragMouseDown(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        if (e.clientX < window.screen.width && e.clientX >= 0)
            setPosX(e.clientX);
        if (e.clientY >= 0)
            setPosY(e.clientY);
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    return (
        <>
            <div class="postitscontainer" 
            style={{ top: `${posY}px`, left: `${posX}px`, background: props.mc,
            transform: "rotate(" + props.mr + "deg)" }}
      onMouseDown={dragMouseDown}>
                
                    <p class="postitmessage">{props.message}</p>
            </div>
        </>
    )
}
export default PostIts