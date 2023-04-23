import { useContext, useEffect, useState } from 'react';
import periodimg from '../../assets/Calendar.png'
import './Period.css'
import { AuthContext } from "../../App";
import APIRequest from '../../util/APIRequest';

function PeriodCalendar (props) {
    const auth = useContext(AuthContext);
    const [parr, setParr] = useState(Array(35).fill(false))

    function handlePClick(i) {
        console.log(i);
        var parrC = parr.slice();
        parrC[i] = !parrC[i];
        setParr(parrC);
        updatePeriod();
    }

    useEffect(() => {
        fetchPeriod();
    }, [])

    async function fetchPeriod() {
        try {
            const result = await APIRequest('GET', 'users/period/' + auth, {});
            if("Period" in result) {
                setParr(result.Period);
            }
        }
        catch(error) {
            // fail quiety
        }
    }

    async function updatePeriod() {
        try {
            const result = await APIRequest('PATCH', 'users/period', {
                JWT: auth,
                Period: parr
            })
        }
        catch(error) {
            alert("Your cycles were not updated!");
        }
        fetchPeriod();
    }
    return (
        <>
            <div class="periodcontainer">
                <p>PERIOD CALENDAR</p>
                <img class="period" src={periodimg}></img>
                <div class="table-calendar">
                    <table>
                        {
                            [0,1,2,3,4].map((n) => {
                                return (
                                <tr>
                                    {[0,1,2,3,4,5,6].map((m) => {
                                        return(<td class={parr[n*7+m]?"pred":"notpred"}
                                            onClick={()=>{handlePClick(n*7+m)}}>
                                                <span>&nbsp;</span></td>)
                                    })}
                                </tr>
                                );
                            })
                        }
                        
                    </table>
                </div>
            </div>
        </>
    )
}
export default PeriodCalendar