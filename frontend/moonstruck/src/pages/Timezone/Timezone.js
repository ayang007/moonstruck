import './Timezone.css'

function Timezone (props) {
    return (
        <div timezonecontainer>
            <div class="container">
                        <div class="card">
                                <div>
                                    <div class="percent">
                                        <svg class="circlecontainer">
                                            <circle cx="70" cy="70" r="100"></circle>
                                            <circle cx="70" cy="70" r="100"></circle>
                                            <circle cx="70" cy="70" r="100"></circle>
                                        </svg>
                                        <div class="number">
                                            <h2>7:00<span>am</span>-1:00<span>pm</span></h2>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
        </div>

    )
}

export default Timezone;