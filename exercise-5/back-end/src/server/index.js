const express = require('express')
const routers = require('../routers')

class Server {
    constructor() {
        this.express = express()
        this.middleware()
        this.router()
    }

    middleware() {
        this.express.use(express.json())
    }

    router() {
        this.express.use('/api', routers)
    }

    listen() {
        this.express.listen(8080, () => console.log('API listen on http://localhost:8080'))
    }
}

module.exports = Server