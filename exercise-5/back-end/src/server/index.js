const express = require('express')
const routers = require('../routers')
const dotenv = require('dotenv')
const cors = require('cors')

class Server {
    constructor() {
        this.dotenv = dotenv
        this.express = express()
        this.middleware()
        this.router()
    }

    middleware() {
        this.dotenv.config()
        this.express.use(express.json())
        this.express.use(cors())
    }

    router() {
        this.express.use('/api', routers)
    }

    listen() {
        this.express.listen(process.env.PORT || 3000, () => console.log('API listen on http://localhost:' + process.env.PORT || 3000))
    }
}

module.exports = Server