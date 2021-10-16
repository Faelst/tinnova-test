const router = require('express').Router()

const vehiclesRouters = require('./vehicles')

router.use('/veiculos', vehiclesRouters)

module.exports = router