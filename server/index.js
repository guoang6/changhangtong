const express = require("express")

const app = express()
app.use(require('cors')())
app.use(express.json())
require('./plugins/db')(app)
require('./routers/webadmin')(app)

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})