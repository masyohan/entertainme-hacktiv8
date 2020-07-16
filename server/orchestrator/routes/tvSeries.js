const router = require('express').Router();
const TvController = require('../controllers/TvController');

router.get('/', TvController.findAll);
router.post('/', TvController.create);
router.get('/:id', TvController.findByid);
router.put('/:id', TvController.update);
router.delete('/:id', TvController.delete);

module.exports = router