import './Timezone.css'

function Timezone (props) {
    return (

        <div class="timezone-out">
            <div class="timezone-in">
                <div class="pie" style={{"--p":40, "--s":"20deg", "--c": "#ffc8dd"}}> </div>
                
            </div>
            <div class="timezone-in">
                <div class="pie" style={{"--p":60, "--s":"10deg", "--c": "#a2d1ff"}}> </div>
            </div>
            <div class="timezone-in">
                <div class="pie" id="piebackground" style={{"--p":100, "--s":"10deg", "--c": "#ffffff"}}> </div>
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