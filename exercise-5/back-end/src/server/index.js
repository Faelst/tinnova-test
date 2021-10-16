const express = require('express')
const routers = require('../routers')
const dotenv = require('dotenv')

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
    }

    router() {
        this.express.use('/api', routers)
    }

    listen() {
        this.express.listen(process.env.PORT || 3000, () => console.log('API listen on http://localhost:8080'))
    }
}

module.exports = Server