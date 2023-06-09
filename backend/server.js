require('dotenv').config()

const bulletinRoutes = require('./routes/bulletinRoutes');
const locationRoutes = require('./routes/locationRoutes');
const timezoneRoutes = require('./routes/timezoneRoutes');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const cors = require('cors')

const app = express()
const uri = process.env.ATLAS_URI

//mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.use(express.json())
/*const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }*/
//app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    console.log(req.body);
    next()
})

app.get('/hello', (req, res) => {
    res.send('Hello world!')
})

app.use('/api/bb', bulletinRoutes);
app.use('/api/loc', locationRoutes);
app.use('/api/tz', timezoneRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);

app.listen(process.env.PORT, () => {
    console.log('Connected to database and listening on port', process.env.PORT)
})