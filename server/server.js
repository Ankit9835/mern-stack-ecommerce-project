const express = require('express')
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const app = express()
const morgan = require("morgan");
const cors = require("cors");
const {readdirSync} = require('fs')
app.use(express.json())

const authRoutes = require('./routes/auth')

app.use(morgan("dev"));
app.use(cors());
//app.use('/api', authRoutes)
readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
})
const port = 5000
app.listen(port, () => {
    console.log(`server listening to ${port} no`)
})