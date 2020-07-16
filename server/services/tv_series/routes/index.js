const router = require('express').Router();
const TvController = require('../controllers/TvController');

router.get('/', (req, res) => {
    res.send('tv series service');
})
router.get('/tv', TvController.findAll);
router.post('/tv', TvController.create);
router.get('/tv/:id', TvController.findById);
router.put('/tv/:id', TvController.update);
router.delete('/tv/:id', TvController.delete);

module.exports = router