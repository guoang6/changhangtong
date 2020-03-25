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
        '/web/gethelpcontent',
        '/web/getcomment',
        '/web/getcomment',
        '/web/getreply',
        '/admin/contentexamine',
        '/web/getarticlelist',
        '/web/webgetwebactivitylist',
        '/web/webgetjoblist',
        '/web/webgetcompanylist',
        '/web/getoldstuffcontent',
        '/web/getactivitycontent',
        '/web/webgetweboldstufflist'
    ]
})