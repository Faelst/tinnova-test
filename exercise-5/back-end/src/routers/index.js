const router = require('express').Router()

const vehiclesRouters = require('./vehicles')
const vehicleBrandsRouter = require('./brands')

router.use('/veiculos', vehiclesRouters)
router.use('/marcas', vehicleBrandsRouter)

module.exports = router