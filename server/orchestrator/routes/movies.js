const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.findAll);
router.post('/', MovieController.create);
router.get('/:id', MovieController.findByid);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router
