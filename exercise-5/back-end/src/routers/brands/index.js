const router = require('express').Router()

const VehicleBrandsClass = require('../../controllers/brands')
const VehicleBrandsControllers = new VehicleBrandsClass()

router.get('/test', (req, res) => res.status(200).send(true))

router.get('/', VehicleBrandsControllers.getVehiclesBrands)

module.exports = router