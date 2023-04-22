import { useEffect, useState } from 'react';
import postitimg from '../../assets/postit1.png'
import './PostIts.css'

function PostIts (props) {
    // <div class="colorcontainer">
    // </div>
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
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

    const debouncedVar1 = useDebounce(percentageX, 500);
    const debouncedVar2 = useDebounce(percentageY, 500);

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
            <div class="postitscontainer" style={{ top: `${posY}px`, left: `${posX}px`, cursor: 'move' }}
      onMouseDown={dragMouseDown}>
                
                    <p class="postitmessage">message</p>
            </div>
        </>
    )
}
export default PostIts