const express = require('express');
const router = express.Router();
const detailPaketTurController = require('../controllers/detailPaketTurController');

// Define routes
router.post('/', detailPaketTurController.createDetailPaketTur);
router.get('/', detailPaketTurController.getAllDetailPaketTur);
router.get('/:PaketTurID/:DestinasiID', detailPaketTurController.getDetailPaketTurById);
router.put('/:PaketTurID/:DestinasiID', detailPaketTurController.updateDetailPaketTur);
router.delete('/:PaketTurID/:DestinasiID', detailPaketTurController.deleteDetailPaketTur);

module.exports = router;
