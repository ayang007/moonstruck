import periodimg from '../../assets/Calendar.png'
import './Period.css'

function PeriodCalendar (props) {
    return (
        <>
            <div class="periodcontainer">
                <img class="period" src={periodimg}></img>
            </div>
        </>
    )
}
export default PeriodCalendar