const router = require('express').Router()
const EntertainmeController = require('../controllers/EntertainmeController');

router.get('/', EntertainmeController.index);

module.exports = router