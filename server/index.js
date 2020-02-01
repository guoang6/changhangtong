var express = require('express')
var bodyParser = require('body-parser')
var router = require('./routers/webadmin')

const localPort = 3000
var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(jsonParser)
app.use(urlencodedParser)
app.use(router)
app.listen(localPort, () => {
    console.log('启动成功')
})