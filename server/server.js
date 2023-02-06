const express = require('express')
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const app = express()
const {readdirSync} = require('fs')
app.use(express.json())

// app.use('/api', (req,res) => {
//     res.send('test')
// })
readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
})
const port = 5000
app.listen(port, () => {
    console.log(`server listening to ${port} no`)
})