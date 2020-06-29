const express = require('express');
const router = express.Router();

const vehicles = require('../controllers/vehicle.controller.js');

router.post('/', vehicles.create);

router.get('/', vehicles.findAll);

router.get('/:vehiculoId', vehicles.findOne);

router.put('/:vehiculoId', vehicles.update);

router.delete('/:vehiculoId', vehicles.delete);

module.exports = router;