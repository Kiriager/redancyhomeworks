import express = require('express')
const app = express()

import router = require('./routes/router')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', router)

module.exports = app