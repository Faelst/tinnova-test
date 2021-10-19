const router = require('express').Router();

const VehiclesClass = require('../../controllers/vehicles');
const VehiclesControllers = new VehiclesClass();

router.get('/test', (req, res) => res.status(200).send(true));
router.get('/', VehiclesControllers.getVehicles);
router.get('/:id', VehiclesControllers.getVehicleById);
router.post('/', VehiclesControllers.registerVehicle);
router.put('/:id', VehiclesControllers.updateVehicle);
router.patch('/:id');
router.delete('/:id', VehiclesControllers.deleteVehicle);

module.exports = router;
