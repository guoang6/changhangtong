const jwt = require('express-jwt')
const { PEIVATE_KEY } = require('./config')
module.exports = jwt({
    secret:PEIVATE_KEY,
    credentialsRequired:true
}).unless({
    path:[
        '/',
        '/webadmin/registered',
        '/webadmin/login',
        '/uplod',
        '/web/webgetwebhelplist',
    ]
})