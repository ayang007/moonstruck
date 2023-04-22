import './Timezone.css'

function Timezone (props) {
    return (

        <div class="timezone-out">
            <div class="timezone-in">
                <div class="pie" style={{"--p":40, "--s":"20deg", "--c": "#6616ad"}}> </div>
                
            </div>
            <div class="timezone-in">
                <div class="pie" style={{"--p":10, "--s":"10deg", "--c": "#4960e6"}}> </div>
            </div>
        </div>
    )
    /*return (
        <body class="timezonecontainer">
            <div class="skill">
                <div class="outer">
                    <div class="inner"></div>
                </div>
            </div>
        </body>

    )*/
}

export default Timezone;