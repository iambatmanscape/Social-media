const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

require('dotenv').config()

const { connection } = require('./database/db')

const Router = require('./Routes/route.js')

const app = express();

app.use(cors())

app.use(bodyParser.json({ exteded: true }))

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Router)

connection(process.env.MONGODB_CONNECTION_STRING)

const port = 3000;
app.listen(port, () => {
    console.log('Server Running!')
})