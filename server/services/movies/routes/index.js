const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/', (req, res) => {
    res.send('movies service');
})
router.get('/movies', MovieController.findAll);
router.post('/movies', MovieController.create);
router.get('/movies/:id', MovieController.findById);
router.put('/movies/:id', MovieController.update);
router.delete('/movies/:id', MovieController.delete);

module.exports = router