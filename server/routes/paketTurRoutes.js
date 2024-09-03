const express = require('express');
const router = express.Router();
const paketTurController = require('../controllers/paketTurController');

router.post('/', paketTurController.createPaketTur);
router.get('/', paketTurController.getAllPaketTur);
router.get('/:paketTurID', paketTurController.getPaketTurById);
router.put('/:PaketTurID', paketTurController.updatePaketTur);
router.delete('/:id', paketTurController.deletePaketTur);


module.exports = router;