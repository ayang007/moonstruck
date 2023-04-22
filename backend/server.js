require('dotenv').config()

const bulletinRoutes = "";
const locationRoutes = "";
const timezoneRoutes = "";
const userRoutes = require('./routes/userRoutes');

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const uri = process.env.ATLAS_URI

//mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }
app.use(cors(corsOptions))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/hello', (req, res) => {
    res.send('Hello world!')
})

//app.use('/api/bulletins', bulletinRoutes);
//app.use('/api/locations', locationRoutes);
//app.use('/api/timezones', timezoneRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('Connected to database and listening on port', process.env.PORT)
})