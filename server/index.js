var express = require('express')
var bodyParser = require('body-parser')

const localPort = 3000
var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// require('./routers/webadmin')(app)

app.listen(localPort, () => {
    console.log('启动成功')
})