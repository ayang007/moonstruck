import './Timezone.css'

function Timezone (props) {
    return (
        <>
            <head>
                <meta charset="utf-8"/>
                <title>Glassmorphism Circle Progress</title>
            </head>
            <body>
                <section>
                    <div class="container">
                        <div class="card">
                            <div class="box">
                                <div>
                                    <div class="percent">
                                        <svg>
                                            <circle cx="70" cy="70" r="100"></circle>
                                            <circle cx="70" cy="70" r="50"></circle>
                                        </svg>
                                        <div class="number">
                                            <h2>7:00<span>am</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text">Html</div>
                        </div>
                    </div>
                </section>
            </body>
        </>
    )
}

export default Timezone;